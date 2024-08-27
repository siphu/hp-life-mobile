import { config } from "~/config/config";
import AlertBanner from "../AlertBanner";
import Text from "../Text";
import { t } from "~/providers/TranslationProvider";


export default () => (
    <AlertBanner backgroundColor={config.color.misc.danger}>
        <Text style={{ color: config.color.neutral[50] }}>{t('offline.bannerMessage')}</Text>
    </ AlertBanner>
);