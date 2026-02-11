import { useResume } from "../../context/ResumeContext";
import { useLanguage } from "../../context/LanguageContext";
import { LayoutTemplate } from "lucide-react";

const templates = [
    { id: "modern", name: "Modern", color: "bg-blue-500" },
    { id: "classic", name: "Classic", color: "bg-gray-800" },
    { id: "creative", name: "Creative", color: "bg-purple-500" },
];

const TemplateSelector = () => {
    const { resumeData, updateSection } = useResume();
    const { t } = useLanguage();

    const currentTemplate = resumeData.metadata.templateId;

    const handleSelect = (id) => {
        updateSection("metadata", { templateId: id });
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t.template || "Template"}
            </label>
            <div className="grid grid-cols-3 gap-2">
                {templates.map((template) => (
                    <button
                        key={template.id}
                        onClick={() => handleSelect(template.id)}
                        className={`
                            relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                            ${currentTemplate === template.id
                                ? "border-primary bg-primary/5 dark:bg-primary/20"
                                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}
                        `}
                    >
                        <div className={`w-8 h-10 mb-2 rounded ${template.color} opacity-80`}></div>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                            {template.name}
                        </span>
                        {currentTemplate === template.id && (
                            <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TemplateSelector;
