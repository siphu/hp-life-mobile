import { config } from "~/config/config";
import AlertBanner from "../AlertBanner";
import Text from "../Text";
import { t } from "~/providers/TranslationProvider";
import styles from "./styles";


export default () => (
    <AlertBanner backgroundColor={'#D32F2F'}>
        <Text style={styles.message}>{t('offline.bannerMessage')}</Text>
    </ AlertBanner>
);