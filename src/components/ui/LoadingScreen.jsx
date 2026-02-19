import React from 'react';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const LoadingScreen = () => {
    // We might not have access to context if this loads before context provider,
    // but likely it's inside the provider in App.jsx. 
    // However, for safety, we can use default text or specific text.
    // Given App.jsx structure, Suspense is inside LanguageProvider.

    // Actually, Suspense should be inside Providers if we want to use context in fallback.
    // If Suspense wraps Routes, and Routes are inside LanguageProvider, then yes.

    // Let's safe check context
    let t = {};
    try {
        const ctx = useLanguage();
        t = ctx.t;
    } catch (e) {
        // Fallback if used outside provider
        t = {
            loading: "Loading...",
            preparing: "Preparing your workspace..."
        };
    }

    return (
        <div className="fixed inset-0 bg-white dark:bg-slate-950 flex flex-col items-center justify-center z-50">
            <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800"></div>
                <div className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>

            <div className="mt-8 text-center space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    cvTheque
                </h3>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-sm font-medium animate-pulse">
                        {t.preparing || "Preparing your workspace..."}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
