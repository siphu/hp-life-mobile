import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Text} from '~/components/Text';
import {ColorValue} from 'react-native';
import {config} from '~/config/config';
import styles from './style';
import {MaterialIcons} from '~/components/MaterialIcons';

export interface RadioButtonProps {
  selected?: boolean;
  text?: string;
  color?: ColorValue;
  onSelect?: () => void;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
}

export const CheckBoxButton = (props: RadioButtonProps) => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole={'checkbox'}
      accessibilityState={{
        disabled: props.enabled === false,
        checked: props.selected,
      }}
      disabled={props.enabled === false}
      style={[styles.radioRow, props.style]}
      onPress={props.onSelect}>
      <View
        style={[
          styles.radioCircle,
          {borderColor: props.color ?? config.color.neutral[900]},
        ]}>
        {props.selected && (
          <MaterialIcons
            name="check"
            size={15}
            color={config.color.neutral[900]}
          />
        )}
      </View>
      {props.text && <Text style={styles.radioText}>{props.text}</Text>}
    </TouchableOpacity>
  );
};

export default CheckBoxButton;
