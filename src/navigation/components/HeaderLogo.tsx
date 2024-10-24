import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { GlobalStyles } from '~/config/styles';
import Images from '~/res/images';

const styles = StyleSheet.create({
  container: {
    ...GlobalStyles.flex,
    ...GlobalStyles.header,
    justifyContent: 'flex-end',
  },
  headerRow: {
    height: GlobalStyles.header.height,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
interface HeaderLogoProp {
  onPress?: () => void;
}
export const HeaderLogo = (props: HeaderLogoProp) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableHighlight onPress={props.onPress}>
          <Images.logo.white width={80} height={'90%'} />
        </TouchableHighlight>
      </View>
    </View>
  );
};
