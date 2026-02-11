import PropTypes from "prop-types";
import { Mail, Phone, Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Modern = ({ data }) => {
    const { personal, experience, internships, education, skills, languages, certificates, references, metadata } = data;
    const themeColor = metadata.themeColor || "#3B82F6";
    const { t } = useLanguage();

    const containerStyle = {
        "--theme-color": themeColor,
    };

    const formatDescription = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            const isBullet = line.trim().match(/^[•\-\*]/);
            return (
                <div key={i} className={`${isBullet ? 'hanging-indent mb-1' : 'mb-2'} last:mb-0`}>
                    {line}
                </div>
            );
        });
    };

    return (
        <div
            className="w-full h-full bg-white p-6 text-sm text-gray-800 relative print:bg-transparent"
            style={containerStyle}
            id="cv-template"
        >
            {/* Multi-page Sidebar Background for Print (Right side) */}
            <div
                className="hidden print:block fixed top-0 right-0 bottom-0 z-[-1]"
                style={{ width: "33.333333%", backgroundColor: "#f9fafb", WebkitPrintColorAdjust: "exact" }}
            ></div>
            <header className="border-b-2 border-[var(--theme-color)] pb-3 mb-5 flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold uppercase tracking-wide text-gray-900">
                        {personal.firstName} {personal.lastName}
                    </h1>
                    <p className="text-[var(--theme-color)] text-lg font-medium mt-1">
                        {personal.role || t.roleTitle}
                    </p>
                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-600">
                        {personal.email && (
                            <div className="flex items-center gap-1">
                                <Mail size={14} className="text-[var(--theme-color)]" />
                                <span>{personal.email}</span>
                            </div>
                        )}
                        {personal.phone && (
                            <div className="flex items-center gap-1">
                                <Phone size={14} className="text-[var(--theme-color)]" />
                                <span>{personal.phone}</span>
                            </div>
                        )}
                        {personal.website && (
                            <div className="flex items-center gap-1">
                                <Globe size={14} className="text-[var(--theme-color)]" />
                                <span>{personal.website}</span>
                            </div>
                        )}
                    </div>
                </div>
                {personal.photoUrl && (
                    // Using Cloudinary transformation URL logic would happen here or be passed pre-transformed
                    // For now assuming the URL is valid
                    <img
                        src={personal.photoUrl}
                        alt={`${personal.firstName} ${personal.lastName}`}
                        className="w-24 h-24 object-cover rounded-md border-2 border-[var(--theme-color)]"
                    />
                )}
            </header>

            <div className="grid grid-cols-12 gap-5">
                {/* Left Column (Main Content) */}
                <div className="col-span-8 space-y-5">
                    {/* Summary */}
                    {personal.summary && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-2 border-b border-gray-200 pb-1">
                                {t.summary}
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-sm">
                                {personal.summary}
                            </p>
                        </section>
                    )}

                    {/* Experience */}
                    {experience && experience.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeExperience}
                            </h3>
                            <div className="space-y-4">
                                {experience.map((exp) => (
                                    <div key={exp.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-bold text-gray-900">{exp.role}</h4>
                                            <span className="text-xs text-gray-500 italic">
                                                {exp.date || `${exp.startDate} - ${exp.endDate}`}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 font-medium text-xs mb-1">{exp.company}</p>
                                        <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed max-w-2xl">
                                            {formatDescription(exp.description)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Internships */}
                    {internships && internships.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeInternships}
                            </h3>
                            <div className="space-y-4">
                                {internships.map((intern) => (
                                    <div key={intern.id}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-bold text-gray-900">{intern.role}</h4>
                                            <span className="text-xs text-gray-500 italic">
                                                {intern.startDate} - {intern.endDate}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 font-medium text-xs mb-1">{intern.company}</p>
                                        <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed max-w-2xl">
                                            {formatDescription(intern.description)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeEducation}
                            </h3>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-bold text-gray-900">{edu.school}</h4>
                                            <span className="text-xs text-gray-500 italic">
                                                {edu.date || `${edu.startDate} - ${edu.endDate}`}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{edu.degree}</p>
                                        {edu.description && <p className="text-gray-600 text-xs mt-1">{edu.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* References */}
                    {references && references.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeReferences}
                            </h3>
                            <div className="space-y-4">
                                {references.map((ref, index) => (
                                    <div key={index}>
                                        <div className="font-semibold text-gray-900">{ref.name}</div>
                                        <div className="text-sm text-gray-600">
                                            {ref.position} {ref.company && `at ${ref.company}`}
                                        </div>
                                        {ref.email && <div className="text-xs text-gray-500">{ref.email}</div>}
                                        {ref.phone && <div className="text-xs text-gray-500">{ref.phone}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column (Sidebar) */}
                <div className="col-span-4 space-y-5 bg-gray-50 print:bg-transparent p-4 rounded-sm">
                    {/* Personal Info */}
                    {(personal.birthDate || personal.civilStatus || personal.gender || personal.nationality) && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.personalDetails}
                            </h3>
                            <div className="space-y-2 text-sm text-gray-700">
                                {personal.birthDate && (
                                    <div>
                                        <span className="font-bold text-gray-500 text-xs block uppercase">{t.birthDate}</span>
                                        {personal.birthDate}
                                    </div>
                                )}
                                {personal.civilStatus && (
                                    <div>
                                        <span className="font-bold text-gray-500 text-xs block uppercase">{t.civilStatus}</span>
                                        {personal.civilStatus}
                                    </div>
                                )}
                                {personal.gender && (
                                    <div>
                                        <span className="font-bold text-gray-500 text-xs block uppercase">{t.gender}</span>
                                        {personal.gender}
                                    </div>
                                )}
                                {personal.nationality && (
                                    <div>
                                        <span className="font-bold text-gray-500 text-xs block uppercase">{t.nationality}</span>
                                        {personal.nationality}
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeSkills}
                            </h3>
                            <ul className="space-y-2">
                                {skills.map((skill, index) => (
                                    <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                                        <span className="w-1.5 h-1.5 bg-[var(--theme-color)] rounded-full"></span>
                                        {typeof skill === 'string' ? skill : skill.name}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Languages */}
                    {languages && languages.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeLanguages}
                            </h3>
                            <ul className="space-y-2">
                                {languages.map((lang, index) => (
                                    <li key={index} className="text-sm text-gray-700">
                                        <span className="font-medium">{lang.language}</span>
                                        <span className="text-gray-500"> - {t[lang.proficiency] || lang.proficiency}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    {/* Certificates */}
                    {certificates && certificates.length > 0 && (
                        <section>
                            <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                                {t.resumeCertificates}
                            </h3>
                            <div className="space-y-3">
                                {certificates.map((cert, index) => (
                                    <div key={index} className="text-sm">
                                        <div className="font-medium text-gray-800">{cert.name}</div>
                                        <div className="text-gray-600 text-xs">{cert.issuer}</div>
                                        {cert.date && <div className="text-gray-500 text-xs">{cert.date}</div>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* Signature */}
            {personal.signatureUrl && (
                <section className="pt-6 flex flex-col items-center avoid-break">
                    <div className="text-center">
                        <img src={personal.signatureUrl} alt="Signature" className="max-h-16 mb-2" />
                        <div className="w-40 h-px bg-gray-400"></div>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{t.signature}</p>
                    </div>
                </section>
            )}
        </div>
    );
};

Modern.propTypes = {
    data: PropTypes.shape({
        metadata: PropTypes.shape({
            templateId: PropTypes.string,
            themeColor: PropTypes.string,
        }),
        personal: PropTypes.shape({
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            email: PropTypes.string,
            phone: PropTypes.string,
            photoUrl: PropTypes.string,
            summary: PropTypes.string,
            role: PropTypes.string, // Not in schema but good to have
        }),
        experience: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                company: PropTypes.string,
                role: PropTypes.string,
                date: PropTypes.string,
                description: PropTypes.string,
            })
        ),
        education: PropTypes.array,
        skills: PropTypes.array,
    }).isRequired,
};

export default Modern;
