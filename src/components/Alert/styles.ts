import { Dimensions, StyleSheet } from 'react-native';

const radius = 20;
const padding = 20;

const modalContainer = {
  width: Dimensions.get('window').width * 0.9,
  paddingTop: padding,
  paddingHorizontal: padding,
  backgroundColor: 'white',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
};

export const styles = StyleSheet.create({
  overlayTop: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  overlayCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  containerTop: {
    ...modalContainer,
    paddingHorizontal: padding,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    paddingTop: 0,
    paddingBottom: 0,
  },
  containerCenter: {
    ...modalContainer,
    paddingVertical: padding,
    paddingHorizontal: padding,
    borderRadius: radius,
    paddingTop: 0,
    paddingBottom: 0,
  },
  containerBottom: {
    ...modalContainer,
    paddingHorizontal: padding,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    paddingTop: 0,
    paddingBottom: 0,
  },
});

export { padding, radius };
