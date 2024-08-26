import {Dimensions, StyleSheet} from 'react-native';
import {config} from '~/config/config';
import {GlobalStyles} from '~/config/styles';

export const styles = StyleSheet.create({
  ...GlobalStyles,
  container: {
    flex: 1,
  },
  welcomeBannerImage: {
    width: '100%',
    height: Dimensions.get('screen').width * 0.9618644068,
  },
  contentContainer: {
    flexGrow: 1,
    alignContent: 'stretch',
  },
});
