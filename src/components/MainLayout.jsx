import { useState, useEffect, useRef } from "react";
import Preview from "./preview/Preview";
import Editor from "./editor/Editor";
import { Moon, Sun, Download, LogIn, LogOut, User as UserIcon, Globe, Save } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useResume } from "../context/ResumeContext";

const MainLayout = () => {
    const { user, loginWithGoogle, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const { resetResume, saveResume, hasUnsavedChanges } = useResume();

    const handleLogout = async () => {
        resetResume();
        await logout();
    };

    const handleSave = async () => {
        await saveResume();
    };

    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const [sidebarWidth, setSidebarWidth] = useState(450); // initial width in px
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef(null);

    const startResizing = (e) => {
        setIsResizing(true);
        e.preventDefault();
    };

    const stopResizing = () => {
        setIsResizing(false);
    };

    const resize = (e) => {
        if (isResizing) {
            const newWidth = e.clientX;
            if (newWidth > 300 && newWidth < 800) { // boundaries
                setSidebarWidth(newWidth);
            }
        }
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        } else {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [isResizing]);

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: `Resume_${new Date().toISOString().split('T')[0]}`,
        pageStyle: `
            @page {
                size: A4;
                margin: 0;
            }
            @media print {
                body {
                    -webkit-print-color-adjust: exact;
                    print-color-adjust: exact;
                }
            }
        `,
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <div className="flex h-screen flex-col md:flex-row overflow-hidden bg-background-light dark:bg-background-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">

            {/* Editor Side (Left) */}
            <aside
                ref={sidebarRef}
                style={{ width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${sidebarWidth}px` : '100%' }}
                className="h-1/2 md:h-full flex flex-col border-r border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark shadow-material-1 z-10 overflow-hidden"
            >
                <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-primary text-white shadow-md">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl font-medium tracking-wide">{t.appTitle}</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Language Switcher */}
                        <div className="flex items-center bg-primary-dark/20 rounded-lg p-0.5 mr-2">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-2 py-1 text-xs rounded-md transition-colors ${language === 'en' ? 'bg-white text-primary font-bold' : 'text-white/70 hover:text-white'}`}
                            >
                                EN
                            </button>
                            <div className="w-[1px] h-3 bg-white/20"></div>
                            <button
                                onClick={() => setLanguage('pt')}
                                className={`px-2 py-1 text-xs rounded-md transition-colors ${language === 'pt' ? 'bg-white text-primary font-bold' : 'text-white/70 hover:text-white'}`}
                            >
                                PT
                            </button>
                        </div>


                        {user ? (
                            <div className="flex items-center gap-2 mr-2">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border-2 border-white" title={user.displayName} />
                                ) : (
                                    <UserIcon size={20} />
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                    title={t.logout}
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={loginWithGoogle}
                                className="flex items-center gap-1 text-sm bg-white text-primary px-3 py-1.5 rounded-full font-medium hover:bg-gray-100 transition-colors mr-2"
                            >
                                <LogIn size={16} /> {t.login}
                            </button>
                        )}

                        {/* Save Button (only for logged-in users) */}
                        {user && (
                            <button
                                onClick={handleSave}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-medium transition-all mr-2 ${hasUnsavedChanges
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600 animate-pulse'
                                    : 'bg-green-500 text-white hover:bg-green-600'
                                    }`}
                                title={hasUnsavedChanges ? t.unsavedChanges : t.saved}
                            >
                                <Save size={16} />
                                <span className="text-sm">{hasUnsavedChanges ? t.save : t.saved}</span>
                            </button>
                        )}

                        <button
                            onClick={handlePrint}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors flex items-center gap-2"
                            aria-label={t.download}
                            title={t.download}
                        >
                            <Download size={20} />
                        </button>
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label={darkMode ? t.lightMode : t.darkMode}
                            title={darkMode ? t.lightMode : t.darkMode}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                    </div>
                </header>


                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                    <Editor />
                </div>
            </aside>

            {/* Resize Handle */}
            <div
                onMouseDown={startResizing}
                className={`hidden md:flex w-1.5 h-full cursor-col-resize hover:bg-primary/30 transition-colors z-20 items-center justify-center group ${isResizing ? 'bg-primary/40' : 'bg-transparent'}`}
            >
                <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600 rounded-full group-hover:bg-primary/50 transition-colors"></div>
            </div>

            {/* Preview Side (Right) */}
            <main className="flex-1 h-1/2 md:h-full bg-gray-100 dark:bg-[#1e1e1e] p-4 md:p-8 flex justify-center items-start overflow-y-auto relative">

                {/* A4 Paper - Can grow to multiple pages */}
                <div className="bg-white text-black shadow-material-3 w-[210mm] h-auto min-h-[297mm] origin-top transform scale-50 md:scale-75 lg:scale-[0.65] xl:scale-75 2xl:scale-90 transition-transform duration-300 p-0">
                    <div className="h-full w-full relative">
                        <Preview ref={componentRef} />
                    </div>
                </div>

                {/* Floating Download Button for Mobile / Convenience */}
                <button
                    onClick={handlePrint}
                    className="fixed bottom-6 right-6 md:hidden z-50 p-4 bg-primary text-white rounded-full shadow-material-3 hover:bg-primary-dark transition-colors"
                >
                    <Download size={24} />
                </button>

            </main>
        </div>
    );
};

export default MainLayout;
