import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '~/components/Text';
import LinearGradient from 'react-native-linear-gradient';

import Images from '~/res/images';
import { styles } from '../styles';
import { MaterialIcons } from '~/components/MaterialIcons';
import FastImage from '@d11/react-native-fast-image';
import { Course } from '~/api/endpoints';

export default ({ course }: { course: Course }) => {
    return (
        <View style={styles.topHeader}>
            <FastImage
                style={styles.backgroundImage}
                source={{
                    uri: course.imageUrl,
                }}
            />
            <LinearGradient
                style={styles.overlay}
                colors={['rgba(0,0,0,0.00)', 'rgba(0,0,0,0.95)']}>
                <View style={styles.textOverlayContainer}>
                    <Text style={styles.headerCourseName}>
                        {course.name || ''}
                    </Text>
                </View>

            </LinearGradient>
        </View>
    );
};
