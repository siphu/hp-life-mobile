import _ from 'lodash';
import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {
  getPushNotifications,
  getUserProfile,
  refreshToken,
} from '~/api/helpers';
import {RootState, stores} from '~/stores';
import {setOnlineStatus} from '~/stores/app/actions';
import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {config} from '~/config/config';
import {AuthToken} from '~/api/endpoints';

NetInfo.configure({
  reachabilityUrl: config.api.learning,
  reachabilityTest: async response =>
    response.status >= 200 && response.status < 500,
  reachabilityLongTimeout: 60 * 1000,
  reachabilityShortTimeout: 5 * 1000,
  reachabilityRequestTimeout: 15 * 1000,
  reachabilityShouldRun: () => true,
});

interface NetworkListenerProps {
  isCurrentOnline?: boolean;
  token?: AuthToken;
}

const mapStateToProps = (state: RootState) => ({
  isCurrentOnline: state.app.online,
  token: state.user.token,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const NetworkListener: React.FC<PropsFromRedux> = ({
  isCurrentOnline,
  token,
}) => {
  React.useEffect(() => {
    const debouncedListener = _.debounce((state: NetInfoState) => {
      const isNowOnline = state.isConnected;
      if (isCurrentOnline !== isNowOnline) {
        stores.dispatch(setOnlineStatus(isNowOnline));
        console.log('[NetInfo State Change]', isCurrentOnline, isNowOnline);
      }
      if (!isCurrentOnline && isNowOnline && token) {
        refreshToken()
          .then(() => getUserProfile())
          .then(() => getPushNotifications())
          .catch(err => {
            console.error('Error during refresh or fetching:', err);
          });
      }
    }, 100);

    const unsubscribe = NetInfo.addEventListener(debouncedListener);

    return () => {
      unsubscribe();
    };
  }, [isCurrentOnline, token]);

  return null;
};

export default connector(NetworkListener);
