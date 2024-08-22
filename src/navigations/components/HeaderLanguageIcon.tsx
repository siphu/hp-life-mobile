import React from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '~/config/styles';
import { useDispatch, useSelector } from 'react-redux';
import { showLanguageSelector } from '~/stores/app/actions';
import { UnAuthenticatedScreens } from '../screens';

const styles = StyleSheet.create({
    touchableArea: {
        ...GlobalStyles.touchablePadding,
        marginLeft: 10,
    }
});

export const HeaderLanguageIcon = () => {

    const navigate = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigate.navigate(UnAuthenticatedScreens.Language)} style={styles.touchableArea}>
            <MaterialIcons name='language' size={30} color={'black'} />
        </TouchableOpacity>
    );
};
