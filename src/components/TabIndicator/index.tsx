import * as React from 'react';
import {
  ColorValue,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Text } from '~/components/Text';
import { config } from '~/config/config';
import { styles } from './style';

export interface TabIndicatorProps {
  tabs: string[];
  selected: number;
  style?: StyleProp<ViewStyle>;
  backgroundColor?: ColorValue;
  selectedBackgroundColor?: ColorValue;
  barStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  tabStyle?: StyleProp<TextStyle>;
  selectedTabStyle?: StyleProp<TextStyle>;
  selectedTextStyle?: StyleProp<TextStyle>;
  onTabSwitch?: (index: number, name: string) => void;
}

export default React.memo((props: TabIndicatorProps) => {

  const TabHeader = ({ name, selected }: { name: string; selected: boolean }) => {

    return (
      <View
        style={[
          styles.tab,
          props.tabStyle ?? {},
          selected ? props.selectedTabStyle : {},
        ]}
        key={name}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (props.onTabSwitch) {
              props.onTabSwitch(
                props.tabs.findIndex(n => n === name),
                name,
              );
            }
          }}>
          <View>
            <Text
              style={[
                styles.tabName,
                props.textStyle || {},
                selected ? styles.selectedTabName : {},
                selected && props.selectedTextStyle
                  ? props.selectedTextStyle
                  : {},
              ]}>
              {name}
            </Text>
            <View
              style={[
                styles.tabBar,
                props.barStyle ?? {},
                {
                  backgroundColor: selected
                    ? props.selectedBackgroundColor || config.color.button.primary
                    : props.backgroundColor || config.color.neutral[300],
                },
              ]}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  return (
    <View
      accessible={false}
      accessibilityRole={Platform.OS === 'ios' ? 'tabbar' : 'tablist'}
      style={[styles.container, props.style ?? {}]}>
      {props.tabs.map((n, i) => <TabHeader key={'tabheader_' + i.toString()} name={n} selected={i === props.selected} />)}
    </View>
  );
});