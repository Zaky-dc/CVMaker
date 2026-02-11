import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { translations } from "../i18n/translations";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Default system locale or fallback to 'en'
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('language');
            if (stored) return stored;
            const browserLang = navigator.language.split("-")[0];
            return translations[browserLang] ? browserLang : 'en';
        }
        return 'en';
    });

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    const value = {
        language,
        setLanguage,
        t: translations[language],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

LanguageProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
