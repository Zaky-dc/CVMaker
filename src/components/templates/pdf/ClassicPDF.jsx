import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const safeDate = (start, end) => {
    const s = start || '';
    const e = end || '';
    if (!s && !e) return '';
    if (!e || e.toLowerCase() === 'present') return `${s} \u2013 Present`;
    return `${s} \u2013 ${e}`;
};

const styles = StyleSheet.create({
    page: {
        paddingTop: 45,
        paddingBottom: 40,
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Times-Roman',
    },
    header: {
        borderBottomWidth: 2,
        borderBottomColor: '#1F2937',
        paddingBottom: 15,
        marginBottom: 20,
        textAlign: 'center',
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 5,
        letterSpacing: 2,
    },
    role: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#4B5563',
        marginBottom: 5,
    },
    contactInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 15,
        fontSize: 10,
        marginTop: 5,
    },
    section: {
        marginBottom: 14,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        paddingBottom: 3,
        marginBottom: 8,
    },
    jobHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    roleTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    company: {
        fontSize: 12,
        color: '#1F2937',
        marginBottom: 2,
        fontWeight: 'medium',
    },
    date: {
        fontSize: 10,
        fontStyle: 'italic',
        color: '#4B5563',
    },
    description: {
        fontSize: 11,
        lineHeight: 1.5,
        color: '#374151',
    },
    skillsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    skillItem: {
        fontSize: 11,
    },
});

