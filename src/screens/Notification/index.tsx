import { FlatList, RefreshControl, ScrollView, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { Notification as NotificationModel } from "~/api/endpoints";
import Text from "~/components/Text";
import { GlobalStyles } from "~/config/styles";
import { RootState } from "~/stores";
import { styles } from "./styles";
import { Header } from "./components/Header";
import { NotificationItem } from "./components/NotificationItem";
import React from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import moment from "moment";
import { getPushNotifications } from "~/api/helpers";
import { useNotificationContext } from "~/providers/NotificationProvider";


const connector = connect((state: RootState) => {
    const sortedNotifications = [...state.app.notifications].sort((a, b) => {
        if (a.isRead === b.isRead) {
            return moment(b.creationDate).diff(moment(a.creationDate));
        }
        return a.isRead === b.isRead ? 0 : a.isRead ? 1 : -1;
    });
    return {
        notifications: sortedNotifications,
    };
});

const Notification: React.FC<ConnectedProps<typeof connector>> = ({ notifications }) => {

    const notificationContext = useNotificationContext();
    const inset = useSafeAreaInsets();
    const onRefresh = (force?: boolean) => {
        getPushNotifications();
    }

    return (
        <View style={GlobalStyles.screenContainer}>
            <FlatList
                data={notifications}
                renderItem={({ item }) => <NotificationItem
                    item={item}
                    onClick={notificationContext.handleNotification}
                    onDelete={notificationContext.deleteNotification}
                    key={item.id.toString()} />}
                ListHeaderComponent={<Header onClear={notificationContext.clearNotifications} />}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={true}
                indicatorStyle={'black'}
                refreshControl={<RefreshControl refreshing={false} onRefresh={() => onRefresh(true)} />}
                contentContainerStyle={[styles.contentContainer, {
                    paddingBottom: inset.bottom
                }]}
                ItemSeparatorComponent={() => <View style={styles.border} />}
                ListFooterComponent={<View style={styles.border} />}
                removeClippedSubviews={true}
            />
        </View>);
}

export default connector(Notification);