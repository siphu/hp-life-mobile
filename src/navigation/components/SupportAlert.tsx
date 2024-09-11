import React from 'react';
import {
  Dimensions,
  I18nManager,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { connect, ConnectedProps } from 'react-redux';
import { sendSupportMessage } from '~/api/endpoints';
import Alert from '~/components/Alert';
import Button from '~/components/Button';
import Text from '~/components/Text';
import TextInput from '~/components/TextInput';
import { config } from '~/config/config';
import { useCourseProviderContext } from '~/providers/CourseProvider';
import { t } from '~/providers/TranslationProvider';
import { RootState } from '~/stores';
import { validateEmail } from '~/utils/isValidEmail';

function plainTextToHtml(text: string) {
  // Escape HTML entities like <, >, &, " to prevent HTML injection
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

  // Replace newlines with <br> to preserve line breaks
  const htmlText = escapedText.replace(/\n/g, '<br>');

  // Optional: Wrap in <p> tags to structure text in paragraphs
  return `<p>${htmlText.replace(/(?:\r\n|\r|\n)/g, '</p><p>')}</p>`;
}

interface SupportAlertProps {
  show: boolean;
  onClose: () => void;
}

const connector = connect((state: RootState, ownProps: SupportAlertProps) => ({
  ...ownProps,
  profile: state.user.profile!,
}));

const AlertPrompt: React.FC<ConnectedProps<typeof connector>> = ({
  profile,
  show,
  onClose,
}) => {
  const { course, task } = useCourseProviderContext();

  const [email, setEmail] = React.useState<string>(profile.email);
  const [message, setMessage] = React.useState<string>('');
  const [isFinished, setIsFinished] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  //toggle to false both when closing and opening just in case
  React.useEffect(() => {
    setError(false);
    setIsFinished(false);
  }, [show]);

  const onSubmit = async () => {
    setError(false);
    const platform = Platform.select({
      ios: 'iOS',
      android: 'Android',
      default: Platform.OS,
    });
    const apiLevel =
      Platform.OS === 'android' ? DeviceInfo.getApiLevelSync() : 'n/a';
    const manufacturer = await DeviceInfo.getManufacturer();
    const generatedBody = `
E-Mail Address: ${email}

Message
------------------
${message}
------------------


Course Information
------------------
Course: [${course!.id}] ${course!.name}
Task: ${task?.name || ''} 

Device Information
------------------
Platform: ${platform}
Platform Version: ${Platform.Version}
API Level: ${apiLevel}
Manufacturer: ${manufacturer}
Model: ${DeviceInfo.getModel()}
Screen Size: ${Dimensions.get('screen').width}x${Dimensions.get('screen').height}
Software Version: ${DeviceInfo.getVersion() + ' (' + DeviceInfo.getBuildNumber() + ')'}
        `;

    try {
      console.log('Sending Support');
      await sendSupportMessage(
        email,
        plainTextToHtml(generatedBody),
        profile.fullName,
        profile.phoneNumber ? profile.phoneNumber.toString() : undefined,
        `${platform} App Support`,
        'General',
        'High',
      );
      setIsFinished(true);
    } catch (e) {
      console.log('e', e);
      setError(true);
    }

    setIsFinished(true);
  };

  const onFinished = () => {
    onClose();
    setMessage('');
    setIsFinished(false);
    setError(false);
  };

  const buttonDisabled = React.useMemo(
    () =>
      !email ||
      email.trim().length === 0 ||
      !validateEmail(email) ||
      !message ||
      message.trim().length === 0,
    [email, message],
  );

  return (
    <Alert
      show={show}
      position="Center"
      onRequestClose={onClose}
      animationIn={'slideInDown'}>
      <View style={styles.supportContainer}>
        <View style={styles.supportBottomPadding}>
          <Text
            style={{
              ...styles.supportTitle,
              textAlign: isFinished ? 'center' : 'auto',
            }}>
            {t(
              isFinished
                ? 'contactSupport.finishedTitle'
                : 'contactSupport.title',
            )}
          </Text>
        </View>
        <View>
          {isFinished ? (
            <Text style={styles.supportFinishedMessage}>
              {t('contactSupport.finishedMessage')}
            </Text>
          ) : (
            <>
              <TextInput
                keyboardType="email-address"
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                editable={true}
                style={styles.supportEmailInput}
                placeholderTextColor={config.color.misc.border}
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                textAlign={I18nManager.isRTL ? 'right' : 'left'}
                autoFocus
                editable={true}
                multiline={true}
                style={styles.supportMessageInput}
                placeholderTextColor={config.color.misc.border}
                value={message}
                onChangeText={setMessage}
                maxLength={5000}
              />
            </>
          )}
        </View>
        <View style={{ flexDirection: 'column' }}>
          {isFinished ? (
            <Button
              variant="Primary"
              color={config.color.neutral[900]}
              title={t('contactSupport.buttons.close')}
              onPress={onFinished}
            />
          ) : (
            <>
              <Button
                variant="Primary"
                disabled={buttonDisabled}
                style={{ marginBottom: 10 }}
                title={t('contactSupport.buttons.submit')}
                onPress={onSubmit}
              />
              <Button
                variant="Secondary"
                title={t('contactSupport.buttons.cancel')}
                onPress={onClose}
              />
            </>
          )}
        </View>
        {error && (
          <View style={{ paddingTop: 10 }}>
            <Text
              style={{ color: config.color.misc.danger, fontWeight: 'bold' }}>
              {t('others.error.unexpected')}
            </Text>
          </View>
        )}
      </View>
    </Alert>
  );
};

export const SupportAlert = connector(AlertPrompt);

const styles = StyleSheet.create({
  supportContainer: {
    width: Dimensions.get('screen').width * 0.8,
  },
  supportBottomPadding: {
    marginBottom: 10,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'auto',
  },
  supportFinishedMessage: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    paddingBottom: 20,
    color: config.color.misc.textSecondary,
  },
  supportEmailInput: {
    color: config.color.neutral[900],
    fontSize: 14,
    height: 40,
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingVertical: 5,
    textAlignVertical: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: config.color.misc.darkGrey,
    marginBottom: 10,
  },
  supportMessageInput: {
    color: config.color.neutral[900],
    fontSize: 14,
    minHeight: 40 * 3,
    maxHeight: Dimensions.get('screen').height * 0.25,
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingVertical: 5,
    textAlignVertical: 'center',
    width: '100%',
    borderWidth: 0.5,
    borderColor: config.color.misc.darkGrey,
    marginBottom: 20,
  },
});
