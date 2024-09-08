import { View } from 'react-native';
import { signOut } from '~/api/helpers';
import Alert from '~/components/Alert';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { config } from '~/config/config';
import { t } from '~/providers/TranslationProvider';

export const ConfirmAlert = ({ show }: { show: boolean }) => {
  return (
    <Alert show={show} position="Center">
      <View style={{ rowGap: 20 }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 500,
              textAlign: 'center',
            }}>
            {t('profile.deleteAccount.label')}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              textAlign: 'center',
            }}>
            {t('profile.deleteAccount.submitted')}
          </Text>
        </View>
        <View style={{ flexDirection: 'column', rowGap: 8 }}>
          <Button
            color={config.color.neutral[900]}
            title={t('profile.deleteAccount.label')}
            onPress={signOut}
          />
        </View>
      </View>
    </Alert>
  );
};
