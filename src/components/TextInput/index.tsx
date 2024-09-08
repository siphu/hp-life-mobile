import React from 'react';
import {
  Platform,
  TextInput as RNTextInput,
  TextInputProps,
} from 'react-native';
import { config } from '~/config/config';

export interface ExpandedTextInputProps extends TextInputProps {
  innerRef?: React.LegacyRef<RNTextInput>;
}

const TextInput: React.FC<ExpandedTextInputProps> = ({
  innerRef,
  style,
  ...rest
}) => {
  const fontName = Platform.select({
    ios: config.defaultFont.ios,
    android: config.defaultFont.android,
  });

  return (
    <RNTextInput
      ref={innerRef}
      style={[{ fontFamily: fontName }, style]}
      {...rest}
    />
  );
};

export default TextInput;
