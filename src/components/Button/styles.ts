import {StyleSheet} from 'react-native';
import {GlobalStyles} from '~/config/styles';

const styles = StyleSheet.create({
  ...GlobalStyles,
  ColoredButtonBG: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  ContainerView: {
    height: 50,
    width: '100%',
  },
  StyledText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  TouchArea: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
  },
  imageWrapper: {
    marginRight: 8,
  },
});

export default styles;
