import { StyleSheet } from 'react-native';
import { config } from '~/config/config';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#D32F2F',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  message: {
    color: config.color.neutral[50],
    fontSize: 13,
    lineHeight: 19.5,
  },
});

export default styles;
