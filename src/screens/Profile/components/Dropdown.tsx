import { TextStyle, View, ViewStyle } from 'react-native';
import { Dropdown as DropdownSelector } from '~/components/react-native-element-dropdown'
import Text from '~/components/Text';
import { styles } from '../styles';
import { t } from '~/providers/TranslationProvider';


interface DropdownProp<T extends object> {
    title: string;
    required?: boolean;
    data: T[];
    value?: T[keyof T];
    labelField: keyof T;
    valueField: keyof T;
    placeholder?: string;
    onChange: (item: T) => void;
    titleStyle?: TextStyle;
    containerStyle?: ViewStyle;
    dropdownStyle?: ViewStyle;
    search?: boolean;
    autoScroll?: boolean;
}

export const Dropdown = <T extends object>({
    title,
    value,
    required,
    ...rest
}: DropdownProp<T>) => {
    return (
        <View>
            <View>
                <Text style={styles.inputTitle}>
                    {title}
                    {required && <Text style={styles.required}>{' *'}</Text>}
                </Text>
            </View>
            <View
                style={styles.inputRow}>
                <DropdownSelector
                    accessibilityLabel={(value ? value + "; " : "") + t('accessibility.dropdownMenu')}
                    value={value as string}
                    {...rest}
                />
            </View>
        </View>);
}