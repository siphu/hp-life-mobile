import {StyleSheet} from 'react-native';
import {config} from '~/config/config';
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
  primaryVariant: {
    backgroundColor: config.color.neutral[900],
    borderWidth: 0,
    color: config.color.neutral[50],
  },
  secondaryVariant: {
    backgroundColor: config.color.neutral[50],
    borderWidth: 1,
    borderColor: config.color.neutral[900],
    color: config.color.neutral[900],
  },
});

export default styles;
