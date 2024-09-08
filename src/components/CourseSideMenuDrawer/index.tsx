import React from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { GlobalStyles } from '~/config/styles';
import { config } from '~/config/config';
import { Lesson as LessonModel } from '~/api/endpoints';
import { Lesson } from './components/Lesson';
import { Header } from './components/Header';
import { Information } from './components/Information';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { useCourseProviderContext } from '~/providers/CourseProvider';

export interface CourseSideMenuProps {
  navigation: DrawerNavigationHelpers;
}

type CourseSideMenuDrawerProps = CourseSideMenuProps &
  DrawerContentComponentProps;

const CourseSideMenuDrawer = ({ navigation }: CourseSideMenuDrawerProps) => {
  const courseContextProvider = useCourseProviderContext();

  const renderLesson = ({ item }: { item: LessonModel }) => (
    <Lesson
      course={courseContextProvider.course!}
      lesson={item}
      selectedTask={courseContextProvider.task}
      navigation={navigation}
      enrolled={courseContextProvider.enrolled}
    />
  );

  const renderSeparator = () => (
    <View
      style={{
        borderBottomWidth: 1,
        borderColor: config.color.misc.borderDark,
      }}
    />
  );

  if (!courseContextProvider.course) return;

  return (
    <View style={GlobalStyles.screenContainer}>
      <Header
        navigation={navigation}
        course={courseContextProvider.course}
        enrolled={courseContextProvider.enrolled}
      />
      <FlatList
        accessible={false}
        accessibilityRole="menu"
        style={GlobalStyles.screenContainer}
        data={courseContextProvider.course.lessons || []}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <Information course={courseContextProvider.course} />
        }
        ListHeaderComponentStyle={{
          borderBottomWidth: 1,
          borderBottomColor: config.color.misc.borderDark,
        }}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderLesson}
        ListFooterComponent={
          <SafeAreaView
            edges={['bottom']}
            style={{
              borderTopWidth: 1,
              borderColor: config.color.misc.borderDark,
            }}
          />
        }
      />
    </View>
  );
};

export default CourseSideMenuDrawer;
