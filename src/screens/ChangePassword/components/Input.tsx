import * as React from 'react';
import { StyleProp, View, ViewStyle, I18nManager } from 'react-native';
import { Text } from '~/components/Text';
import { config } from '~/config/config';
import { styles } from '../styles';
import TextInput from '~/components/TextInput';

interface ProfileTextInputProps {
  title: string;
  value?: string;
  note?: string;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  enabled?: boolean;
  secureText?: boolean;
  onChange?: (t: string) => void;
  required?: boolean;
}
const Input = (props: ProfileTextInputProps) => {
  return (
    <View style={props.style}>
      <View>
        <Text style={styles.inputTitle}>
          {props.title}
          {props.required && <Text style={styles.required}>{' *'}</Text>}
        </Text>
      </View>
      <View
        style={[
          styles.inputRow,
          (props.enabled ?? false) === false ? styles.disableRow : {},
        ]}>
        <TextInput
          textAlign={I18nManager.isRTL ? 'right' : 'left'}
          secureTextEntry={props.secureText}
          editable={props.enabled ?? false}
          style={styles.inputText}
          placeholder={props.placeholder ?? ''}
          placeholderTextColor={config.color.misc.borderDark}
          value={props.value}
          onChangeText={props.onChange}
        />
      </View>
      {props.note && (
        <View>
          <Text style={styles.note}>{props.note}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;
