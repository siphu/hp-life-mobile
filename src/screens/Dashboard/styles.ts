import {Dimensions, StyleSheet} from 'react-native';
import {config} from '~/config/config';

const screenWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = Math.floor(screenWidth * 0.3);

const CERTIFICATE_ITEM_HEIGHT = ITEM_HEIGHT + 40;

const PADDING_HORIZONTAL = 20;
const ITEM_SPACING = 10;
const HEADER_HEIGHT = 60;
const HEADER_WITH_CERTIFICATE = 110;

export {
  screenWidth,
  CERTIFICATE_ITEM_HEIGHT,
  HEADER_WITH_CERTIFICATE,
  ITEM_HEIGHT,
  PADDING_HORIZONTAL,
  ITEM_SPACING,
  HEADER_HEIGHT,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingTop: 20,
    paddingBottom: 20,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    width: '100%',
    backgroundColor: config.color.neutral[50],
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'row',
    borderWidth: 1,
  },
  image: {
    height: '100%',
    width: ITEM_HEIGHT,
  },
  rightContainer: {
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
    justifyContent: 'space-between',
    display: 'flex',
  },
  titleText: {
    color: config.color.misc.text,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
  },
  extraText: {
    color: config.color.misc.text,
    fontSize: 12,
    textAlign: 'left',
  },
  progressBarContainer: {
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarText: {
    alignSelf: 'center',
    color: config.color.neutral[900],
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },

  badgeContainer: {
    flexDirection: 'column',
    padding: 15,
    borderColor: config.color.neutral[300],
    borderWidth: 1,
    backgroundColor: '#FAFAFA',
    marginBottom: 8,
    //height: BADGE_HEIGHT,
  },
  badgeRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  badgeImageContainer: {
    padding: 6.5,
    marginRight: 10,
    justifyContent: 'center',
  },
  badgeImageBackground: {
    width: 67,
    height: 67,
    borderRadius: 35,
  },
  remoteImage: {
    width: 67,
    height: 67,
    aspectRatio: 1,
  },
  badgeDescriptionText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: 0.17,
    color: config.color.misc.textSecondary,
    textAlign: 'left',
  },
  badgeEarnedOnText: {
    marginTop: 10,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    letterSpacing: 0.15,
    color: config.color.misc.primary,
    textAlign: 'left',
  },
  badgeRightContainer: {
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 5,
    justifyContent: 'center',
    display: 'flex',
    rowGap: 8,
  },
});
