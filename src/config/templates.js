import Modern from '../components/templates/Modern';
import Classic from '../components/templates/Classic';
import Creative from '../components/templates/Creative';

// PDF components will be loaded dynamically to avoid bundling @react-pdf/renderer
// in the main chunk. This saves ~1.5MB of bundle size.

export const TEMPLATE_REGISTRY = [
    {
        id: 'modern',
        name: 'Modern Professional',
        isPremium: false,
        component: Modern,
        pdfComponent: () => import('../components/templates/pdf/ModernPDF'),
        thumbnail: '/thumbnails/modern.png',
        color: 'bg-blue-500'
    },
    {
        id: 'classic',
        name: 'Classic Elegant',
        isPremium: false,
        component: Classic,
        pdfComponent: () => import('../components/templates/pdf/ClassicPDF'),
        thumbnail: '/thumbnails/classic.png',
        color: 'bg-gray-800'
    },
    {
        id: 'creative',
        name: 'Creative Visual',
        isPremium: true,
        component: Creative,
        pdfComponent: () => import('../components/templates/pdf/CreativePDF'),
        thumbnail: '/thumbnails/creative.png',
        color: 'bg-purple-500'
    }
];

export const getTemplateById = (id) => TEMPLATE_REGISTRY.find(t => t.id === id);
