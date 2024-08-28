import { ScrollView } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { GlobalStyles } from "~/config/styles";
import { RootState } from "~/stores";


const connector = connect((state: RootState) => ({
    notifications: state.app.notifications
}));
const Notification: React.FC<ConnectedProps<typeof connector>> = ({ notifications }) => {
    return (
        <ScrollView style={GlobalStyles.screenContainer}>


        </ScrollView>);
}

export default connector(Notification);