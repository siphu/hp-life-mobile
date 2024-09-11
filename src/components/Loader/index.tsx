import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Spinner from '~/res/images/resources/spinner/hp_spinner.png';
import FastImage from '@d11/react-native-fast-image';
import { stores } from '~/stores';
import { setLoader } from '~/stores/app/actions';

export const loaderWrapper = async (fn: () => Promise<unknown>) => {
  stores.dispatch(setLoader(true));
  await fn();
  stores.dispatch(setLoader(false));
};

const Loader = React.memo(({ visible }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={[styles.coverView]}>
        <FastImage
          style={styles.image}
          source={Spinner}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </View>
  );
});

export default Loader;
