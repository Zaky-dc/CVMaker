import { useMemo } from 'react';
import { getTemplateById } from '../config/templates';

export const usePDFGenerator = (templateId) => {
    const TemplatePDF = useMemo(() => {
        const template = getTemplateById(templateId);
        return template ? template.pdfComponent : null;
    }, [templateId]);

    return TemplatePDF;
};
