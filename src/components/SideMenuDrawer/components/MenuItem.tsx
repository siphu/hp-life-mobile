import React from 'react';
import { styles } from '../styles'
import { I18nManager, TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/Text';
import { config } from '~/config/config';
import Images from '~/res/images';
import { GlobalStyles } from '~/config/styles';
import { MaterialIconsOutlined } from '~/components/MaterialIcons';
import { MaterialIcons } from "~/components/MaterialIcons";

export interface MenuItemProps {
    label: string;
    icon: string;
    style?: 'grey' | 'white';
    selected?: boolean;
    disabled?: boolean;
    click?: () => void;
}

export default (props: MenuItemProps) => {
    const ParentElement: any = props.disabled ? View : TouchableOpacity;
    return (
        <ParentElement
            accessibilityRole="button"
            onPress={props.disabled ? undefined : props.click}
            style={[
                props.style === 'grey' ? styles.greyRow : styles.whiteRow,
                props.selected ? styles.selectedRow : {},

            ]}>
            {props.icon === 'help-outline' ?
                <MaterialIcons style={styles.linkIcon} name={props.icon} size={24} color={props.disabled ? config.color.neutral[400] : config.color.neutral[900]} /> :
                <MaterialIconsOutlined style={styles.linkIcon} name={props.icon} size={24} color={props.disabled ? config.color.neutral[400] : config.color.neutral[900]} />
            }
            <Text
                style={[styles.rowText, props.disabled ? styles.rowTextDisabled : props.selected ? styles.rowTextSelected : {}]}>
                {props.label}
            </Text>
            <View style={GlobalStyles.flexGrow} />
            <MaterialIcons name={I18nManager.isRTL ? 'chevron_left' : 'chevron_right'} size={30} color={config.color.neutral[900]} />
        </ParentElement>
    );
};
