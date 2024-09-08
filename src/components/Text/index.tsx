import {Text as RNText, TextProps} from 'react-native';
import {config} from '~/config/config';
export const Text = (props: TextProps) => {
  return (
    <RNText
      {...props}
      style={[
        {
          fontFamily: config.font,
          color: 'black',
          fontSize: 14,
        },
        props.style ? props.style : {},
      ]}
    />
  );
};
export default Text;
