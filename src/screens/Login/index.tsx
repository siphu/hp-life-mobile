import { Image, ScrollView, View } from 'react-native';
import { styles } from './styles';
import images from '~/res/images';
import { useSelector } from 'react-redux';
import { RootState } from '~/stores';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UnAuthenticatedScreens } from '~/navigation/screens';
import Text from '~/components/Text';
import _ from 'lodash';
import Button from '~/components/Button';
import { extractToken, openBrowser, urlWithLocale } from './helper';
import { config } from '~/config/config';
import { ScrollViewBackgroundLayer } from '~/components/ScrollViewBackgroundLayer';
import { GlobalStyles } from '~/config/styles';
import { t } from '~/providers/TranslationProvider';
import {
  getEnrolledCourses,
  getPushNotifications,
  getUserProfile,
  refreshToken,
} from '~/api/helpers';

const Login = () => {
  const appState = useSelector((state: RootState) => state.app);
  const navigation = useNavigation();

  const openLanguageSelector = _.debounce(
    () => navigation.navigate(UnAuthenticatedScreens.Language),
    100,
  );

  React.useEffect(() => {
    if (!appState.language) {
      openLanguageSelector();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = async () => {
    const ts = new Date().getTime();
    const url =
      urlWithLocale(config.api.signIn, appState.language) + `?ts=${ts}`;

    console.log('opening url', url);

    openBrowser(url)
      .then(extractToken)
      .then(token =>
        refreshToken(token).catch(e =>
          console.error('Error refreshing token:', e),
        ),
      )
      .then(getUserProfile)
      .then(() =>
        Promise.all([getEnrolledCourses(), getPushNotifications()]).catch(
          () => {},
        ),
      )
      .catch(e => console.error('Sign-in error:', e));
  };

  const join = () => {};

  return (
    <View style={GlobalStyles.flex}>
      <ScrollViewBackgroundLayer />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <Image source={images.welcome.png} style={styles.welcomeBannerImage} />
        <View style={styles.flexGrow}>
          <View style={styles.mainContentContainer}>
            <Text style={styles.loginMessage}>{t('login.message')}</Text>
            <View style={styles.buttonContainer}>
              <Button
                color={config.color.neutral[900]}
                title={t('login.login')}
                onPress={signIn}
              />
              <Button
                style={{ borderWidth: 1 }}
                textStyle={{ color: config.color.neutral[900] }}
                color={config.color.neutral[50]}
                title={t('login.join')}
                onPress={join}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Login;
