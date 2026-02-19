import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// ─── Static styles (defined once, not per render) ─────────────────────────────
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    // Main content takes 67%, sidebar 33%
    // Both use flexGrow to fill the page height — this ensures the sidebar
    // background colour fills all pages even when content is shorter.
    mainContent: {
        width: '67%',
        padding: 28,
        paddingTop: 28,
        flexGrow: 0,
    },
    sidebar: {
        width: '33%',
        backgroundColor: '#f3f4f6',
        padding: 18,
        paddingTop: 28,
        flexGrow: 0,
    },
    header: {
        marginBottom: 18,
        borderBottomWidth: 2,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    name: {
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        color: '#111827',
        letterSpacing: 0.5,
    },
    role: {
        fontSize: 12,
        marginTop: 3,
        fontFamily: 'Helvetica-Oblique',
    },
    contactInfo: {
        marginTop: 8,
        fontSize: 9,
        color: '#4B5563',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    photo: {
        width: 70,
        height: 70,
        borderRadius: 4,
        objectFit: 'cover',
        borderWidth: 2,
        flexShrink: 0,
        marginLeft: 10,
    },
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginBottom: 6,
        paddingBottom: 2,
    },
    sidebarTitle: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        marginBottom: 7,
        paddingBottom: 2,
    },
    text: {
        fontSize: 9.5,
        color: '#374151',
        lineHeight: 1.5,
        marginBottom: 2,
    },
    boldText: {
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        color: '#1F2937',
    },
    italicText: {
        fontSize: 8.5,
        fontFamily: 'Helvetica-Oblique',
        color: '#6B7280',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 1,
    },
    skillItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    skillDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        marginRight: 6,
    },
    metaLabel: {
        fontSize: 7.5,
        textTransform: 'uppercase',
        color: '#9CA3AF',
        marginBottom: 1,
        letterSpacing: 0.5,
    },
    metaValue: {
        fontSize: 9.5,
        color: '#374151',
        marginBottom: 5,
    },
});

// ─── Helper ───────────────────────────────────────────────────────────────────
const safeDate = (start, end) => {
    const s = start || '';
    const e = end || '';
    if (!s && !e) return '';
    if (!e || e.toLowerCase() === 'present') return `${s} – Present`;
    return `${s} – ${e}`;
};

