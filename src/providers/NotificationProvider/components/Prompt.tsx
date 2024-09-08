import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import Alert from '~/components/Alert';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { config } from '~/config/config';
import { t } from '~/providers/TranslationProvider';
import { setPushNotificationPreferences } from '~/stores/user/actions';

export const Prompt = ({
  visible,
  onClose,
  onConfirm,
}: {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) => {
  return (
    <Alert show={visible} position="Center" onRequestClose={onClose}>
      <View
        style={{
          rowGap: 20,
        }}>
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
            }}>
            {t('onboarding.pushNotification.title')}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 14,
            }}>
            {t('onboarding.pushNotification.body')}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', rowGap: 8 }}>
          <Button
            color={config.color.neutral[900]}
            title={t('onboarding.pushNotification.button.yes')}
            onPress={onConfirm}
          />
          <Button
            style={{ borderWidth: 1 }}
            textStyle={{ color: config.color.neutral[900] }}
            color={config.color.neutral[50]}
            title={t('onboarding.pushNotification.button.no')}
            onPress={onClose}
          />
        </View>
      </View>
    </Alert>
  );
};
