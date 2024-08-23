import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '~/config/styles';

const styles = StyleSheet.create({
    touchableArea: {
        ...GlobalStyles.touchablePadding,
        marginLeft: 10,
    }
});
interface MenuHeaderProp {
    onPress?: () => void;
}
export const HeaderMenuIcon = (props: MenuHeaderProp) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.touchableArea}>
            <MaterialIcons name='menu' size={30} color={'black'} />
        </TouchableOpacity>
    );
};
