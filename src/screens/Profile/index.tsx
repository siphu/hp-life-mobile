import React from "react";
import { ScrollView, View } from "react-native"
import { GlobalStyles } from "~/config/styles";
import { styles } from "./styles";
import Input from "./components/Input";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "~/stores";
import { getLanguageNameFromCode } from "~/translations/languages";
import { Countries, Gender, Timezones } from "~/api/dict";
import Text from "~/components/Text";
import Dropdown from "~/components/Dropdown";
import { setLanguage } from "~/stores/app/actions";
import { UnknownAction } from "redux";
import { t, useTranslationContext } from "~/providers/TranslationProvider";
import i18n, { getAvailableLanguages, TranslationsPaths } from "~/translations";


const connector = connect((state: RootState) => ({
    language: state.app.language,
    userProfile: state.user.profile!
}));

const Profile: React.FC<ConnectedProps<typeof connector>> = ({ language, userProfile }) => {

    const translationContext = useTranslationContext();
    const languageOptions = React.useMemo(() =>
        getAvailableLanguages().map(locale => ({ value: locale, label: getLanguageNameFromCode(locale) }))
        , [i18n.store.data]);


    const genderOptions = React.useMemo(() => Object.entries(Gender).map(g => ({
        value: g[1].key,
        label: t(g[1].display as TranslationsPaths),
    })), [Gender, language]);

    const tzOptions = React.useMemo(() => Timezones.map(tz => ({
        value: tz,
        label: tz
    })), [Timezones]);


    return (
        <ScrollView style={GlobalStyles.flex} contentContainerStyle={styles.scrollContainer}>
            <Input
                title={t('profile.email')}
                required={true}
                value={userProfile.email}
                enabled={false}
            />
            <Input
                title={t('profile.fullName')}
                note={t('profile.nameNote')}
                required={true}
                value={userProfile.fullName}
                style={{}}
                enabled={true}
                onChange={(t: string) => {
                    // let profile = { ...userProfile };
                    // profile.fullName = t;
                    // setUserProfile(profile);
                }}
            />
            <Dropdown
                search={true}
                data={genderOptions}
                defaultValue={userProfile.gender}
                labelField={'label'}
                valueField={'value'}
                onSelect={() => { }}
            />
            <Dropdown
                search={true}
                data={Countries}
                defaultValue={userProfile.country}
                labelField={'name'}
                valueField={'code'}
                onSelect={() => { }}
                disableAutoScroll
            />
            <Dropdown
                data={languageOptions}
                labelField={'label'}
                valueField={'value'}
                defaultValue={userProfile.language}
                onSelect={(item) => translationContext.changeLocale(item.value)}
                disableAutoScroll
            />
            <Dropdown
                search={true}
                data={tzOptions}
                labelField={'label'}
                valueField={'value'}
                defaultValue={userProfile.timeZone}
                onSelect={() => { }}
                disableAutoScroll
            />
        </ScrollView>
    )
}

export default connector(Profile);