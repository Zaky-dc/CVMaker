import { useEffect, useState } from "react";
import { Monitor } from "lucide-react";

const UnsupportedScreen = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950">
            {/* Glow blobs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 text-center max-w-sm">
                <div className="w-20 h-20 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6">
                    <Monitor size={36} className="text-indigo-400" />
                </div>

                <h1 className="text-2xl font-bold text-white mb-3 leading-tight">
                    Ecrã demasiado pequeno
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    O cvMaker foi optimizado para ecrãs de desktop. Abre esta página num
                    computador com janela de pelo menos <strong className="text-white">1024px</strong> de largura.
                </p>
                <p className="text-slate-500 text-xs">
                    Screen too small — please open in a desktop browser (min. 1024px width).
                </p>

                <div className="mt-8 p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-slate-400">
                    💡 Tip: Se estás num tablet, tenta rodar para modo paisagem.
                </div>
            </div>
        </div>
    );
};

export const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== "undefined" ? window.innerWidth >= 1024 : true
    );

    useEffect(() => {
        const check = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    return isDesktop;
};

export default UnsupportedScreen;
