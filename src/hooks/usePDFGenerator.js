import { useState, useEffect } from 'react';
import { getTemplateById } from '../config/templates';

/**
 * Hook to load the PDF component for a given template ID.
 * Supports both static components (legacy) and dynamic imports (for code splitting).
 */
export const usePDFGenerator = (templateId) => {
    const [TemplatePDF, setTemplatePDF] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const loadTemplate = async () => {
            const template = getTemplateById(templateId);

            // Reset if no template found
            if (!template || !template.pdfComponent) {
                if (isMounted) setTemplatePDF(null);
                return;
            }

            try {
                const componentOrLoader = template.pdfComponent;

                // Check if it's potentially a dynamic import loader
                // A dynamic import wrapper usually takes 0 arguments: () => import(...)
                // A React functional component usually takes 1 argument (props): (props) => ...
                if (typeof componentOrLoader === 'function' && componentOrLoader.length === 0) {
                    // Try to execute it as a loader
                    const result = componentOrLoader();

                    if (result instanceof Promise) {
                        const module = await result;
                        if (isMounted) {
                            // Handle default export or named export
                            setTemplatePDF(() => module.default || module);
                        }
                    } else {
                        // It returned something else (unexpected), treat as component?
                        // Or maybe it's a component that doesn't use props?
                        if (isMounted) {
                            setTemplatePDF(() => componentOrLoader);
                        }
                    }
                } else {
                    // It's a static component (object/class) or a function component with props
                    if (isMounted) {
                        setTemplatePDF(() => componentOrLoader);
                    }
                }
            } catch (error) {
                console.error(`Failed to load PDF template "${templateId}":`, error);
                if (isMounted) setTemplatePDF(null);
            }
        };

        loadTemplate();

        return () => {
            isMounted = false;
        };
    }, [templateId]);

    return TemplatePDF;
};
