import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";

const Classic = ({ data }) => {
    const { personal, experience, internships, education, skills, languages, certificates, references } = data;
    const { t } = useLanguage();

    const formatDescription = (text) => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            const isBullet = line.trim().match(/^[•\-\*]/);
            return (
                <div key={i} className={`${isBullet ? 'hanging-indent mb-1' : 'mb-2'} last:mb-0 text-sm text-gray-700`}>
                    {line}
                </div>
            );
        });
    };

    return (
        <div className="w-full h-full bg-white text-gray-900 font-serif relative" id="cv-template">
            
            {/* Tabela Mestra para Gestão de Margens (Cabeçalho Fantasma) */}
            <table className="w-full">
                <thead className="h-[15mm] print:h-[15mm]">
                    <tr><td className="h-[15mm] print:h-[15mm]"></td></tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-8 pt-0 align-top">
                            
                            {/* --- HEADER --- */}
                            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">
                                    {personal.firstName} {personal.lastName}
                                </h1>
                                <p className="text-lg italic text-gray-600 mb-2">{personal.role || t.roleTitle}</p>
                                <div className="flex justify-center gap-4 text-sm flex-wrap">
                                    {personal.email && <span>{personal.email}</span>}
                                    {personal.phone && <span>• {personal.phone}</span>}
                                    {personal.website && <span>• {personal.website}</span>}
                                </div>
                                {(personal.birthDate || personal.civilStatus || personal.gender || personal.nationality) && (
                                    <div className="flex justify-center gap-4 text-xs mt-2 text-gray-500 uppercase tracking-tight">
                                        {personal.birthDate && <span>{t.birthDate}: {personal.birthDate}</span>}
                                        {personal.civilStatus && <span>• {personal.civilStatus}</span>}
                                        {personal.gender && <span>• {personal.gender}</span>}
                                        {personal.nationality && <span>• {personal.nationality}</span>}
                                    </div>
                                )}
                            </div>

                            {/* --- CONTENT --- */}
                            <div className="space-y-6">
                                
                                {/* Summary */}
                                {personal.summary && (
                                    <section>
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.summary}
                                        </h2>
                                        <p className="text-md leading-relaxed text-justify">
                                            {personal.summary}
                                        </p>
                                    </section>
                                )}

                                {/* Experience (REMOVI O 'break-inside-avoid' AQUI) */}
                                {experience && experience.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeExperience}
                                        </h2>
                                        <div className="space-y-6">
                                            {experience.map((exp) => (
                                                /* Removido className="break-inside-avoid" para permitir quebra de texto */
                                                <div key={exp.id}> 
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h3 className="font-bold text-lg">{exp.role}</h3>
                                                        <span className="italic text-sm text-gray-600">
                                                            {exp.date || `${exp.startDate} - ${exp.endDate}`}
                                                        </span>
                                                    </div>
                                                    <p className="font-medium text-gray-800 mb-2">{exp.company}</p>
                                                    <div className="max-w-2xl">
                                                        {formatDescription(exp.description)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Internships (REMOVI O 'break-inside-avoid' AQUI) */}
                                {internships && internships.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeInternships}
                                        </h2>
                                        <div className="space-y-6">
                                            {internships.map((intern) => (
                                                /* Removido className="break-inside-avoid" */
                                                <div key={intern.id}>
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h3 className="font-bold text-lg">{intern.role}</h3>
                                                        <span className="italic text-sm text-gray-600">
                                                            {intern.startDate} - {intern.endDate}
                                                        </span>
                                                    </div>
                                                    <p className="font-medium text-gray-800 mb-2">{intern.company}</p>
                                                    <div className="max-w-2xl">
                                                        {formatDescription(intern.description)}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Education (REMOVI O 'break-inside-avoid' AQUI) */}
                                {education && education.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeEducation}
                                        </h2>
                                        <div className="space-y-4">
                                            {education.map((edu) => (
                                                /* Removido className="break-inside-avoid" */
                                                <div key={edu.id}>
                                                    <div className="flex justify-between items-baseline mb-1">
                                                        <h3 className="font-bold text-lg">{edu.school}</h3>
                                                        <span className="italic text-sm text-gray-600">
                                                            {edu.date || `${edu.startDate} - ${edu.endDate}`}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-800">{edu.degree}</p>
                                                    {edu.description && (
                                                        <p className="text-sm text-gray-600 mt-1">{edu.description}</p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Skills (MANTIVE O 'break-inside-avoid' AQUI - Skills não devem partir a meio) */}
                                {skills && skills.length > 0 && (
                                    <section className="break-inside-avoid">
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeSkills}
                                        </h2>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                            {skills.map((skill, index) => (
                                                <span key={index} className="flex items-center gap-2">
                                                    • {typeof skill === 'string' ? skill : skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Languages */}
                                {languages && languages.length > 0 && (
                                    <section className="break-inside-avoid">
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeLanguages}
                                        </h2>
                                        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                                            {languages.map((lang, index) => (
                                                <span key={index}>
                                                    • {lang.language} ({t[lang.proficiency] || lang.proficiency})
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Certificates */}
                                {certificates && certificates.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeCertificates}
                                        </h2>
                                        <div className="space-y-3">
                                            {certificates.map((cert, index) => (
                                                <div key={index} className="break-inside-avoid">
                                                    <h3 className="font-bold">{cert.name}</h3>
                                                    <p className="text-sm italic text-gray-600">{cert.issuer} • {cert.date}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* References */}
                                {references && references.length > 0 && (
                                    <section>
                                        <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1">
                                            {t.resumeReferences}
                                        </h2>
                                        <div className="space-y-3">
                                            {references.map((ref, index) => (
                                                <div key={index} className="break-inside-avoid">
                                                    <h3 className="font-bold">{ref.name}</h3>
                                                    <p className="text-sm text-gray-700">{ref.position} at {ref.company}</p>
                                                    {ref.email && <p className="text-xs text-gray-600">{ref.email}</p>}
                                                    {ref.phone && <p className="text-xs text-gray-600">{ref.phone}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Signature */}
                                {personal.signatureUrl && (
                                    <section className="pt-8 flex flex-col items-center avoid-break">
                                        <img src={personal.signatureUrl} alt="Signature" className="max-h-20 mb-2" />
                                        <div className="w-64 h-px bg-gray-500 mb-2"></div>
                                        <p className="text-sm uppercase tracking-widest italic">{t.signature}</p>
                                    </section>
                                )}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

Classic.propTypes = {
    data: PropTypes.object.isRequired,
};

export default Classic;
