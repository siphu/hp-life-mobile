import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "~/components/MaterialIcons";
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
        <TouchableOpacity testID="header-menu-icon" onPress={props.onPress} style={styles.touchableArea}>
            <MaterialIcons name='menu' size={30} color={'black'} />
        </TouchableOpacity>
    );
};
