import React from 'react';
import { Animated, View } from 'react-native';
import styles from './styles';
import Spinner from '~/res/images/resources/spinner/hp_spinner.png';
import FastImage from '@d11/react-native-fast-image';

const DURATION_FADE_IN = 100;
const DURATION_FADE_OUT = 100;

const Loader = React.memo(({ visible }: { visible: boolean }) => {
  const [isVisible, setIsVisible] = React.useState(visible);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: DURATION_FADE_IN,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: DURATION_FADE_OUT,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => setIsVisible(false), DURATION_FADE_OUT);
      });
    }
  }, [visible, fadeAnim]);

  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.coverView, { opacity: fadeAnim }]}>
        <FastImage
          style={styles.image}
          source={Spinner}
          resizeMode={FastImage.resizeMode.contain}
        />
      </Animated.View>
    </View>
  );
});

export default Loader;
