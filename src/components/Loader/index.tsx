import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Images from '~/res/images';
import { SvgXml } from 'react-native-svg';
import Spinner from '~/res/images/resources/spinner/hp_spinner.png';
import FastImage from '@d11/react-native-fast-image';

const Loader = React.memo(({ visible }: { visible: boolean }) => {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <View style={styles.coverView}>
                <FastImage
                    style={styles.image}
                    source={Spinner}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
        </View>
    )
})

export default Loader;