// ─── Component ────────────────────────────────────────────────────────────────
const ModernPDF = ({ data, t }) => {
    const {
        personal = {},
        experience = [],
        internships = [],
        education = [],
        skills = [],
        languages = [],
        certificates = [],
        references = [],
        metadata = {},
        sectionOrder = [
            'personal', 'experience', 'internships', 'education',
            'skills', 'languages', 'certificates', 'references',
        ],
    } = data;

    const i18n = t || {
        personalDetails: 'Personal Details', skills: 'Skills',
        languages: 'Languages', certificates: 'Certificates',
        experience: 'Experience', internships: 'Internships',
        education: 'Education', references: 'References',
        summary: 'Summary', birthDate: 'Birth Date',
        civilStatus: 'Civil Status', gender: 'Gender',
        nationality: 'Nationality', at: 'at',
    };

    const themeColor = metadata.themeColor || '#3B82F6';

    // ── Dynamic styles memoised so StyleSheet.create is not called on every render
    const dyn = useMemo(() => StyleSheet.create({
        themeColor: { color: themeColor },
        themeBorder: { borderBottomColor: themeColor },
        themeBg: { backgroundColor: themeColor },
        sidebarBg: { backgroundColor: themeColor + '18' }, // very light tint
    }), [themeColor]);

    // ── Sidebar sections ──────────────────────────────────────────────────────
    const renderSidebarSection = (id) => {
        switch (id) {
            case 'personal':
                if (!personal.birthDate && !personal.civilStatus && !personal.gender && !personal.nationality) return null;
                return (
                    <View style={styles.section} key={id} wrap={false}>
                        <Text style={[styles.sidebarTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.personalDetails}</Text>
                        {personal.birthDate ? <><Text style={styles.metaLabel}>{i18n.birthDate}</Text><Text style={styles.metaValue}>{personal.birthDate}</Text></> : null}
                        {personal.civilStatus ? <><Text style={styles.metaLabel}>{i18n.civilStatus}</Text><Text style={styles.metaValue}>{personal.civilStatus}</Text></> : null}
                        {personal.gender ? <><Text style={styles.metaLabel}>{i18n.gender}</Text><Text style={styles.metaValue}>{personal.gender}</Text></> : null}
                        {personal.nationality ? <><Text style={styles.metaLabel}>{i18n.nationality}</Text><Text style={styles.metaValue}>{personal.nationality}</Text></> : null}
                    </View>
                );
            case 'skills':
                if (!skills || !skills.length) return null;
                return (
                    <View style={styles.section} key={id} wrap={false}>
                        <Text style={[styles.sidebarTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.skills}</Text>
                        {skills.map((skill, i) => (
                            <View key={i} style={styles.skillItem}>
                                <View style={[styles.skillDot, dyn.themeBg]} />
                                <Text style={styles.text}>{typeof skill === 'string' ? skill : skill.name}</Text>
                            </View>
                        ))}
                    </View>
                );
            case 'languages':
                if (!languages || !languages.length) return null;
                return (
                    <View style={styles.section} key={id} wrap={false}>
                        <Text style={[styles.sidebarTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.languages}</Text>
                        {languages.map((lang, i) => {
                            const profMap = {
                                'native': 5, 'nativo': 5, 'c2': 5,
                                'c1': 4, 'fluent': 4, 'fluente': 4, 'advanced': 4, 'avan\u00e7ado': 4,
                                'b2': 3, 'upper-intermediate': 3, 'upper intermediate': 3,
                                'b1': 3, 'intermediate': 3, 'intermedi\u00e1rio': 3,
                                'a2': 2, 'pre-intermediate': 2, 'elementary': 2, 'b\u00e1sico': 2, 'basic': 2,
                                'a1': 1, 'beginner': 1, 'iniciante': 1,
                            };
                            const key = (lang.proficiency || '').toLowerCase().trim();
                            const filled = profMap[key] ?? 3;
                            return (
                                <View key={i} style={{ marginBottom: 9 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <Text style={styles.boldText}>{lang.language || ''}</Text>
                                        <Text style={{ fontSize: 8, color: '#9CA3AF' }}>{lang.proficiency || ''}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 3 }}>
                                        {[1, 2, 3, 4, 5].map(dot => (
                                            <View key={dot} style={[{
                                                flex: 1,
                                                height: 4,
                                                borderRadius: 2,
                                            }, dot <= filled ? dyn.themeBg : { backgroundColor: '#E5E7EB' }]} />
                                        ))}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                );
            case 'certificates':
                if (!certificates || !certificates.length) return null;
                return (
                    <View style={styles.section} key={id} wrap={false}>
                        <Text style={[styles.sidebarTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.certificates}</Text>
                        {certificates.map((cert, i) => (
                            <View key={i} style={{ marginBottom: 6 }}>
                                <Text style={styles.boldText}>{cert.name || ''}</Text>
                                <Text style={{ fontSize: 8.5, color: '#4B5563' }}>{cert.issuer || ''}</Text>
                                {cert.date ? <Text style={{ fontSize: 8, color: '#9CA3AF' }}>{cert.date}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            default:
                return null;
        }
    };

    // ── Main content sections ─────────────────────────────────────────────────
    const renderMainSection = (id) => {
        switch (id) {
            case 'experience':
                if (!experience || !experience.length) return null;
                return (
                    <View style={styles.section} key={id}>
                        <Text style={[styles.sectionTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.experience}</Text>
                        {experience.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 9 }} wrap={false}>
                                <View style={styles.jobHeader}>
                                    <Text style={styles.boldText}>{exp.role || ''}</Text>
                                    <Text style={styles.italicText}>{exp.date || safeDate(exp.startDate, exp.endDate)}</Text>
                                </View>
                                <Text style={[styles.text, { fontSize: 8.5, marginBottom: 2 }]}>{exp.company || ''}</Text>
                                {exp.description ? <Text style={styles.text}>{exp.description}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            case 'internships':
                if (!internships || !internships.length) return null;
                return (
                    <View style={styles.section} key={id}>
                        <Text style={[styles.sectionTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.internships}</Text>
                        {internships.map((intern, i) => (
                            <View key={i} style={{ marginBottom: 9 }} wrap={false}>
                                <View style={styles.jobHeader}>
                                    <Text style={styles.boldText}>{intern.role || ''}</Text>
                                    <Text style={styles.italicText}>{safeDate(intern.startDate, intern.endDate)}</Text>
                                </View>
                                <Text style={[styles.text, { fontSize: 8.5, marginBottom: 2 }]}>{intern.company || ''}</Text>
                                {intern.description ? <Text style={styles.text}>{intern.description}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            case 'education':
                if (!education || !education.length) return null;
                return (
                    <View style={styles.section} key={id}>
                        <Text style={[styles.sectionTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.education}</Text>
                        {education.map((edu, i) => (
                            <View key={i} style={{ marginBottom: 8 }} wrap={false}>
                                <View style={styles.jobHeader}>
                                    <Text style={styles.boldText}>{edu.school || ''}</Text>
                                    <Text style={styles.italicText}>{edu.date || safeDate(edu.startDate, edu.endDate)}</Text>
                                </View>
                                <Text style={styles.text}>{edu.degree || ''}</Text>
                                {edu.description ? <Text style={{ fontSize: 8.5, color: '#6B7280' }}>{edu.description}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            case 'references':
                if (!references || !references.length) return null;
                return (
                    <View style={styles.section} key={id}>
                        <Text style={[styles.sectionTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.references}</Text>
                        {references.map((ref, i) => (
                            <View key={i} style={{ marginBottom: 6 }} wrap={false}>
                                <Text style={styles.boldText}>{ref.name || ''}</Text>
                                <Text style={{ fontSize: 9, color: '#4B5563' }}>
                                    {[ref.position, ref.company].filter(Boolean).join(` ${i18n.at || 'at'} `)}
                                </Text>
                                {ref.email ? <Text style={{ fontSize: 8, color: '#6B7280' }}>{ref.email}</Text> : null}
                                {ref.phone ? <Text style={{ fontSize: 8, color: '#6B7280' }}>{ref.phone}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            default:
                return null;
        }
    };

    const SIDEBAR_IDS = ['personal', 'skills', 'languages', 'certificates'];
    const MAIN_IDS = ['personal', 'experience', 'internships', 'education', 'references'];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* ── Left: Main content ── */}
                <View style={styles.mainContent}>
                    {/* Header */}
                    <View style={[styles.header, { borderBottomColor: themeColor }]}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{personal.firstName || ''} {personal.lastName || ''}</Text>
                            {personal.role ? <Text style={[styles.role, dyn.themeColor]}>{personal.role}</Text> : null}
                            <View style={styles.contactInfo}>
                                {personal.email ? <Text>{personal.email}</Text> : null}
                                {personal.phone ? <Text>• {personal.phone}</Text> : null}
                                {personal.website ? <Text>• {personal.website}</Text> : null}
                            </View>
                        </View>
                        {personal.photoUrl ? (
                            <Image src={personal.photoUrl} style={[styles.photo, { borderColor: themeColor }]} />
                        ) : null}
                    </View>

                    {/* Summary */}
                    {personal.summary ? (
                        <View style={styles.section}>
                            <Text style={[styles.sectionTitle, dyn.themeColor, dyn.themeBorder]}>{i18n.summary}</Text>
                            <Text style={styles.text}>{personal.summary}</Text>
                        </View>
                    ) : null}

                    {/* Ordered sections */}
                    {sectionOrder
                        .filter(id => MAIN_IDS.includes(id) && id !== 'personal')
                        .map(id => renderMainSection(id))}
                </View>

                {/* ── Right: Sidebar ── */}
                <View style={[styles.sidebar, dyn.sidebarBg]}>
                    {sectionOrder
                        .filter(id => SIDEBAR_IDS.includes(id))
                        .map(id => renderSidebarSection(id))}
                </View>
            </Page>
        </Document>
    );
};

export default ModernPDF;
