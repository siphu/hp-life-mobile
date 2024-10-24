import React from 'react';
import { FlatList, ListRenderItem, RefreshControl, View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '~/stores';
import { GlobalStyles } from '~/config/styles';
import {
  CERTIFICATE_ITEM_HEIGHT,
  HEADER_HEIGHT,
  HEADER_WITH_CERTIFICATE,
  ITEM_HEIGHT,
  ITEM_SPACING,
  styles,
} from './styles';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  downloadCertificate,
  downloadTranscript,
  getEnrolledCourses,
  shareBadge,
  shareCertificate,
} from '~/api/helpers';
import { CourseStatus, TraineeCourse, MyBadge } from '~/api/endpoints';
import { CourseItem } from './components/CourseItem';
import { BadgeItem } from './components/BadgeItem';
import HeaderComponent from './components/HeaderComponent';
import { AuthenticatedScreens } from '~/navigation/screens';
import { CertificateItem } from './components/CertificateItem';
import Text from '~/components/Text';
import { t } from '~/providers/TranslationProvider';
import { loaderWrapper } from '~/components/Alert';

const RENDER_PER_PAGE = 8;

const connector = connect((state: RootState) => ({
  online: state.app.online,
  data: [...state.course.enrolled].sort(
    (a, b) =>
      new Date(b.lastAccessDate).getTime() -
      new Date(a.lastAccessDate).getTime(),
  ),
  badges: state.user.badges,
  options: !state.app.online
    ? ['myCourse.ebook']
    : state.course.enrolled.some(C => C.status === CourseStatus.Archived)
      ? [
          'myCourse.inProgress',
          'myCourse.ebook',
          'myCourse.completed',
          'myCourse.badges',
          'myCourse.archived',
        ]
      : [
          'myCourse.inProgress',
          'myCourse.ebook',
          'myCourse.completed',
          'myCourse.badges',
        ],
}));

