import React, { createContext, ReactNode } from 'react';
import { connect } from 'react-redux';
import { RootState, stores } from '~/stores';
import { setLanguage } from '~/stores/app/actions';
import i18n, { rtlLanguages, TranslationsPaths } from '~/translations';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import _ from 'lodash';
import { t as i18nextTranslation } from "i18next";


export const t = (name: TranslationsPaths) => i18nextTranslation(name as string);


interface LocaleContextProps {
    changeLocale: (newLocale: string) => void;
}

export const LocaleContext = createContext<LocaleContextProps>({} as LocaleContextProps);

const RestartApp = _.debounce(() => { RNRestart.Restart(); }, 200);

interface LocaleProviderProps {
    children: ReactNode;
    locale: string;
}

interface LocaleProviderState {
    initialized: boolean;
}

class TranslationProvider extends React.Component<LocaleProviderProps, LocaleProviderState> {
    state: LocaleProviderState = {
        initialized: false,
    };

    async componentDidMount() {
        const { locale } = this.props;
        await this.setLanguage(locale);
        this.setState({ initialized: true });
    }

    componentDidUpdate(prevProps: LocaleProviderProps) {
        if (prevProps.locale !== this.props.locale) {
            this.setLanguage(this.props.locale);
        }
    }

    setLanguage = async (newLocale: string) => {
        const isRTL = rtlLanguages.includes(newLocale);
        I18nManager.forceRTL(isRTL);
        await i18n.changeLanguage(newLocale);
    };

    changeLocale = async (newLocale: string) => {
        const newIsRTL = rtlLanguages.includes(newLocale);
        const currentIsRTL = I18nManager.isRTL;

        await stores.dispatch(setLanguage(newLocale));

        i18n.changeLanguage(newLocale).then(() => {
            if (newIsRTL !== currentIsRTL) {
                I18nManager.forceRTL(newIsRTL);
                RestartApp();
            } else {
                I18nManager.forceRTL(newIsRTL);
            }
        });
    };

    render() {
        const { children } = this.props;
        const { initialized } = this.state;

        if (!initialized) { return null; }

        return (
            <LocaleContext.Provider value={{ changeLocale: this.changeLocale }}>
                {children}
            </LocaleContext.Provider>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    locale: state.app.language,
});

export default connect(mapStateToProps)(TranslationProvider);

export const useTranslationContext = (): LocaleContextProps => {
    return React.useContext(LocaleContext);
};
