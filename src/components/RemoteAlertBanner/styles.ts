import { StyleSheet } from 'react-native';
import { config } from '~/config/config';

const styles = StyleSheet.create({
  message: {
    color: config.color.neutral[50],
    fontSize: 13,
    lineHeight: 19.5,
  },
});

export default styles;
