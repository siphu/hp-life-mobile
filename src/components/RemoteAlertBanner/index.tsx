

import { config } from "~/config/config";
import AlertBanner from "../AlertBanner";
import Text from "../Text";
import { t } from "~/providers/TranslationProvider";
import styles from "./styles";
import { CurrentAlertApiModel } from "~/api/model";
import React from "react";


export default ({ alerts }: { alerts: CurrentAlertApiModel[] }) => {

    return (
        <>
            {alerts.map(alert => {
                const backgroundColor = alert.type === 'Success' ? 'rgba(46, 125, 50, 0.30)' : 'rgba(211, 47, 47, 0.30)';
                return (
                    <AlertBanner backgroundColor={backgroundColor} key={alert.id.toString()}>
                        <Text style={{ color: '#00000099' }}>{alert.message}</Text>
                    </AlertBanner>
                );
            }
            )}
        </>
    );
};