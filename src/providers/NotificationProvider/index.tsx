import React, { createContext, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState } from '~/stores';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import { Notification as NotificationModel } from '~/api/endpoints';
import { Alert } from 'react-native';
import { AuthenticatedScreens } from '~/navigation/screens';
import { config } from '~/config/config';
import { t } from '../TranslationProvider';
import { NavigationProp, NavigationState } from '@react-navigation/native';
import { clearNotifications, deleteNotification, markNotificationsRead } from '~/api/helpers';

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
        //messaging().setBackgroundMessageHandler(this.handleIncomingNotification);

        this.setState({ initialized: true });
    }

    componentDidUpdate(prevProps: NotificationProviderProps) {

    }

    // shouldComponentUpdate(nextProps: Readonly<NotificationProviderProps>, nextState: Readonly<NotificationProviderState>, nextContext: any): boolean {
    //     return false;
    // }

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
        if (!notification.isRead)
            markNotificationsRead(notification);

        switch (notification.type) {
            case 'NewCourseAvailable':
                return this.props.navigation.navigate(AuthenticatedScreens.CourseInformation, {
                    id: Number.parseInt(notification.resourceId, 10),
                });
            case 'NewArticleAvailable':
                return this.props.navigation.navigate(AuthenticatedScreens.InAppBrowser, {
                    title: t('sideMenu.links.news'),
                    url: `${config.api.webUrl}/mobile/${notification.resourceId}`,
                    locale: this.props.language
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
            Alert.alert('Push notifications are disabled');
        }
    }

    clearNotifications = async () => {
        clearNotifications();
    }

    deleteNotification = async (notification: NotificationModel) => {
        deleteNotification(notification);
    }

    render() {
        const { children } = this.props;
        const { initialized } = this.state;

        if (!initialized) {
            return null;
        }

        return (
            <NotificationContext.Provider value={{
                handleNotification: this.handleNotification,
                requestPermission: this.requestPermission,
                clearNotifications: this.clearNotifications,
                deleteNotification: this.deleteNotification
            }}>
                {children}
            </NotificationContext.Provider>
        );
    }
}

const mapStateToProps = (state: RootState, ownProps: { navigation: RNNavigationProp }) => ({
    notifications: state.app.notifications,
    language: state.app.language,
    navigation: ownProps.navigation
});

export default connect(mapStateToProps)(NotificationHandler);
export const useNotificationContext = (): NotificationContextProps => {
    return React.useContext(NotificationContext);
};
