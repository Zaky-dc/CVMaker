import { forwardRef } from "react";
import { useResume } from "../../context/ResumeContext";
import Modern from "../templates/Modern";
import Classic from "../templates/Classic";
import Creative from "../templates/Creative";

// Usamos forwardRef para que o MainLayout consiga "agarrar" o elemento
const Preview = forwardRef((props, ref) => {
    const { resumeData } = useResume();
    const { templateId } = resumeData.metadata;

    const templates = {
        modern: Modern,
        classic: Classic,
        creative: Creative,
    };

    const TemplateComponent = templates[templateId] || Modern;

    return (
        /* IMPORTANTE: 
           1. Adicionamos 'bg-white' e 'text-black' para anular qualquer Dark Mode do sistema.
           2. REMOVEMOS 'h-full' ou 'h-screen'. Deixamos a altura ser automática.
        */
        <div 
            ref={ref} 
            className="w-full bg-white text-black min-h-[297mm]"
        >
            <TemplateComponent data={resumeData} />
        </div>
    );
});

Preview.displayName = "Preview";

export default Preview;
