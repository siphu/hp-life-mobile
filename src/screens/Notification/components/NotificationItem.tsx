import {TouchableOpacity, View} from 'react-native';
import Text from '~/components/Text';
import {Notification as NotificationModel} from '~/api/endpoints';
import {MaterialIcons} from '~/components/MaterialIcons';
import {config} from '~/config/config';
import FastImage from '@d11/react-native-fast-image';
import {styles} from '../styles';
import {GlobalStyles} from '~/config/styles';
import {friendlyDate} from '~/utils';
import moment from 'moment';
import {t} from '~/providers/TranslationProvider';
import Images from '~/res/images';
import React from 'react';

export const NotificationItem = React.memo(
  ({
    item,
    onClick,
    onDelete,
  }: {
    item: NotificationModel;
    onClick: (item: NotificationModel) => void;
    onDelete: (item: NotificationModel) => void;
  }) => {
    return (
      <View
        style={{
          ...styles.touchableListItem,
          backgroundColor: !item.isRead ? '#D5E7F7CC' : undefined,
        }}>
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => onClick(item)}
          style={[GlobalStyles.flexRow, GlobalStyles.flex]}>
          <View style={styles.imageContainer}>
            <View
              style={{
                backgroundColor: !item.imageUrl
                  ? config.color.misc.border
                  : undefined,
                ...styles.imageBackground,
              }}>
              {(item.imageUrl && (
                <FastImage
                  source={{uri: item.imageUrl}}
                  style={[styles.remoteImage, {borderRadius: 40}]}
                />
              )) ||
                (item.type === 'CourseCertificateEarned' && (
                  <FastImage
                    source={Images.pushNotification.certificate}
                    style={styles.remoteImage}
                  />
                )) ||
                (item.type === 'NewArticleAvailable' && (
                  <FastImage
                    source={Images.pushNotification.news}
                    style={styles.remoteImage}
                  />
                ))}
            </View>
          </View>
          <View style={GlobalStyles.flexShrink}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.bodyText}>{item.body}</Text>
              <Text style={styles.subText}>
                {friendlyDate(moment(item.creationDate))}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={GlobalStyles.flexCenter}>
          <TouchableOpacity
            accessibilityLabel={t('accessibility.close')}
            accessibilityRole="button"
            style={styles.biggerTouchable}
            onPress={() => onDelete(item)}>
            <MaterialIcons
              name="close"
              size={24}
              color={config.color.neutral[900]}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
