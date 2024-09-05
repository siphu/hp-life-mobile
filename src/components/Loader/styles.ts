import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  coverView: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    //backgroundColor: 'rgba(100, 100, 100, 0.5)',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  image: {
    width: '50%',
    height: 'auto',
    aspectRatio: 1,
  },
});

export default styles;
