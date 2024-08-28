import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from "~/components/MaterialIcons";
import Text from '~/components/Text';
import { config } from '~/config/config';
import { GlobalStyles } from '~/config/styles';
import { RootState } from '~/stores';

const styles = StyleSheet.create({
    touchableArea: {
        ...GlobalStyles.touchablePadding,
        marginRight: 10,
    },
    notificationActiveContainer: {
        height: 20,
        position: 'absolute',
        right: -8,
        width: 42,
        top: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationActive: {
        backgroundColor: 'red',
        borderRadius: 12,
        paddingLeft: 6,
        paddingRight: 7,
    },
    notificationActiveNumber: {
        color: config.color.neutral[50],
        fontWeight: '500',
        lineHeight: 22,
        textAlign: 'center',
    },
});
interface MenuHeaderProp {
    onPress?: () => void;
}
export const HeaderNotificationIcon = (props: MenuHeaderProp) => {
    const { online, notifications } = useSelector((root: RootState) => root.app);
    const ParentView: any = online ? TouchableOpacity : View;

    return (
        <ParentView
            onPress={props.onPress}
            style={styles.touchableArea}>
            <MaterialIcons name='notifications' size={30} color={'black'} />
            {notifications && notifications.length > 0 && (
                <View style={styles.notificationActiveContainer}>
                    <View style={styles.notificationActive}>
                        <Text style={styles.notificationActiveNumber}>
                            {notifications.length > 99
                                ? '99+'
                                : notifications.length}
                        </Text>
                    </View>
                </View>
            )}
        </ParentView>
    );
};
