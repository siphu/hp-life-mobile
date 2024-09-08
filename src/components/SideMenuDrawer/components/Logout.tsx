import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {signOut} from '~/api/helpers';
import Alert from '~/components/Alert';
import Button from '~/components/Button';
import {MaterialIcons} from '~/components/MaterialIcons';
import Text from '~/components/Text';
import {t} from '~/providers/TranslationProvider';
import {styles} from '../styles';
import {config} from '~/config/config';

export const Logout = () => {
  const [showLogout, setShowLogout] = React.useState<boolean>(false);
  return (
    <View>
      <Alert
        show={showLogout}
        position="Center"
        onRequestClose={() => setShowLogout(false)}>
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
              {t('sideMenu.logout.label')}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 14,
              }}>
              {t('sideMenu.logout.prompt')}
            </Text>
          </View>
          <View style={{flexDirection: 'column', rowGap: 8}}>
            <Button
              variant="Primary"
              title={t('sideMenu.logout.yes')}
              onPress={() =>
                signOut()
                  .catch(() => {})
                  .then(() => setShowLogout(false))
              }
            />
            <Button
              variant="Secondary"
              title={t('sideMenu.logout.cancel')}
              onPress={() => setShowLogout(false)}
            />
          </View>
        </View>
      </Alert>
      <TouchableOpacity
        style={styles.logoutContainer}
        onPress={() => setShowLogout(true)}
        accessibilityRole="button">
        <MaterialIcons
          style={styles.linkIcon}
          name={'logout'}
          size={24}
          color={config.color.neutral[900]}
        />
        <Text style={styles.rowText}>{t('sideMenu.logout.label')}</Text>
      </TouchableOpacity>
    </View>
  );
};
