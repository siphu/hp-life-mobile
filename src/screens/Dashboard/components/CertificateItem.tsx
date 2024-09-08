import React from 'react';
import { Course } from '~/api/endpoints';
import { CERTIFICATE_ITEM_HEIGHT, styles } from '../styles';
import { TouchableOpacity, View } from 'react-native';
import Text from '~/components/Text';
import FastImage from '@d11/react-native-fast-image';
import { t } from '~/providers/TranslationProvider';
import moment from 'moment';
import { config } from '~/config/config';
import { friendlyDate } from '~/utils';
import Button from '~/components/Button';
import { MaterialSymbolsOutlined } from '~/components/MaterialIcons';

export class CertificateItem extends React.PureComponent<{
  item: Course;
  onClick: () => void;
  onShare: () => void;
  onDownload: () => void;
}> {
  render() {
    const { item, onClick, onShare, onDownload } = this.props;

    const extraTextInProgress =
      t('courseInformation.startedDate') +
      ': ' +
      (item.startDate
        ? friendlyDate(moment(item.startDate))
        : t('courseInformation.neverDate'));

    const extraTextCompleted =
      t('courseInformation.finishDate') +
      ': ' +
      friendlyDate(moment(item.finishDate));

    return (
      <TouchableOpacity
        accessible={false}
        style={[styles.itemContainer, { height: CERTIFICATE_ITEM_HEIGHT }]}
        onPress={onClick}>
        <TouchableOpacity
          accessible={false}
          accessibilityElementsHidden={true}
          importantForAccessibility="no-hide-descendants"
          onPress={onClick}
          style={{
            height: '100%',
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5,
          }}>
          <View style={{ paddingVertical: 5 }}>
            <FastImage
              accessibilityElementsHidden={true}
              importantForAccessibility="no-hide-descendants"
              accessible={false}
              accessibilityLabel={''}
              accessibilityHint={''}
              accessibilityRole={'none'}
              source={{ uri: item.imageUrl }}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </TouchableOpacity>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={onClick} accessibilityRole="button">
            <Text style={styles.titleText} numberOfLines={2}>
              {item.name}
            </Text>
          </TouchableOpacity>
          <View style={{ rowGap: 4, paddingBottom: 5 }}>
            <Text style={styles.extraText}>
              {item.progress && item.progress >= 1
                ? extraTextCompleted
                : extraTextInProgress}
            </Text>
            <Button
              style={{ height: 32 }}
              color={config.color.neutral[900]}
              title={t('myCourse.downloadTranscript')}
              onPress={onDownload}
              icon={
                <MaterialSymbolsOutlined
                  name="download"
                  size={20}
                  color={config.color.neutral[50]}
                />
              }
            />
            <Button
              style={{ height: 32 }}
              color={config.color.neutral[900]}
              title={t('myCourse.share')}
              onPress={onShare}
              icon={
                <MaterialSymbolsOutlined
                  name="ios_share"
                  size={18}
                  color={config.color.neutral[50]}
                />
              }
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
