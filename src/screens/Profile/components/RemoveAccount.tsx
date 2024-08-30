import React from "react";
import { TouchableOpacity, View } from "react-native";
import Alert from "~/components/Alert";
import Button from "~/components/Button";
import Text from "~/components/Text";
import { config } from "~/config/config";
import { t } from "~/providers/TranslationProvider";
import { ConfirmAlert } from "./ConfirmAlert";
import { requestAccountDeletion } from "~/api/endpoints";

export const RemoveAccount = () => {
    const [alert, setAlert] = React.useState<boolean>(false);
    const [confirm, setShowConfirm] = React.useState<boolean>(false);

    const confirmRemoval = () => {
        setAlert(false);
        requestAccountDeletion().then(() => setShowConfirm(true))
    }

    return <>
        {confirm && (<ConfirmAlert show={confirm} />)}
        {alert && (
            <Alert show={alert} position="Center" onRequestClose={() => setAlert(false)}>
                <View style={{ rowGap: 20 }}>
                    <View><Text style={{
                        fontSize: 28,
                        fontWeight: 500,
                        textAlign: 'center',
                    }}>{t('profile.deleteAccount.label')}</Text></View>
                    <View>
                        <Text style={{
                            fontSize: 16,
                            textAlign: 'center',
                        }}>{t('profile.deleteAccount.prompt')}</Text>
                    </View>
                    <View style={{ flexDirection: 'column', rowGap: 8 }}>
                        <Button color={config.color.neutral[900]}
                            title={t('profile.deleteAccount.yes')} onPress={confirmRemoval}
                        />
                        <Button style={{ borderWidth: 1, }} textStyle={{ color: config.color.neutral[900] }}
                            color={config.color.neutral[50]}
                            title={t('profile.deleteAccount.cancel')}
                            onPress={() => setAlert(false)}
                        />
                    </View>
                </View>
            </Alert>
        )}
        <TouchableOpacity onPress={() => setAlert(true)}>
            <Text style={{
                color: config.color.misc.primary,
                textDecorationLine: 'underline',
                alignSelf: 'center',
                marginBottom: 24
            }}>{t('profile.deleteAccount.label')}</Text>
        </TouchableOpacity>
    </>;
}
