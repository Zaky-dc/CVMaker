import { useResume } from "../../context/ResumeContext";
import { useLanguage } from "../../context/LanguageContext";
import { useAuth } from "../../context/AuthContext";
import { TEMPLATE_REGISTRY } from "../../config/templates";
import { Lock } from "lucide-react";

const TemplateSelector = () => {
    const { resumeData, updateSection } = useResume();
    const { t } = useLanguage();
    const { user } = useAuth();

    const currentTemplate = resumeData.metadata.templateId;

    const handleSelect = (template) => {
        if (template.isPremium && user?.role !== 'premium' && user?.role !== 'admin') {
            alert("This is a premium template. Upgrade to access!"); // Replace with modal later
            return;
        }
        updateSection("metadata", { templateId: template.id });
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t.template || "Template"}
            </label>
            <div className="grid grid-cols-3 gap-2">
                {TEMPLATE_REGISTRY.map((template) => {
                    const isLocked = template.isPremium && user?.role !== 'premium' && user?.role !== 'admin';

                    return (
                        <button
                            key={template.id}
                            onClick={() => handleSelect(template)}
                            className={`
                                relative flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all
                                ${currentTemplate === template.id
                                    ? "border-primary bg-primary/5 dark:bg-primary/20"
                                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"}
                                ${isLocked ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
                            `}
                        >
                            <div className={`w-8 h-10 mb-2 rounded ${template.color} opacity-80 flex items-center justify-center`}>
                                {isLocked && <Lock className="w-4 h-4 text-white" />}
                            </div>
                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                {template.name}
                            </span>
                            {currentTemplate === template.id && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default TemplateSelector;
