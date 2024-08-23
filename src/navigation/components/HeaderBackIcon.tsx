import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '~/config/styles';
import { config } from '~/config/config';

const styles = StyleSheet.create({
    touchableArea: {
        ...GlobalStyles.touchablePadding,
        marginLeft: 10,
    }
});
interface BackHeaderProp {
    onPress?: () => void;
}
export const HeaderBackIcon = (props: BackHeaderProp) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.touchableArea}>
            <MaterialIcons name='arrow-back' size={30} color={config.color.neutral[900]} />
        </TouchableOpacity>
    );
};
