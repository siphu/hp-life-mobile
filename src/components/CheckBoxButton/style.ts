import {StyleSheet} from 'react-native';
import {config} from '~/config/config';

const styles = StyleSheet.create({
  fullFlex: {
    flex: 1,
  },
  radioChecked: {
    backgroundColor: config.color.neutral[50],
    borderRadius: 5,
    height: 10,
    width: 10,
  },
  radioCircle: {
    alignItems: 'center',
    borderColor: config.color.neutral[50],
    borderRadius: 2,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    marginRight: 10,
    width: 20,
  },
  radioRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 3,
    paddingHorizontal: 5,
  },
  radioText: {
    flex: 1,
  },
});

export default styles;
