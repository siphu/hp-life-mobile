import { ScrollView, View } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import Text from "~/components/Text";
import { GlobalStyles } from "~/config/styles";
import { RootState } from "~/stores";


const connector = connect((state: RootState) => ({
    notifications: state.app.notifications
}));
const Notification: React.FC<ConnectedProps<typeof connector>> = ({ notifications }) => {
    return (
        <ScrollView style={GlobalStyles.screenContainer}>
            {notifications.map(notification => <View style={{ marginBottom: 20 }} key={notification.id.toString()}>
                <Text>{notification.title}</Text>
                <Text>{notification.body}</Text>
            </View>)}
        </ScrollView>);
}

export default connector(Notification);