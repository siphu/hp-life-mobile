import React from 'react';
import { MyBadge } from '~/api/endpoints';
import { styles } from '../styles';
import { Image, View } from 'react-native';
import Text from '~/components/Text';
import FastImage from '@d11/react-native-fast-image';
import { t } from '~/providers/TranslationProvider';
import moment from 'moment';
import { config } from '~/config/config';
import { friendlyDate } from '~/utils';
import {
  ColorMatrix,
  grayscale,
  brightness,
  concatColorMatrices,
} from 'react-native-color-matrix-image-filters';
import Button from '~/components/Button';

const BadgeImage = ({ item }: { item: MyBadge }) => {
  const isEarned = !!item.issueDate;

  return (
    <View
      style={{
        opacity: isEarned ? 1 : 0.5,
        backgroundColor: !item.imageUrl ? config.color.misc.border : undefined,
        ...styles.badgeImageBackground,
      }}>
      {(item.imageUrl && !isEarned && (
        <ColorMatrix
          matrix={concatColorMatrices(grayscale(1), brightness(0.7))}>
          <FastImage
            source={{ uri: item.imageUrl }}
            style={[{ opacity: 0.4 }, styles.remoteImage]}
          />
        </ColorMatrix>
      )) || (
        <Image source={{ uri: item.imageUrl }} style={[styles.remoteImage]} />
      )}
    </View>
  );
};

export class BadgeItem extends React.PureComponent<{
  item: MyBadge;
  onShare: () => void;
}> {
  render() {
    const { item, onShare } = this.props;
    const isEarned = !!item.issueDate;
    return (
      <View style={styles.badgeContainer}>
        <View style={styles.badgeRow}>
          <View style={styles.badgeImageContainer}>
            <BadgeImage item={item} />
          </View>
          <View style={styles.badgeRightContainer}>
            <Text
              numberOfLines={2}
              style={{
                ...styles.titleText,
                color: isEarned ? config.color.misc.text : '#00000099',
              }}>
              {item.name}
            </Text>
            <Text numberOfLines={3} style={styles.badgeDescriptionText}>
              {item.description}
            </Text>
            {isEarned && (
              <Text style={styles.badgeEarnedOnText}>
                {`${t('myCourse.badgeEarnedOn')} ${friendlyDate(
                  moment(item.issueDate),
                )}`}
              </Text>
            )}
          </View>
        </View>
        {isEarned && (
          <View>
            <Button
              color={config.color.neutral[900]}
              onPress={onShare}
              title={t('myCourse.badgeShare')}
              style={{
                height: 36,
              }}
            />
          </View>
        )}
      </View>
    );
  }
}
