import { Platform, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { Dropdown } from '~/components/react-native-element-dropdown';
import React from "react";
import { config } from "~/config/config";
import { t } from "~/providers/TranslationProvider";
import { TranslationsPaths } from "~/translations";
export interface FilterSelectionProps {
    categories: string[];
    selected?: string;
    onSelect?: (category?: string) => void;
}

const HeaderComponent = ({ categories, selected, onSelect }: FilterSelectionProps) => {

    const data = React.useMemo(() => categories.map(c => ({ label: t(c as TranslationsPaths), value: c })), [categories]);

    const fontName = React.useMemo(() => {
        return config.defaultFont.ios
            ? Platform.select({
                ios: config.defaultFont.ios,
                android: config.defaultFont.android as unknown as string,
            })
            : undefined;
    }, []);

    return (
        <View style={{ height: 70 }}>
            <Dropdown
                accessibilityLabel={(selected ? selected + "; " : "") + t('accessibility.dropdownMenu')}
                fontFamily={fontName}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.selectedTextStyle}
                itemContainerStyle={{
                    borderColor: config.color.neutral[500],
                }}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                containerStyle={{
                    borderColor: config.color.neutral[900],
                }}
                activeColor={config.color.neutral[500]}
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
        color: config.color.neutral[900]
    },
    selectedTextStyle: {
        fontSize: 16,
        color: config.color.neutral[900]
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
