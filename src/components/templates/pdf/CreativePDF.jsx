import React, { useMemo } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// ─── Static styles ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Helvetica',
    },
    sidebar: {
        width: '32%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 42,
        paddingBottom: 40,
        color: '#FFFFFF',
        flexGrow: 0,
    },
    mainContent: {
        width: '68%',
        paddingLeft: 28,
        paddingRight: 28,
        paddingTop: 42,
        paddingBottom: 40,
        flexGrow: 0,
    },
    photo: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 18,
        alignSelf: 'center',
        objectFit: 'cover',
    },
    photoPlaceholder: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 18,
        alignSelf: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    photoText: {
        color: '#FFFFFF',
        fontSize: 28,
        fontFamily: 'Helvetica-Bold',
    },
    sidebarSection: {
        marginBottom: 18,
    },
    sidebarTitle: {
        fontSize: 9,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        paddingBottom: 4,
        color: '#FFFFFF',
    },
    sidebarDivider: {
        height: 1,
        backgroundColor: '#FFFFFF',
        opacity: 0.25,
        marginBottom: 8,
    },
    sidebarText: {
        fontSize: 8.5,
        color: '#FFFFFF',
        opacity: 0.85,
        marginBottom: 3,
    },
    contactItem: {
        marginBottom: 7,
    },
    skillTag: {
        backgroundColor: 'rgba(255,255,255,0.18)',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 4,
        marginBottom: 5,
        marginRight: 4,
        fontSize: 8.5,
        color: '#FFFFFF',
        alignSelf: 'flex-start',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    // Main
    header: {
        marginBottom: 22,
    },
    name: {
        fontSize: 30,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        lineHeight: 1,
        color: '#111827',
        marginBottom: 2,
    },
    role: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#9CA3AF',
        marginTop: 4,
    },
    section: {
        marginBottom: 18,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleBar: {
        width: 28,
        height: 3,
        borderRadius: 2,
        marginRight: 8,
    },
    sectionTitleText: {
        fontSize: 9.5,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: '#374151',
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 2,
    },
    roleTitle: {
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        textTransform: 'uppercase',
        color: '#111827',
        flex: 1,
        marginRight: 8,
    },
    dateTag: {
        fontSize: 7.5,
        backgroundColor: '#111827',
        color: '#FFFFFF',
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 3,
        fontFamily: 'Helvetica-Bold',
        flexShrink: 0,
    },
    description: {
        fontSize: 9.5,
        color: '#4B5563',
        lineHeight: 1.5,
    },
    educationItem: {
        padding: 9,
        backgroundColor: '#F9FAFB',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 6,
        marginBottom: 7,
    },
    summaryBox: {
        padding: 11,
        backgroundColor: '#F8FAFC',
        borderRadius: 7,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        fontSize: 9.5,
        fontFamily: 'Helvetica-Oblique',
        color: '#4B5563',
        lineHeight: 1.5,
    },
});

// ─── Helper ────────────────────────────────────────────────────────────────────
const safeDate = (start, end) => {
    const s = start || '';
    const e = end || '';
    if (!s && !e) return '';
    if (!e || e.toLowerCase() === 'present') return `${s} – Present`;
    return `${s} – ${e}`;
};

