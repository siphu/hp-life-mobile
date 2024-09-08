import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from "~/components/MaterialIcons";
import { GlobalStyles } from '~/config/styles';
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
        <TouchableOpacity testID="language-icon" onPress={() => navigate.navigate(UnAuthenticatedScreens.Language)} style={styles.touchableArea}>
            <MaterialIcons name='language' size={30} color={'black'} />
        </TouchableOpacity>
    );
};
