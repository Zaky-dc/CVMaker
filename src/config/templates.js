import Modern from '../components/templates/Modern';
import Classic from '../components/templates/Classic';
import Creative from '../components/templates/Creative';

// Placeholder imports for PDF components - we will create these next
import ModernPDF from '../components/templates/pdf/ModernPDF';
import ClassicPDF from '../components/templates/pdf/ClassicPDF';
import CreativePDF from '../components/templates/pdf/CreativePDF';

export const TEMPLATE_REGISTRY = [
    {
        id: 'modern',
        name: 'Modern Professional',
        isPremium: false,
        component: Modern,
        pdfComponent: ModernPDF,
        thumbnail: '/thumbnails/modern.png',
        color: 'bg-blue-500'
    },
    {
        id: 'classic',
        name: 'Classic Elegant',
        isPremium: false,
        component: Classic,
        pdfComponent: ClassicPDF,
        thumbnail: '/thumbnails/classic.png',
        color: 'bg-gray-800'
    },
    {
        id: 'creative',
        name: 'Creative Visual',
        isPremium: true,
        component: Creative,
        pdfComponent: CreativePDF,
        thumbnail: '/thumbnails/creative.png',
        color: 'bg-purple-500'
    }
];

export const getTemplateById = (id) => TEMPLATE_REGISTRY.find(t => t.id === id);
