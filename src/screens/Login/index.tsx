import { Image, ScrollView, View } from "react-native";
import { styles } from "./styles";
import images from "~/res/images";
import { useSelector } from "react-redux";
import { RootState } from "~/stores";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { UnAuthenticatedScreens } from "~/navigations/screens";
import Text from "~/components/Text";
import _ from 'lodash';
import { t } from "~/translations";
import Button from "~/components/Button";
import { openBrowser, urlWithLocale } from "./helper";

const Login = () => {
    const appState = useSelector((state: RootState) => state.app);
    const navigation = useNavigation();
    const openLanguageSelector = _.debounce(() => navigation.navigate(UnAuthenticatedScreens.Language), 100);

    React.useEffect(() => {
        if (!appState.language) {
            openLanguageSelector();
        }
    }, []);

    const signIn = async () => {

        const ts = new Date().getTime();
        console.log('got herE?');
        const url = urlWithLocale('https://auth.hplife-test.dyd.solutions/mobile/login', appState.language) + `?ts=${ts}`;
        console.log('url', url);


        openBrowser(url)
            .then(() => {

            })


    }

    return (
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
        </ScrollView >
    );
}

export default Login;