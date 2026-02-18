import { forwardRef } from "react"; // IMPORTANTE: Não te esqueças de importar forwardRef
import { useResume } from "../../context/ResumeContext";
import Modern from "../templates/Modern";
import Classic from "../templates/Classic";
import Creative from "../templates/Creative";

// O forwardRef é CRUCIAL para o react-to-print encontrar o componente
const Preview = forwardRef((props, ref) => { // <--- RECEBE A REF AQUI
    const { resumeData } = useResume();
    const { templateId } = resumeData.metadata;

    const templates = {
        modern: Modern,
        classic: Classic,
        creative: Creative,
    };

    const TemplateComponent = templates[templateId] || Modern;

    return (
        // ATENÇÃO:
        // 1. A 'ref' tem de estar neste div.
        // 2. 'bg-white' e 'text-black' forçam a cor certa.
        // 3. REMOVI 'h-full' e 'absolute' para evitar colapsos de altura. 
        // 4. Usei 'min-h-[297mm]' para garantir tamanho A4 mínimo.
        <div 
            ref={ref} 
            className="w-full min-h-[297mm] bg-white text-black overflow-visible"
        >
            <TemplateComponent data={resumeData} />
        </div>
    );
});

Preview.displayName = "Preview";

export default Preview;
