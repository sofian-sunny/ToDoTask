import React, {useCallback, useContext, useEffect, useState} from 'react';
import {I18n} from 'i18n-js';
import * as Localization from 'react-native-localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../constants/translations/en.json';
import fr from '../constants/translations/fr.json';
import {ITranslate} from '../constants/types';
const i18n = new I18n({
  en,
  fr,
});

// Set up i18n translations and configuration

(i18n as any).fallbacks = true;

export const TranslationContext = React.createContext({});

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocale] = useState('en');

  // Function to set locale
  const setAppLocale = (locale: any) => {
    i18n.locale = locale;
    console.log('locale', locale);
    if (locale === 'en' || locale === 'fr') setLocale(locale);
  };

  const t = useCallback(
    (scope: string, options: object) => {
      return i18n.t(scope, {locale, ...options});
    },
    [locale],
  );

  // Get locale from storage or device
  const getLocale = useCallback(async () => {
    const storedLocale = await AsyncStorage.getItem('locale');
    if (storedLocale) {
      setAppLocale(storedLocale);
    } else {
      const bestLanguage = Localization.getLocales()[0];
      const languageTag = bestLanguage.languageTag || 'en';
      setAppLocale(languageTag);
    }
  }, []);

  useEffect(() => {
    getLocale();
  }, [getLocale]);

  useEffect(() => {
    AsyncStorage.setItem('locale', locale);
  }, [locale]);

  const contextValue = {
    t,
    locale,
    setLocale: setAppLocale,
    translate: t,
  };

  return (
    <TranslationContext.Provider value={contextValue}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () =>
  useContext(TranslationContext) as ITranslate;
