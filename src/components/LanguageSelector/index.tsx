import React from "react";
import I18n from 'react-native-i18n';
import { ScrollView, View } from "react-native"
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getLanguageCodeFromName, getLanguageNameFromCode } from "~/translations/languages";
import { changeLocale } from "~/translations";
import { UnknownAction } from "redux";
import Images from "~/res/images";
import Button from "../Button";


interface LanguageSelectorProps {
    visible?: boolean;
    onClose?: () => void;
}

const LanguageSelector = (props: LanguageSelectorProps) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const LanguageButton = ({ locale }: { locale: string }) => {
        return (
            <Button
                textStyle={{
                    fontSize: 16,
                    color: 'black'
                }}
                style={{
                    height: 80,
                    paddingVertical: 20,
                }} title={locale} onPress={() => {
                    dispatch(changeLocale(getLanguageCodeFromName(locale)) as unknown as UnknownAction);
                    navigation.goBack();
                }} />
        );
    };

    return (
        <View style={{
            flex: 1,
            paddingVertical: 0,
            backgroundColor: 'white',
        }}>
            <View style={{
                paddingVertical: 20
            }}>
                <Images.logo.black width={'100%'} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
                {Object.entries(I18n.translations)
                    .map(a => a[0])
                    .map(getLanguageNameFromCode)
                    .map(l => <LanguageButton locale={l as string} key={l as string} />)}
            </ScrollView>
        </View >
    );
}

export default LanguageSelector;