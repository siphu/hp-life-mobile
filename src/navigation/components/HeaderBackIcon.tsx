import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '~/components/MaterialIcons';
import { GlobalStyles } from '~/config/styles';
import { config } from '~/config/config';
import { I18nManager } from 'react-native';
const styles = StyleSheet.create({
  touchableArea: {
    ...GlobalStyles.touchablePadding,
    marginLeft: 10,
  },
});
interface BackHeaderProp {
  onPress?: () => void;
}
export const HeaderBackIcon = (props: BackHeaderProp) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableArea}>
      <MaterialIcons
        name={I18nManager.isRTL ? 'arrow_forward' : 'arrow_back'}
        size={30}
        color={config.color.neutral[900]}
      />
    </TouchableOpacity>
  );
};
