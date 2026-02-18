import { forwardRef } from "react";
import { useResume } from "../../context/ResumeContext";
import Modern from "../templates/Modern";
import Classic from "../templates/Classic";
import Creative from "../templates/Creative";

const Preview = forwardRef((props, ref) => {
    const { resumeData } = useResume();
    const { templateId } = resumeData.metadata;

    // Map of template IDs to components
    const templates = {
        modern: Modern,
        classic: Classic,
        creative: Creative,
    };

    const TemplateComponent = templates[templateId] || Modern;

    return (
        // O ID aqui ajuda no CSS de impressão se necessário, mas o principal é o REF
        <div ref={ref} className="w-full h-full bg-white" id="printable-cv">
            <TemplateComponent data={resumeData} />
        </div>
    );
});

Preview.displayName = "Preview";

export default Preview;
