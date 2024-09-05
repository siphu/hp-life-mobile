import {Dimensions, StyleSheet} from 'react-native';
import {config} from '~/config/config';

export const styles = StyleSheet.create({
  topHeader: {
    backgroundColor: config.color.misc.border,
    height: Dimensions.get('screen').width * 0.6,
  },
  backgroundImage: {
    height: '100%',
    left: 0,
    resizeMode: 'cover',
    top: 0,
    width: '100%',
  },
  imageOverlay: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  overlay: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  textOverlayContainer: {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'flex-end',
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: '100%',
    rowGap: 4,
  },
  headerCourseName: {
    color: config.color.neutral[50],
    elevation: 3,
    fontSize: 30,
    fontWeight: '400',
    shadowColor: '#222',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    textAlign: 'left',
  },
  courseActionTextRow: {
    textAlign: 'left',
  },
  courseActionPercentText: {
    fontSize: 14,
    paddingTop: 6,
    textAlign: 'left',
  },
  courseActionDateText: {
    textAlign: 'left',
  },
  rowGap: {
    rowGap: 10,
  },
});
