import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '~/components/MaterialIcons';
import { GlobalStyles } from '~/config/styles';
import { config } from '~/config/config';

const styles = StyleSheet.create({
  touchableArea: {
    ...GlobalStyles.touchablePadding,
    marginLeft: 10,
  },
});
interface BackHeaderProp {
  onPress?: () => void;
}
export const HeaderHelpIcon = (props: BackHeaderProp) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableArea}>
      <MaterialIcons
        name={'help'}
        size={25}
        color={config.color.neutral[900]}
      />
    </TouchableOpacity>
  );
};
