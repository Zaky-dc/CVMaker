import { useResume } from "../../context/ResumeContext";
import Modern from "../templates/Modern";
import Classic from "../templates/Classic";
import Creative from "../templates/Creative";

const Preview = () => {
    const { resumeData } = useResume();
    const { templateId } = resumeData.metadata;

    const templates = {
        modern: Modern,
        classic: Classic,
        creative: Creative,
    };

    const TemplateComponent = templates[templateId] || Modern;

    return (
        <div className="w-full bg-white text-black">
            <TemplateComponent data={resumeData} />
        </div>
    );
};

export default Preview;
