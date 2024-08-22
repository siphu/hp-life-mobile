import {StyleSheet} from 'react-native';

export const GlobalStyles = StyleSheet.create({
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
});
