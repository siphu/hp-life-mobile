import { Dimensions, StyleSheet } from 'react-native';
import { config } from '~/config/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: config.color.neutral[50],
  },
  touchableListItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 10,
  },
  bodyText: {
    color: config.color.misc.textSecondary,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17.76,
    letterSpacing: 0.17,
    marginVertical: 2,
    textAlign: 'left',
  },
  textContainer: {
    alignItems: 'flex-start',
    rowGap: 2,
  },
  readContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
  },
  imageBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  remoteImage: {
    width: 40,
    height: 40,
    aspectRatio: 1,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    textAlign: 'left',
  },
  subText: {
    color: config.color.misc.border,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 17.76,
  },
  biggerTouchable: {
    margin: -8,
    padding: 16,
  },
  border: {
    backgroundColor: '#E0E0E0',
    height: 1,
  },
  clearAllText: {
    color: config.color.misc.primary,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  headerStyle: {
    flexDirection: 'row-reverse',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
});
