import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles, padding } from './styles';
import { GlobalStyles } from '~/config/styles';
import Modal from 'react-native-modal';
import { stores } from '~/stores';
import { setLoader } from '~/stores/app/actions';
interface AlertProps {
  position?: 'Top' | 'Bottom' | 'Center';
  show: boolean;
  onRequestClose?: () => void;
  children?: React.ReactElement;
}

export const loaderWrapper = async (fn: () => Promise<unknown>) => {
  stores.dispatch(setLoader(true));
  await fn();
  stores.dispatch(setLoader(false));
};

const Alert = ({ position, children, show, onRequestClose }: AlertProps) => {
  const inset = useSafeAreaInsets();

  const overlay =
    position === 'Top'
      ? styles.overlayTop
      : position === 'Bottom'
        ? styles.overlayBottom
        : styles.overlayCenter;

  const container =
    position === 'Top'
      ? styles.containerTop
      : position === 'Bottom'
        ? styles.containerBottom
        : styles.containerCenter;

  return (
    <Modal
      animationIn={
        position === 'Top'
          ? 'slideInDown'
          : position === 'Bottom'
            ? 'slideInUp'
            : 'bounceIn'
      }
      presentationStyle="overFullScreen"
      statusBarTranslucent={true}
      coverScreen={true}
      isVisible={show}
      backdropOpacity={0.1}
      style={{ flex: 1, margin: 0, padding: 0 }}
      onBackdropPress={onRequestClose}
      onBackButtonPress={onRequestClose}>
      <View style={overlay}>
        <View
          style={{
            ...container,
            paddingTop:
              position === 'Top'
                ? padding + inset.top + GlobalStyles.header.height
                : padding,
            paddingBottom:
              position === 'Bottom'
                ? padding + padding + inset.bottom
                : padding,
          }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default Alert;
