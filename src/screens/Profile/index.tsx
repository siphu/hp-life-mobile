import React from "react";
import { ScrollView, View } from "react-native"
import { GlobalStyles } from "~/config/styles";
import { styles } from "./styles";
import Input from "./components/Input";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { RootState } from "~/stores";
import { getLanguageNameFromCode } from "~/translations/languages";
import { Countries, Gender, Timezones } from "~/utils";
import { Dropdown } from "./components/Dropdown";
import { t } from "~/providers/TranslationProvider";
import i18n, { getAvailableLanguages, TranslationsPaths } from "~/translations";
import CheckBoxButton from "~/components/CheckBoxButton";
import Button from "~/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { config } from "~/config/config";
import { updateUserProfile } from "~/api/helpers";


interface SelectOption {
    label: string;
    value: string;
}

const connector = connect((state: RootState) => ({
    language: state.app.language,
    profile: state.user.profile!
}));

const Profile: React.FC<ConnectedProps<typeof connector>> = ({ language, profile }) => {

    const [userProfile, setUserProfile] = React.useState(profile);

    const languageOptions: SelectOption[] = React.useMemo(() =>
        getAvailableLanguages().map(locale => ({ value: locale, label: getLanguageNameFromCode(locale)! }))
        , [i18n.store.data]);

    const genderOptions: SelectOption[] = React.useMemo(() => Object.entries(Gender).map(g => ({
        value: g[1].key,
        label: t(g[1].display as TranslationsPaths),
    })), [Gender, language]);

    const tzOptions: SelectOption[] = React.useMemo(() => Timezones.map(tz => ({
        value: tz,
        label: tz
    })), [Timezones]);


    const changed = React.useMemo(() => (profile.fullName !== userProfile.fullName) ||
        (profile.gender !== userProfile.gender) ||
        (profile.country !== userProfile.country) ||
        (profile.language !== userProfile.language) ||
        (profile.timeZone !== userProfile.timeZone) ||
        (profile.isNewsletterEnabled !== userProfile.isNewsletterEnabled), [profile, userProfile]);


    return (
        <ScrollView style={GlobalStyles.screenContainer} contentContainerStyle={styles.scrollContainer}>
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
                    let profile = { ...userProfile };
                    profile.fullName = t;
                    setUserProfile(profile);
                }}
            />
            <Dropdown<SelectOption>
                title={t('profile.gender')}
                data={genderOptions}
                value={userProfile.gender}
                search={false}
                labelField='label'
                valueField='value'
                onChange={(t: SelectOption) => {
                    let profile = { ...userProfile };
                    profile.gender = t.value;
                    setUserProfile(profile);
                }}
            />
            <Dropdown< { name: string; code: string; }>
                title={t('profile.country')}
                data={Countries}
                value={userProfile.country}
                search={true}
                labelField='name'
                valueField='code'
                onChange={(t) => {
                    let profile = { ...userProfile };
                    profile.country = t.code;
                    setUserProfile(profile);
                }}
            />
            <Dropdown<SelectOption>
                title={t('profile.language')}
                data={languageOptions}
                value={userProfile.language}
                search={false}
                labelField='label'
                valueField='value'
                autoScroll={false}
                onChange={(t) => {
                    let profile = { ...userProfile };
                    profile.language = t.value;
                    setUserProfile(profile);
                }}
            />
            <Dropdown<SelectOption>
                title={t('profile.timeZone')}
                data={tzOptions}
                value={userProfile.timeZone}
                search={true}
                labelField='label'
                valueField='value'
                onChange={(t) => {
                    let profile = { ...userProfile };
                    profile.timeZone = t.value;
                    setUserProfile(profile);
                }}
            />
            <CheckBoxButton
                text={t('profile.newsletter')}
                enabled={true}
                selected={userProfile.isNewsletterEnabled}
                style={{}}
                onSelect={() => {
                    let profile = { ...userProfile };
                    profile.isNewsletterEnabled = !profile.isNewsletterEnabled;
                    setUserProfile(profile);
                }}
            />
            <CheckBoxButton
                text={t('profile.pushNotification.message')}
                enabled={true}
                selected={false}
                onSelect={() => {

                }}
            />

            <Button
                disabled={false}
                title={t('profile.save')}
                color={changed ? config.color.neutral[900] : styles.disabledButton.backgroundColor}
                textStyle={changed ? { color: config.color.neutral[50] } : styles.disabledButton}
                onPress={() => { updateUserProfile(userProfile); }}
            />

            <SafeAreaView edges={['bottom']} />
        </ScrollView>
    )
}

export default connector(Profile);