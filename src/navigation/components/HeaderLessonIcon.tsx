import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '~/components/MaterialIcons';
import Text from '~/components/Text';
import {config} from '~/config/config';
import {GlobalStyles} from '~/config/styles';
import {t} from '~/providers/TranslationProvider';

const styles = StyleSheet.create({
  touchableArea: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
    ...GlobalStyles.touchablePadding,
    marginRight: 10,
  },
  menuLessonText: {
    color: config.color.neutral[900],
    fontSize: 16,
    fontWeight: '500',
  },
});
interface MenuHeaderProp {
  onPress?: () => void;
}
export const HeaderLessonIcon = (props: MenuHeaderProp) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.touchableArea}>
      <Text style={styles.menuLessonText}>
        {t('courseExecution.lessonMenu')}
      </Text>
      <MaterialIcons name="list" size={30} color={'black'} />
    </TouchableOpacity>
  );
};
