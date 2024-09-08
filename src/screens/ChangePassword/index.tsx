import {ScrollView, View} from 'react-native';
import {GlobalStyles} from '~/config/styles';
import {t} from '~/providers/TranslationProvider';
import Input from './components/Input';
import {styles} from './styles';
import Button from '~/components/Button';
import {config} from '~/config/config';
import Text from '~/components/Text';
import React from 'react';
import {RootStackParamList} from '~/navigation';
import {AuthenticatedScreens} from '~/navigation/screens';
import {StackScreenProps} from '@react-navigation/stack';
import {postChangePassword} from '~/api/endpoints';

const errorCode = (error: string) => {
  switch (error) {
    case 'Incorrect password.':
      return t('profile.password.errors.incorrectPassword');
    case 'Passwords must be at least 8 characters.':
      return t('profile.password.errors.tooShort');
    case 'Passwords must have at least one non alphanumeric character.':
      return t('profile.password.errors.needSpecialCharacter');
    case 'Confirm password does not match.':
      return t('profile.password.errors.confirmPasswordNotMatching');
    default:
      return t('others.error.unexpected');
  }
};

const ChangePassword = ({
  navigation,
}: StackScreenProps<
  RootStackParamList,
  AuthenticatedScreens.ChangePassword
>) => {
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [currentPassword, setCurrentPassword] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmPassword, setConfirmPassword] = React.useState<string>('');

  const onUpdate = () => {
    setErrorMessage(undefined);
    if (newPassword !== confirmPassword) {
      const message = errorCode('Confirm password does not match.');
      setErrorMessage(message);
      return;
    }

    postChangePassword(currentPassword, newPassword, confirmPassword)
      .then(() => {
        navigation.goBack();
      })
      .catch((e: any) => {
        const message =
          e.message.hasOwnProperty('Errors') &&
          Array.isArray(e.message.Errors) &&
          e.message.Errors.length > 0
            ? e.message.Errors[0]
            : e.message.hasOwnProperty('Errors') &&
                Array.isArray(e.message.Errors)
              ? 'Unknown'
              : e.message;
        setErrorMessage(errorCode(message));
      });
  };

  return (
    <ScrollView
      style={GlobalStyles.screenContainer}
      contentContainerStyle={styles.scrollContainer}>
      <Input
        title={t('profile.password.currentPassword')}
        required
        enabled
        secureText
        value={currentPassword}
        onChange={setCurrentPassword}
      />
      <Input
        title={t('profile.password.newPassword')}
        required
        enabled
        secureText
        value={newPassword}
        onChange={setNewPassword}
      />
      <Input
        title={t('profile.password.confirmPassword')}
        required
        enabled
        secureText
        value={confirmPassword}
        onChange={setConfirmPassword}
      />
      {errorMessage && (
        <View>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}
      <Button
        disabled={false}
        title={t('profile.password.updatePassword')}
        color={config.color.neutral[900]}
        textStyle={{color: config.color.neutral[50]}}
        onPress={onUpdate}
      />
    </ScrollView>
  );
};

export default ChangePassword;
