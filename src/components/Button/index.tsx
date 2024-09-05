import * as React from 'react';
import {
    View,
    ViewStyle,
    TouchableOpacity,
    TextStyle,
    ColorValue,
} from 'react-native';
import { Text } from '~/components/Text';
import styles from './styles';
import { config } from '~/config/config';

interface ColoredButtonProps {
    color?: ColorValue;
    title: string;
    onPress?: () => void;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: any;
    variant?: 'Primary' | 'Secondary';
}

const Button = (props: ColoredButtonProps) => {
    return (
        <View
            style={[
                styles.ColoredButtonBG,
                { backgroundColor: props.color ?? 'white' },
                (props.variant === 'Primary' ? styles.primaryVariant :
                    props.variant === 'Secondary' ? styles.secondaryVariant : {}),
                props.style ?? {},
            ]}>
            <TouchableOpacity
                accessibilityRole={'button'}
                style={[styles.TouchArea, props.icon ? styles.flexRow : {}]}
                onPress={props.onPress}
                disabled={props.disabled ?? false}>
                <View style={styles.imageWrapper}>{props.icon}</View>
                <Text style={[styles.StyledText,
                props.variant ? {
                    color: props.variant === 'Primary' ?
                        styles.primaryVariant.color :
                        styles.secondaryVariant.color
                } : {}
                    , props.textStyle]}>{props.title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Button;