const Dashboard: React.FC<ConnectedProps<typeof connector>> = ({
  badges,
  data,
  options,
  online,
}) => {
  const navigation = useNavigation();
  const route = useRoute<{
    key: string;
    name: string;
    params: {
      category?: string;
    };
  }>();
  const isFocused = useIsFocused();
  const [displayedData, setDisplayedData] = React.useState<
    (TraineeCourse | MyBadge)[]
  >([]);
  const [selectedOptions, setSelectedOptions] = React.useState<string>(
    !online
      ? 'myCourse.ebook'
      : route.params?.category || 'myCourse.inProgress',
  );

  const onRefresh = React.useCallback(async (force?: boolean) => {
    getEnrolledCourses(force);
  }, []);

  React.useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  const filteredData = React.useMemo(() => {
    if (selectedOptions === 'myCourse.badges') {
      return badges; // Use badges data when 'myCourse.badges' is selected
    }

    let newData = [...data];
    if (selectedOptions === 'myCourse.inProgress') {
      newData = newData.filter(
        C =>
          C.enrollmentStatus === 'Enrolled' &&
          ((C.progress && C.progress < 1) || !C.progress),
      );
    } else if (selectedOptions === 'myCourse.completed') {
      newData = newData.filter(C => C.progress && C.progress >= 1);
    } else if (selectedOptions === 'myCourse.archived') {
      newData = newData.filter(C => C.status === CourseStatus.Archived);
    } else {
      newData = [];
    }
    return newData.filter(item => item && item.id); // Filter out items with null/undefined id
  }, [data, badges, selectedOptions]);

  React.useEffect(() => {
    setDisplayedData(filteredData.slice(0, RENDER_PER_PAGE));
  }, [filteredData]);

  const loadMore = () => {
    const currentLength = displayedData.length;
    if (currentLength < filteredData.length) {
      const nextData = filteredData.slice(
        currentLength,
        currentLength + RENDER_PER_PAGE,
      );
      setDisplayedData(prevData => [...prevData, ...nextData]);
    }
  };

  const renderItem: ListRenderItem<TraineeCourse | MyBadge> = React.useCallback(
    ({ item }) => {
      if (selectedOptions === 'myCourse.badges') {
        return (
          <BadgeItem
            item={item as MyBadge}
            onShare={() => shareBadge(item as MyBadge)}
          />
        );
      } else if (selectedOptions === 'myCourse.completed') {
        return (
          <CertificateItem
            item={item as TraineeCourse}
            onClick={() =>
              navigation.navigate(AuthenticatedScreens.CourseDrawer, {
                screen: AuthenticatedScreens.CourseInformation,
                params: { courseId: item.id as number },
              })
            }
            onShare={() => shareCertificate(item as TraineeCourse)}
            onDownload={() =>
              loaderWrapper(() => downloadCertificate(item as TraineeCourse))
            }
          />
        );
      } else {
        return (
          <CourseItem
            item={item as TraineeCourse}
            onClick={() =>
              navigation.navigate(AuthenticatedScreens.CourseDrawer, {
                screen: AuthenticatedScreens.CourseInformation,
                params: { courseId: item.id },
              })
            }
          />
        );
      }
    },
    [selectedOptions, navigation],
  );

  React.useEffect(() => {
    if (route.params?.category && route.params?.category !== selectedOptions) {
      setSelectedOptions(route.params?.category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const itemLength = React.useMemo(
    () =>
      selectedOptions === 'myCourse.completed'
        ? CERTIFICATE_ITEM_HEIGHT
        : ITEM_HEIGHT,
    [selectedOptions],
  );
  const headerHeight = React.useMemo(
    () =>
      selectedOptions === 'myCourse.completed'
        ? HEADER_WITH_CERTIFICATE
        : HEADER_HEIGHT,
    [selectedOptions],
  );

  const deDupedData = React.useMemo(() => {
    const uniqueItems = new Map();

    displayedData.forEach(item => {
      const uniqueId = item.id ? item.id.toString() : item.name;
      if (!uniqueItems.has(uniqueId)) {
        uniqueItems.set(uniqueId, item);
      }
    });

    // Return the array of unique items
    return Array.from(uniqueItems.values());
  }, [displayedData]);

  return (
    <View style={GlobalStyles.screenContainer}>
      <FlatList
        style={GlobalStyles.flex}
        data={deDupedData}
        renderItem={renderItem}
        ListHeaderComponent={
          <HeaderComponent
            categories={options}
            selected={selectedOptions}
            onSelect={s => setSelectedOptions(s!)}
            showDownloadTranscript={selectedOptions === 'myCourse.completed'}
            onTranscript={() => loaderWrapper(() => downloadTranscript())}
          />
        }
        keyExtractor={item => (item.id ? item.id.toString() : item.name)}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => onRefresh(true)}
          />
        }
        showsVerticalScrollIndicator={true}
        indicatorStyle={'black'}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={{ height: ITEM_SPACING }} />}
        ListEmptyComponent={() => (
          <View style={styles.centerView}>
            <Text style={styles.noCourseText}>
              {t(
                selectedOptions === 'myCourse.completed'
                  ? 'myCourse.noCertificate'
                  : 'myCourse.noCourse',
              )}
            </Text>
          </View>
        )}
        getItemLayout={
          selectedOptions !== 'myCourse.badges'
            ? (_, index) => ({
                length: itemLength,
                offset: headerHeight + (itemLength + ITEM_SPACING) * index,
                index,
              })
            : undefined
        }
        initialNumToRender={RENDER_PER_PAGE}
        maxToRenderPerBatch={
          selectedOptions !== 'myCourse.badges' ? RENDER_PER_PAGE : undefined
        }
        windowSize={
          selectedOptions !== 'myCourse.badges'
            ? Math.ceil(RENDER_PER_PAGE / 2)
            : undefined
        }
        removeClippedSubviews={selectedOptions !== 'myCourse.badges'}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default connector(Dashboard);
