import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  tooltipPanel: {
    backgroundColor: 'white',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    bottom: 0,
    elevation: 3,
    paddingBottom: 80,
    paddingHorizontal: 20,
    paddingTop: 8,
    position: 'absolute',
    shadowColor: '#222',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    width: '100%',
  },
});