const ClassicPDF = ({ data, t }) => {
    const {
        personal,
        experience,
        internships,
        education,
        skills,
        languages,
        certificates,
        references,
        sectionOrder = [
            "personal",
            "experience",
            "internships",
            "education",
            "skills",
            "languages",
            "certificates",
            "references",
        ],
    } = data;

    // Use default translations if t is not provided
    const i18n = t || {
        personalDetails: "Personal Details",
        skills: "Skills",
        languages: "Languages",
        certificates: "Certificates",
        experience: "Experience",
        internships: "Internships",
        education: "Education",
        references: "References",
        summary: "Summary",
        birthDate: "Birth Date",
        civilStatus: "Civil Status",
        gender: "Gender",
        nationality: "Nationality",
        contact: "Contact",
        at: "at",
        present: "Present"
    };

    const renderSection = (sectionId) => {
        switch (sectionId) {
            case "experience":
                return experience && experience.length > 0 && (
                    <View style={styles.section} key={sectionId} wrap={true}>
                        <Text style={styles.sectionTitle}>{i18n.experience}</Text>
                        {experience.map((exp, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <View style={styles.jobHeader} wrap={false}>
                                    <Text style={styles.roleTitle}>{exp.role}</Text>
                                    <Text style={styles.date}>{exp.date || safeDate(exp.startDate, exp.endDate)}</Text>
                                </View>
                                <Text style={styles.company} wrap={false}>{exp.company}</Text>
                                <Text style={styles.description}>{exp.description}</Text>
                            </View>
                        ))}
                    </View>
                );
            case "internships":
                return internships && internships.length > 0 && (
                    <View style={styles.section} key={sectionId} wrap={true}>
                        <Text style={styles.sectionTitle}>{i18n.internships}</Text>
                        {internships.map((intern, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <View style={styles.jobHeader} wrap={false}>
                                    <Text style={styles.roleTitle}>{intern.role}</Text>
                                    <Text style={styles.date}>{safeDate(intern.startDate, intern.endDate)}</Text>
                                </View>
                                <Text style={styles.company} wrap={false}>{intern.company}</Text>
                                <Text style={styles.description}>{intern.description}</Text>
                            </View>
                        ))}
                    </View>
                );
            case "education":
                return education && education.length > 0 && (
                    <View style={styles.section} key={sectionId} wrap={true}>
                        <Text style={styles.sectionTitle}>{i18n.education}</Text>
                        {education.map((edu, index) => (
                            <View key={index} style={{ marginBottom: 8 }}>
                                <View style={styles.jobHeader} wrap={false}>
                                    <Text style={styles.roleTitle}>{edu.school}</Text>
                                    <Text style={styles.date}>{edu.date || safeDate(edu.startDate, edu.endDate)}</Text>
                                </View>
                                <Text style={styles.description} wrap={false}>{edu.degree}</Text>
                                {edu.description && <Text style={{ fontSize: 10, color: '#4B5563', marginTop: 2 }}>{edu.description}</Text>}
                            </View>
                        ))}
                    </View>
                );
            case "skills":
                return skills && skills.length > 0 && (
                    <View style={styles.section} key={sectionId}>
                        <Text style={styles.sectionTitle}>{i18n.skills}</Text>
                        <View style={styles.skillsContainer}>
                            {skills.map((skill, index) => (
                                <Text key={index} style={styles.skillItem}>
                                    • {typeof skill === "string" ? skill : skill.name}
                                </Text>
                            ))}
                        </View>
                    </View>
                );
            case "languages":
                return languages && languages.length > 0 && (
                    <View style={styles.section} key={sectionId}>
                        <Text style={styles.sectionTitle}>{i18n.languages}</Text>
                        <View style={styles.skillsContainer}>
                            {languages.map((lang, index) => (
                                <Text key={index} style={styles.skillItem}>
                                    • {lang.language} ({lang.proficiency})
                                </Text>
                            ))}
                        </View>
                    </View>
                );
            case "certificates":
                return certificates && certificates.length > 0 && (
                    <View style={styles.section} key={sectionId}>
                        <Text style={styles.sectionTitle}>{i18n.certificates}</Text>
                        {certificates.map((cert, index) => (
                            <View key={index} style={{ marginBottom: 5 }} wrap={false}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{cert.name}</Text>
                                <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#4B5563' }}>
                                    {cert.issuer} • {cert.date}
                                </Text>
                            </View>
                        ))}
                    </View>
                );
            case "references":
                return references && references.length > 0 && (
                    <View style={styles.section} key={sectionId}>
                        <Text style={styles.sectionTitle}>{i18n.references}</Text>
                        {references.map((ref, index) => (
                            <View key={index} style={{ marginBottom: 5 }} wrap={false}>
                                <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{ref.name}</Text>
                                <Text style={{ fontSize: 11 }}>{[ref.position, ref.company].filter(Boolean).join(` ${i18n.at || 'at'} `)}</Text>
                                {ref.email && <Text style={{ fontSize: 10, color: '#4B5563' }}>{ref.email}</Text>}
                                {ref.phone && <Text style={{ fontSize: 10, color: '#4B5563' }}>{ref.phone}</Text>}
                            </View>
                        ))}
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Text style={styles.name}>{personal.firstName} {personal.lastName}</Text>
                    <Text style={styles.role}>{personal.role}</Text>
                    <View style={styles.contactInfo}>
                        {personal.email && <Text>{personal.email}</Text>}
                        {personal.phone && <Text>• {personal.phone}</Text>}
                        {personal.website && <Text>• {personal.website}</Text>}
                    </View>
                    {(personal.birthDate || personal.civilStatus || personal.gender || personal.nationality) && (
                        <View style={[styles.contactInfo, { marginTop: 2, fontSize: 8, color: '#6B7280', textTransform: 'uppercase' }]}>
                            {personal.birthDate && <Text>{i18n.birthDate}: {personal.birthDate}</Text>}
                            {personal.civilStatus && <Text>• {personal.civilStatus}</Text>}
                            {personal.gender && <Text>• {personal.gender}</Text>}
                            {personal.nationality && <Text>• {personal.nationality}</Text>}
                        </View>
                    )}
                </View>

                {sectionOrder.map((id) => {
                    if (id === 'personal' && personal.summary) {
                        return (
                            <View key={id} style={styles.section}>
                                <Text style={styles.sectionTitle}>{i18n.summary}</Text>
                                <Text style={{ fontSize: 11, textAlign: 'justify', lineHeight: 1.5 }}>{personal.summary}</Text>
                            </View>
                        );
                    }
                    return renderSection(id);
                })}
            </Page>
        </Document>
    );
};

export default ClassicPDF;
