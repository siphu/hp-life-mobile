import { StyleSheet } from 'react-native';
import { config } from './config';

export const GlobalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: config.color.neutral[50],
  },
  flex: {
    flex: 1,
  },
  flexGrow: {
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  touchablePadding: {
    margin: -10,
    padding: 10,
  },
  header: {
    height: 60,
    backgroundColor: '#0096d6',
  },
  flexShrink: {
    flexShrink: 1,
  },
  flexCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
