import React from 'react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
    FileText,
    Download,
    Github,
    Globe,
    CheckCircle2,
    Layout,
    ArrowRight,
    Zap,
    Palette,
    Layers,
    Coffee,
    Smartphone,
    CreditCard
} from 'lucide-react';
import mockupImg from '../assets/cv_mockup_v2.png';

const LandingPage = ({ onStart }) => {
    const { t, language, setLanguage } = useLanguage();

    const features = [
        {
            title: t.feature1Title,
            description: t.feature1Desc,
            icon: <Zap className="text-primary" size={28} />
        },
        {
            title: t.feature2Title,
            description: t.feature2Desc,
            icon: <Palette className="text-secondary" size={28} />
        },
        {
            title: t.feature3Title,
            description: t.feature3Desc,
            icon: <Layers className="text-accent" size={28} />
        },
        {
            title: t.feature4Title,
            description: t.feature4Desc,
            icon: <Layout className="text-primary" size={28} />
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-500 font-sans selection:bg-primary/30">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 group cursor-pointer">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                            <FileText className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tight uppercase italic">{t.appTitle}</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('pt')}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${language === 'pt' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
                            >
                                PT
                            </button>
                        </div>
                        <button
                            onClick={onStart}
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-primary/25 hover:-translate-y-0.5 transition-all text-sm active:scale-95"
                        >
                            {t.getStarted}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

                <div className="max-w-7xl mx-auto text-center space-y-10 relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold animate-in fade-in slide-in-from-bottom-4">
                        <Zap size={16} className="animate-pulse" />
                        <span>{t.landingTagline}</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1] max-w-5xl mx-auto">
                        {t.landingTitle.split('{dream}')[0]}
                        <span className="text-primary italic relative">
                            {t.landingDream}
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 12" preserveAspectRatio="none">
                                <path d="M0,10 Q50,0 100,10" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                            </svg>
                        </span>
                        {t.landingTitle.split('{dream}')[1]}
                    </h1>

                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t.landingSubtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={onStart}
                            className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-5 rounded-[24px] font-black text-lg shadow-2xl hover:bg-slate-800 dark:hover:bg-slate-100 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95"
                        >
                            {t.startBuilding}
                            <ArrowRight size={24} />
                        </button>
                        <div className="flex items-center gap-6 px-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                <CheckCircle2 size={18} className="text-green-500" />
                                {t.noLogin}
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                                <CheckCircle2 size={18} className="text-green-500" />
                                {t.free}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Mockup */}
                <div className="max-w-6xl mx-auto mt-24 relative group">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"></div>
                    <div className="relative bg-white border-[12px] border-slate-900 dark:border-slate-800 rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-none overflow-hidden aspect-[16/10]">
                        <div className="absolute top-0 left-0 w-full h-12 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-6 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            <div className="ml-4 h-6 w-48 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg"></div>
                        </div>
                        <div className="pt-12 h-full w-full bg-white flex items-center justify-center p-8">
                            <img
                                src={mockupImg}
                                alt={t.mockupTitle}
                                className="w-full h-full object-contain pointer-events-none transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-10 right-10 bg-primary text-white p-6 rounded-[32px] shadow-2xl animate-bounce-slow">
                            <div className="text-xs font-black uppercase tracking-widest opacity-80 mb-1">{t.pdfReady}</div>
                            <Download size={32} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Grid */}
            <section className="py-32 px-6 bg-slate-100/50 dark:bg-slate-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
                            {t.everythingNeedTitle.split('{succeed}')[0]}
                            <span className="text-primary">{t.everythingNeedSucceed}</span>
                            {t.everythingNeedTitle.split('{succeed}')[1]}
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
                            {t.everythingNeedSub}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-slate-200 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-none hover:-translate-y-2 transition-all duration-300">
                                <div className="w-14 h-14 bg-primary/5 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3">{feature.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Donation Section */}
            <section className="py-24 px-6 bg-white dark:bg-slate-950 overflow-hidden relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent"></div>

                <div className="max-w-7xl mx-auto relative">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold animate-pulse">
                                <Coffee size={16} />
                                <span>Buy Me a Coffee</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                {t.supportTitle}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-lg font-medium max-w-xl mx-auto lg:mx-0">
                                {t.supportText}
                            </p>
                        </div>

                        <div className="flex-1 w-full grid gap-4">
                            {/* M-Pesa */}
                            <div className="group bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 flex items-center gap-6 hover:border-primary/50 transition-all duration-300">
                                <div className="w-16 h-16 bg-[#e61c27] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                                    <Smartphone size={32} />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg mb-1">M-Pesa</h4>
                                    <p className="text-primary font-mono font-bold tracking-wider">{t.paymentMpesa.split(': ')[1]}</p>
                                </div>
                            </div>

                            {/* e-Mola */}
                            <div className="group bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 flex items-center gap-6 hover:border-primary/50 transition-all duration-300">
                                <div className="w-16 h-16 bg-[#00a1e4] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                    <Smartphone size={32} />
                                </div>
                                <div>
                                    <h4 className="font-black text-lg mb-1">e-Mola</h4>
                                    <p className="text-primary font-mono font-bold tracking-wider">{t.paymentEmola.split(': ')[1]}</p>
                                </div>
                            </div>

                            {/* Bank BCI */}
                            <div className="group bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[24px] border border-slate-200 dark:border-slate-800 flex items-center gap-6 hover:border-primary/50 transition-all duration-300">
                                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                                    <CreditCard size={32} />
                                </div>
                                <div className="overflow-hidden">
                                    <h4 className="font-black text-lg mb-1">BCI Bank</h4>
                                    <p className="text-primary font-mono font-bold text-xs sm:text-sm truncate">
                                        {t.paymentBank.split('Banco BCI: ')[1] || t.paymentBank.split('BCI Bank: ')[1]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 px-6 border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <FileText className="w-6 h-6" />
                        <span className="font-bold text-slate-800 dark:text-white">CV Maker</span>
                    </div>

                    <p className="text-sm font-medium italic">{t.createdBy} <span className="text-primary font-bold">Zakir</span></p>

                    <div className="flex items-center gap-6">
                        <a href="#" className="hover:text-primary transition-colors font-bold">{t.terms}</a>
                        <a href="#" className="hover:text-primary transition-colors font-bold">{t.privacy}</a>
                        <a href="https://github.com/Zaky-dc/CVMaker" className="hover:text-primary transition-colors font-bold flex items-center gap-2">
                            <Github size={18} />
                            {t.openSource}
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
