import {StyleSheet} from 'react-native';
import {config} from '~/config/config';

export const styles = StyleSheet.create({
  hr: {
    borderColor: config.color.neutral[900],
    borderWidth: 0.75,
    marginVertical: 15,
  },
  jumbotron: {
    marginBottom: 16,
  },
  latestCourseContainer: {},
  scrollContent: {
    backgroundColor: config.color.neutral[50],
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'stretch',
    rowGap: 20,
  },
  scrollStyle: {
    backgroundColor: config.color.neutral[50],
    flexGrow: 1,
  },
  textHeader: {
    fontSize: 25,
    paddingBottom: 10,
  },
  textLatestCourseHeader: {
    fontSize: 18,
    textAlign: 'left',
  },
  courseWidget: {
    borderWidth: 1,
    marginBottom: 10,
  },
  backgroundImage: {
    overflow: 'hidden',
    resizeMode: 'cover',
    width: '100%',
    aspectRatio: 1.592592592592593,
    backgroundColor: 'rgba(230, 230, 230, 1)',
  },
  backgroundImageContainer: {},
  backgroundImageStyle: {
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: 'rgba(230, 230, 230, 1)',
    padding: 16,
    alignItems: 'flex-start',
  },
  buttonRowContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  progressExtraMargin: {
    marginRight: 8,
  },
  cloudImageContainer: {
    marginRight: 5,
  },
  categoryContainer: {
    paddingBottom: 2,
  },
  categoryText: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.17,
  },
  titleText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 18,
    lineHeight: 24.3,
    letterSpacing: 0.15,
  },
  offlineText: {
    fontSize: 16,
    color: config.color.neutral[50],
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
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14.4,
    letterSpacing: 0.16,
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
  tagRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
