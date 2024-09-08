import React from 'react';
import Orientation, {OrientationType} from 'react-native-orientation-locker';
import {stores} from '~/stores';
import {setScreenOrientation} from '~/stores/app/actions';

export const OrientationListener = () => {
  const screenOrientationRotation = (orientation: OrientationType) => {
    stores.dispatch(
      setScreenOrientation(
        ['LANDSCAPE-RIGHT', 'LANDSCAPE-LEFT'].includes(orientation)
          ? 'Landscape'
          : 'Portrait',
      ),
    );
  };

  React.useEffect(() => {
    Orientation.addOrientationListener(screenOrientationRotation);
    return () =>
      Orientation.removeOrientationListener(screenOrientationRotation);
  }, []);

  return null;
};
