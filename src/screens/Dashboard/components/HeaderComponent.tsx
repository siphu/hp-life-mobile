import {Platform, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {Dropdown} from '~/components/react-native-element-dropdown';
import React from 'react';
import {config} from '~/config/config';
import {t} from '~/providers/TranslationProvider';
import {TranslationsPaths} from '~/translations';
import Button from '~/components/Button';
import {HEADER_HEIGHT, HEADER_WITH_CERTIFICATE} from '../styles';
export interface FilterSelectionProps {
  categories: string[];
  selected?: string;
  onSelect: (category?: string) => void;
  onTranscript: () => void;
  showDownloadTranscript?: boolean;
}

const HeaderComponent = ({
  showDownloadTranscript,
  categories,
  selected,
  onSelect,
  onTranscript,
}: FilterSelectionProps) => {
  const data = React.useMemo(
    () => categories.map(c => ({label: t(c as TranslationsPaths), value: c})),
    [categories],
  );

  const fontName = React.useMemo(() => {
    return config.defaultFont.ios
      ? Platform.select({
          ios: config.defaultFont.ios,
          android: config.defaultFont.android as unknown as string,
        })
      : undefined;
  }, []);

  return (
    <View
      style={{
        height: showDownloadTranscript
          ? HEADER_WITH_CERTIFICATE
          : HEADER_HEIGHT,
        gap: 10,
      }}>
      <Dropdown
        accessibilityLabel={
          (selected ? selected + '; ' : '') + t('accessibility.dropdownMenu')
        }
        fontFamily={fontName}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.selectedTextStyle}
        itemContainerStyle={{
          borderColor: config.color.misc.border,
        }}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={{
          borderColor: config.color.neutral[900],
        }}
        activeColor={config.color.misc.selected}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'...'}
        value={selected}
        onChange={item => {
          if (onSelect) onSelect(item.value);
        }}
      />
      {showDownloadTranscript && (
        <Button
          title={t('myCourse.downloadTranscript')}
          style={{height: 42, backgroundColor: config.color.misc.primary}}
          textStyle={{color: config.color.neutral[900]}}
          onPress={onTranscript}
        />
      )}
    </View>
  );
};

export default React.memo(HeaderComponent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: config.color.neutral[900],
    borderWidth: 0.5,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: config.color.neutral[900],
  },
  selectedTextStyle: {
    fontSize: 16,
    color: config.color.neutral[900],
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
