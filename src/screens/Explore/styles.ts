import { Dimensions, StyleSheet } from 'react-native';
import { config } from '~/config/config';

const screenWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = Math.floor(screenWidth * 0.3);

const PADDING_HORIZONTAL = 20;
const ITEM_SPACING = 10;

export { screenWidth, ITEM_HEIGHT, PADDING_HORIZONTAL, ITEM_SPACING };

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
    height: ITEM_HEIGHT - 10,
    width: ITEM_HEIGHT - 10,
  },
  rightContainer: {
    flexGrow: 1,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  categoryText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 10,
    lineHeight: 12,
    letterSpacing: 0.17,
    textAlign: 'left',
  },
  tagContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    columnGap: 5,
  },
  tagCompleted: {
    padding: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#87BE63',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  tagInProgress: {
    padding: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FDFF6E',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 12,
  },
  tagAvailableOffline: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    backgroundColor: 'rgba(204, 204, 204, 1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 1)',
  },
  cloudImageContainer: {
    marginRight: 5,
  },
  outerTagContainer: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 5,
  },
});
