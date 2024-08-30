import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Images from '~/res/images';
import { SvgXml } from 'react-native-svg';
import Spinner from '~/res/images/resources/spinner.svg';

const Loader = React.memo(({ visible }: { visible: boolean }) => {
    if (!visible) return null;
    return (
        <View style={styles.container}>
            <View style={styles.coverView}>
                <Spinner width="100%" height="100%" />
            </View>
        </View>
    )
})

export default Loader;