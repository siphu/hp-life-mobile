import { Image, ScrollView, View } from "react-native";
import { styles } from "./styles";
import images from "~/res/images";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/stores";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { UnAuthenticatedScreens } from "~/navigation/screens";
import Text from "~/components/Text";
import _ from 'lodash';
import { t } from "~/translations";
import Button from "~/components/Button";
import { extractToken, openBrowser, urlWithLocale } from "./helper";
import { setProfile, setToken } from "~/stores/user/actions";
import { getUserProfile, refreshToken } from "~/api/rest/user";
import { config } from "~/config/config";
import { ScrollViewBackgroundLayer } from "~/components/ScrollViewBackgroundLayer";
import { GlobalStyles } from "~/config/styles";

const Login = () => {
    const appState = useSelector((state: RootState) => state.app);
    const userState = useSelector((state: RootState) => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const openLanguageSelector = _.debounce(() => navigation.navigate(UnAuthenticatedScreens.Language), 100);

    React.useEffect(() => {
        if (!appState.language) {
            openLanguageSelector();
        }
    }, []);

    const signIn = async () => {
        const ts = new Date().getTime();
        const url = urlWithLocale(config.api.signIn, appState.language) + `?ts=${ts}`;
        openBrowser(url)
            .then(extractToken)
            .then(refreshToken)
            .then(setToken)
            .then(dispatch)
            .then(getUserProfile)
            .then(setProfile)
            .then(dispatch).catch((e) => console.error('e', e));
    }

    return (
        <View style={GlobalStyles.flex}>
            <ScrollViewBackgroundLayer />
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Image source={images.welcome.png} style={styles.welcomeBannerImage} />
                <View style={styles.flexGrow}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'white',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                        }}>{t('login.message')}</Text>
                        <View style={{
                            alignSelf: 'stretch',
                            paddingHorizontal: 20,
                            rowGap: 10,
                        }}>
                            <Button
                                style={{
                                }}
                                color={'black'}
                                title={t('login.login')} onPress={signIn} />
                            <Button
                                style={{
                                    borderWidth: 1,
                                }}
                                textStyle={{
                                    color: 'black'
                                }}
                                color={'white'}
                                title={t('login.join')} onPress={signIn} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Login;