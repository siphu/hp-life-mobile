import { Dimensions, StyleSheet } from 'react-native';
import { GlobalStyles } from '~/config/styles';

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
  mainContentContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  loginMessage: {
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    rowGap: 10,
  },
});
