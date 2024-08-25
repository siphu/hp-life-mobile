import {StyleSheet} from 'react-native';
import {config} from '~/config/config';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  reverse: {
    flexDirection: 'row-reverse',
  },
  selectedTabName: {
    fontWeight: '500',
  },
  tab: {
    display: 'flex',
    flex: 1,
  },
  tabBar: {
    backgroundColor: config.color.neutral[300],
    height: 5,
    marginTop: 3,
  },
  tabName: {
    alignSelf: 'center',
  },
});
