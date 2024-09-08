import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getLanguageNameFromCode } from '~/translations/languages';
import i18n from '~/translations';
import Images from '~/res/images';
import Button from '../Button';
import { useTranslationContext } from '~/providers/TranslationProvider';

const LanguageSelector = () => {
  const translation = useTranslationContext();
  const navigation = useNavigation();

  const LanguageButton = ({
    locale,
    name,
  }: {
    locale: string;
    name: string;
  }) => {
    return (
      <Button
        textStyle={{
          fontSize: 16,
          color: 'black',
        }}
        style={{
          height: 80,
          paddingVertical: 20,
        }}
        title={name}
        onPress={() => {
          translation.changeLocale(locale);
          navigation.goBack();
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 0,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          paddingVertical: 20,
        }}>
        <Images.logo.black width={'100%'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {Object.keys(i18n.store.data)
          .map(locale => ({
            locale: locale,
            name: getLanguageNameFromCode(locale),
          }))
          .map(l => (
            <LanguageButton locale={l.locale} key={l.locale} name={l.name!} />
          ))}
      </ScrollView>
    </View>
  );
};

export default LanguageSelector;
