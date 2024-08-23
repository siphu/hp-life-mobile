import React from 'react';
import { styles } from '../styles'
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/Text';
import { config } from '~/config/config';
import Images from '~/res/images';
import { GlobalStyles } from '~/config/styles';
import MaterialIconsOutlined from '~/components/MaterialIconsOutlined';

export interface MenuItemProps {
    label: string;
    icon: any;
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
            <props.icon
                height={24}
                width={24}
                style={styles.linkIcon}
                fill={props.disabled ? config.color.neutral[400] : config.color.neutral[900]}
                fillOpacity={props.disabled ? .24 : 1}
            />
            <Text
                style={[styles.rowText, props.disabled ? styles.rowTextDisabled : props.selected ? styles.rowTextSelected : {}]}>
                {props.label}
            </Text>
            <View style={GlobalStyles.flexGrow} />
            <MaterialIconsOutlined name="13mp" />
            {/* <Images.arrowForward height={24} width={24} fill={props.disabled ? config.color.grey400 : config.color.grey900} fillOpacity={props.disabled ? .24 : 1} /> */}
        </ParentElement>
    );
};