// ─── Component ─────────────────────────────────────────────────────────────────
const CreativePDF = ({ data, t }) => {
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
        nationality: 'Nationality', contact: 'Contact',
    };

    const themeColor = metadata.themeColor || '#8B5CF6';

    const dyn = useMemo(() => StyleSheet.create({
        sidebar: { backgroundColor: themeColor },
        textColor: { color: themeColor },
        barColor: { backgroundColor: themeColor },
    }), [themeColor]);

    // ── Sidebar section title helper ─────────────────────────────────────────
    const SidebarTitle = ({ label }) => (
        <View>
            <Text style={styles.sidebarTitle}>{label}</Text>
            <View style={styles.sidebarDivider} />
        </View>
    );

    // ── Sidebar sections ──────────────────────────────────────────────────────
    const renderSidebarSection = (id) => {
        switch (id) {
            case 'personal':
                if (!personal.birthDate && !personal.civilStatus && !personal.gender && !personal.nationality) return null;
                return (
                    <View key={id} style={styles.sidebarSection} wrap={false}>
                        <SidebarTitle label={i18n.personalDetails} />
                        {personal.birthDate ? <><Text style={{ fontSize: 7, opacity: 0.7, textTransform: 'uppercase', color: '#fff' }}>{i18n.birthDate}</Text><Text style={styles.sidebarText}>{personal.birthDate}</Text></> : null}
                        {personal.civilStatus ? <><Text style={{ fontSize: 7, opacity: 0.7, textTransform: 'uppercase', color: '#fff' }}>{i18n.civilStatus}</Text><Text style={styles.sidebarText}>{personal.civilStatus}</Text></> : null}
                        {personal.gender ? <><Text style={{ fontSize: 7, opacity: 0.7, textTransform: 'uppercase', color: '#fff' }}>{i18n.gender}</Text><Text style={styles.sidebarText}>{personal.gender}</Text></> : null}
                        {personal.nationality ? <><Text style={{ fontSize: 7, opacity: 0.7, textTransform: 'uppercase', color: '#fff' }}>{i18n.nationality}</Text><Text style={styles.sidebarText}>{personal.nationality}</Text></> : null}
                    </View>
                );
            case 'skills':
                if (!skills || !skills.length) return null;
                return (
                    <View key={id} style={styles.sidebarSection} wrap={false}>
                        <SidebarTitle label={i18n.skills} />
                        <View style={styles.skillsContainer}>
                            {skills.map((skill, i) => (
                                <Text key={i} style={styles.skillTag}>{typeof skill === 'string' ? skill : skill.name}</Text>
                            ))}
                        </View>
                    </View>
                );
            case 'languages':
                if (!languages || !languages.length) return null;
                return (
                    <View key={id} style={styles.sidebarSection} wrap={false}>
                        <SidebarTitle label={i18n.languages} />
                        {languages.map((lang, i) => {
                            const profMap = {
                                'native': 5, 'nativo': 5, 'c2': 5,
                                'c1': 4, 'fluent': 4, 'fluente': 4, 'advanced': 4, 'avançado': 4,
                                'b2': 3, 'upper-intermediate': 3, 'upper intermediate': 3,
                                'b1': 3, 'intermediate': 3, 'intermediário': 3,
                                'a2': 2, 'pre-intermediate': 2, 'elementary': 2, 'básico': 2, 'basic': 2,
                                'a1': 1, 'beginner': 1, 'iniciante': 1,
                            };
                            const key = (lang.proficiency || '').toLowerCase().trim();
                            const filled = profMap[key] ?? 3;
                            return (
                                <View key={i} style={{ marginBottom: 9 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: '#fff' }}>{lang.language || ''}</Text>
                                        <Text style={{ fontSize: 8, opacity: 0.75, color: '#fff' }}>{lang.proficiency || ''}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 3 }}>
                                        {[1, 2, 3, 4, 5].map(dot => (
                                            <View key={dot} style={{
                                                flex: 1,
                                                height: 4,
                                                borderRadius: 2,
                                                backgroundColor: dot <= filled ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
                                            }} />
                                        ))}
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                );
            default:
                return null;
        }
    };

    // ── Main sections ─────────────────────────────────────────────────────────
    const SectionHeader = ({ label }) => (
        <View style={styles.sectionTitleRow} wrap={false}>
            <View style={[styles.titleBar, dyn.barColor]} />
            <Text style={styles.sectionTitleText}>{label}</Text>
        </View>
    );

    const renderMainSection = (id) => {
        switch (id) {
            case 'experience':
                if (!experience || !experience.length) return null;
                return (
                    <View key={id} style={styles.section}>
                        <SectionHeader label={i18n.experience} />
                        {experience.map((exp, i) => (
                            <View key={i} style={{ marginBottom: 11, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: '#E5E7EB' }} wrap={false}>
                                <View style={styles.jobHeader}>
                                    <Text style={styles.roleTitle}>{exp.role || ''}</Text>
                                    <Text style={styles.dateTag}>{exp.date || safeDate(exp.startDate, exp.endDate)}</Text>
                                </View>
                                <Text style={[{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', marginBottom: 2 }, dyn.textColor]}>{exp.company || ''}</Text>
                                {exp.description ? <Text style={styles.description}>{exp.description}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            case 'internships':
                if (!internships || !internships.length) return null;
                return (
                    <View key={id} style={styles.section}>
                        <SectionHeader label={i18n.internships} />
                        {internships.map((intern, i) => (
                            <View key={i} style={{ marginBottom: 11, paddingLeft: 10, borderLeftWidth: 2, borderLeftColor: '#E5E7EB' }} wrap={false}>
                                <View style={styles.jobHeader}>
                                    <Text style={styles.roleTitle}>{intern.role || ''}</Text>
                                    <Text style={styles.dateTag}>{safeDate(intern.startDate, intern.endDate)}</Text>
                                </View>
                                <Text style={[{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', marginBottom: 2 }, dyn.textColor]}>{intern.company || ''}</Text>
                                {intern.description ? <Text style={styles.description}>{intern.description}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            case 'education':
                if (!education || !education.length) return null;
                return (
                    <View key={id} style={styles.section}>
                        <SectionHeader label={i18n.education} />
                        {education.map((edu, i) => (
                            <View key={i} style={styles.educationItem} wrap={false}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 }}>
                                    <Text style={{ fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: '#111827', flex: 1, marginRight: 8 }}>{edu.school || ''}</Text>
                                    <Text style={{ fontSize: 8, backgroundColor: '#F3F4F6', padding: 2, borderRadius: 3, color: '#6B7280', flexShrink: 0 }}>
                                        {edu.date || safeDate(edu.startDate, edu.endDate)}
                                    </Text>
                                </View>
                                <Text style={[{ fontSize: 9, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }, dyn.textColor]}>{edu.degree || ''}</Text>
                                {edu.description ? <Text style={{ fontSize: 8.5, color: '#6B7280', marginTop: 2 }}>{edu.description}</Text> : null}
                            </View>
                        ))}
                    </View>
                );
            case 'certificates':
                if (!certificates || !certificates.length) return null;
                return (
                    <View key={id} style={styles.section}>
                        <SectionHeader label={i18n.certificates} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                            {certificates.map((cert, i) => (
                                <View key={i} style={{ width: '47%', backgroundColor: '#F9FAFB', padding: 8, borderRadius: 5, borderWidth: 1, borderColor: '#E5E7EB' }} wrap={false}>
                                    <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold' }}>{cert.name || ''}</Text>
                                    <Text style={{ fontSize: 8, textTransform: 'uppercase', color: '#9CA3AF' }}>{cert.issuer || ''}</Text>
                                    {cert.date ? <Text style={[{ fontSize: 8, fontFamily: 'Helvetica-Bold' }, dyn.textColor]}>{cert.date}</Text> : null}
                                </View>
                            ))}
                        </View>
                    </View>
                );
            case 'references':
                if (!references || !references.length) return null;
                return (
                    <View key={id} style={styles.section}>
                        <SectionHeader label={i18n.references} />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                            {references.map((ref, i) => (
                                <View key={i} style={{ width: '47%' }} wrap={false}>
                                    <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold' }}>{ref.name || ''}</Text>
                                    <Text style={{ fontSize: 8, color: '#9CA3AF', textTransform: 'uppercase' }}>{ref.position || ''}</Text>
                                    <Text style={[{ fontSize: 8, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }, dyn.textColor]}>{ref.company || ''}</Text>
                                    {ref.email ? <Text style={{ fontSize: 8, color: '#6B7280' }}>{ref.email}</Text> : null}
                                </View>
                            ))}
                        </View>
                    </View>
                );
            default:
                return null;
        }
    };

    const SIDEBAR_IDS = ['personal', 'skills', 'languages'];

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* ── Sidebar ── */}
                <View style={[styles.sidebar, dyn.sidebar]}>
                    {/* Avatar */}
                    <View style={{ marginBottom: 16, alignItems: 'center' }}>
                        {personal.photoUrl ? (
                            <Image src={personal.photoUrl} style={styles.photo} />
                        ) : (
                            <View style={styles.photoPlaceholder}>
                                <Text style={styles.photoText}>
                                    {(personal.firstName || '')[0]}{(personal.lastName || '')[0]}
                                </Text>
                            </View>
                        )}
                    </View>

                    {/* Contact */}
                    <View style={styles.sidebarSection}>
                        <SidebarTitle label={i18n.contact} />
                        {personal.email ? <View style={styles.contactItem}><Text style={styles.sidebarText}>{personal.email}</Text></View> : null}
                        {personal.phone ? <View style={styles.contactItem}><Text style={styles.sidebarText}>{personal.phone}</Text></View> : null}
                        {personal.website ? <View style={styles.contactItem}><Text style={styles.sidebarText}>{personal.website}</Text></View> : null}
                    </View>

                    {sectionOrder
                        .filter(id => SIDEBAR_IDS.includes(id))
                        .map(id => renderSidebarSection(id))}
                </View>

                {/* ── Main content ── */}
                <View style={styles.mainContent}>
                    <View style={styles.header}>
                        <Text style={styles.name}>{personal.firstName || ''}</Text>
                        <Text style={[styles.name, dyn.textColor]}>{personal.lastName || ''}</Text>
                        {personal.role ? <Text style={styles.role}>{personal.role}</Text> : null}
                    </View>

                    {personal.summary ? (
                        <View style={styles.section}>
                            <SectionHeader label={i18n.summary} />
                            <Text style={styles.summaryBox}>{personal.summary}</Text>
                        </View>
                    ) : null}

                    {sectionOrder
                        .filter(id => !['skills', 'languages', 'personal'].includes(id))
                        .map(id => renderMainSection(id))}
                </View>
            </Page>
        </Document>
    );
};

export default CreativePDF;
