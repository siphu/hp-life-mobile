import {Dimensions, StyleSheet} from 'react-native';
import {config} from '~/config/config';

const screenWidth = Dimensions.get('window').width;
const ITEM_HEIGHT = 150;
const PADDING_HORIZONTAL = 20;
const ITEM_SPACING = 20;

export {screenWidth, ITEM_HEIGHT, PADDING_HORIZONTAL, ITEM_SPACING};

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
    width: screenWidth - PADDING_HORIZONTAL * 2,
    backgroundColor: 'lightgrey',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
