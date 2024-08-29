import React, { createContext, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState, stores } from '~/stores';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { Notification as NotificationModel } from '~/api/endpoints';
import { Alert } from 'react-native';
import { AuthenticatedScreens } from '~/navigation/screens';
import { config } from '~/config/config';
import { t } from '../TranslationProvider';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { clearNotifications, deleteNotification, markNotificationsRead, registerDeviceForMessaging } from '~/api/helpers';
import { Prompt } from './components/Prompt';
import { setPushNotificationPreferences } from '~/stores/user/actions';

type RNNavigationProp = Omit<NavigationProp<ReactNavigation.RootParamList>, "getState"> & { getState(): NavigationState | undefined };

interface NotificationContextProps {
    handleNotification: (notification: NotificationModel) => void;
    requestPermission: () => void;
    clearNotifications: () => void;
    deleteNotification: (notification: NotificationModel) => void;
}

export const NotificationContext = createContext<NotificationContextProps>({} as NotificationContextProps);

interface NotificationProviderProps {
    children: ReactNode;
    notifications: NotificationModel[];
    language: string;
    navigation: RNNavigationProp;
    preferencePushNotification?: boolean;
}

interface NotificationProviderState {
    initialized: boolean;
}

class NotificationHandler extends React.Component<NotificationProviderProps, NotificationProviderState> {
    state: NotificationProviderState = {
        initialized: false,
    };

    private unsubscribeMessageListener: (() => void) | null = null;

    async componentDidMount() {
        this.unsubscribeMessageListener = messaging().onMessage(this.handleIncomingNotification);
        this.setState({ initialized: true });
    }

    componentWillUnmount() {
        if (this.unsubscribeMessageListener) {
            this.unsubscribeMessageListener();
        }
    }

    handleIncomingNotification = async (remoteMessage: any) => {
        await notifee.displayNotification({
            title: remoteMessage.notification?.title,
            body: remoteMessage.notification?.body,
            android: {
                channelId: 'default',
            },
        });

        this.handleNotification(remoteMessage);
    };

    handleNotification = async (notification: NotificationModel) => {
        if (!notification.isRead) markNotificationsRead(notification);

        switch (notification.type) {
            case 'NewCourseAvailable':
                return this.props.navigation.navigate(AuthenticatedScreens.CourseInformation, {
                    id: Number.parseInt(notification.resourceId, 10),
                });
            case 'NewArticleAvailable':
                return this.props.navigation.navigate(AuthenticatedScreens.InAppBrowser, {
                    title: t('sideMenu.links.news'),
                    url: `${config.api.webUrl}/mobile/${notification.resourceId}`,
                    locale: this.props.language,
                });
            case 'CourseCertificateEarned':
                return this.props.navigation.navigate(AuthenticatedScreens.Dashboard, {
                    category: 'myCourse.completed',
                });
            case 'BadgeEarned':
                return this.props.navigation.navigate(AuthenticatedScreens.Dashboard, {
                    category: 'myCourse.badges',
                });
            default:
                return this.props.navigation.navigate(AuthenticatedScreens.Dashboard);
        }
    };

    requestPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Push notifications authorized');
        } else {
            console.log('Push notifications declined');
        }

        return enabled;
    };

    clearNotifications = async () => {
        clearNotifications();
    };

    deleteNotification = async (notification: NotificationModel) => {
        deleteNotification(notification);
    };

    userPreferenceSelected = async (enable: boolean) => {
        stores.dispatch(setPushNotificationPreferences(enable));
        if (enable) {
            this.requestPermission().then(registerDeviceForMessaging);
        }
    };

    render() {
        const { children } = this.props;
        const { initialized } = this.state;

        if (!initialized) {
            return null;
        }

        return (
            <NotificationContext.Provider
                value={{
                    handleNotification: this.handleNotification,
                    requestPermission: this.requestPermission,
                    clearNotifications: this.clearNotifications,
                    deleteNotification: this.deleteNotification,
                }}
            >
                <Prompt
                    visible={this.props.preferencePushNotification === undefined}
                    onClose={() => this.userPreferenceSelected(false)}
                    onConfirm={() => this.userPreferenceSelected(true)}
                />
                {children}
            </NotificationContext.Provider>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: { navigation: RNNavigationProp }) => ({
    notifications: state.app.notifications,
    preferencePushNotification: state.user.preferencePushNotification,
    language: state.app.language,
    navigation: ownProps.navigation,
});

export default connect(mapStateToProps)(NotificationHandler);
export const useNotificationContext = (): NotificationContextProps => {
    return React.useContext(NotificationContext);
};
