import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import Text from '~/components/Text';
import { RootState } from '~/stores';
import { getAvailableCourses } from '~/api/helpers';
import { GlobalStyles } from '~/config/styles';
import { styles } from './styles';
import Jumbotron from './components/Jumbotron';
import { useIsFocused } from '@react-navigation/native';
import { t } from '~/providers/TranslationProvider';
import { Course } from '~/api/endpoints';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '~/navigation';
import { AuthenticatedScreens } from '~/navigation/screens';

const connector = connect(
  (
    state: RootState,
    ownProps: {
      navigation: StackNavigationProp<
        RootStackParamList,
        AuthenticatedScreens.Home
      >;
    },
  ) => ({
    data:
      [...(state.course.available[state.app.language] || [])]
        .sort(
          (a, b) =>
            new Date(b.publishDate!).getTime() -
            new Date(a.publishDate!).getTime(),
        )
        .slice(0, 15) || [],
    language: state.app.language,
    online: state.app.online,
    navigation: ownProps.navigation,
  }),
);
const Home: React.FC<ConnectedProps<typeof connector>> = ({
  data,
  online,
  navigation,
}) => {
  const isFocused = useIsFocused();

  const onRefresh = async (force?: boolean) => {
    try {
      await getAvailableCourses(force);
    } catch (e) {
      console.log('e', e);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  return (
    <View style={GlobalStyles.screenContainer}>
      <FlatList
        style={styles.scrollStyle}
        contentContainerStyle={styles.scrollContent}
        ListHeaderComponent={
          <Text style={styles.textLatestCourseHeader}>
            {t('home.latestCourse')}
          </Text>
        }
        showsVerticalScrollIndicator={true}
        indicatorStyle={'black'}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => onRefresh(true)}
          />
        }
        data={data}
        renderItem={React.useCallback(
          ({ item }: { item: Course }) => (
            <Jumbotron
              course={item}
              key={item.id.toString()}
              navigation={navigation}
              disabled={!online}
            />
          ),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [],
        )}
      />
    </View>
  );
};

export default connector(Home);
