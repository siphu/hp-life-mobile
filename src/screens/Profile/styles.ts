import {StyleSheet} from 'react-native';
import {config} from '~/config/config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.neutral[50],
  },
  scrollContainer: {
    padding: 20,
    gap: 20,
  },
  inputTitle: {
    fontSize: 16,
    textAlign: 'left',
  },
  required: {
    color: config.color.misc.danger,
  },
  inputRow: {
    borderBottomColor: config.color.misc.borderDark,
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  disableRow: {
    backgroundColor: config.color.misc.border,
  },
  inputText: {
    color: config.color.neutral[900],
    fontSize: 14,
    height: 40,
    letterSpacing: 0.8,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingVertical: 5,
    textAlignVertical: 'center',
    width: '100%',
  },
  note: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
  },
  disabledButton: {
    backgroundColor: '#E6E6E6',
    color: '#475060',
  },
});
