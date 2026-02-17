import PropTypes from "prop-types";
import { Mail, Phone, Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Modern = ({ data }) => {
  const {
    personal,
    experience,
    internships,
    education,
    skills,
    languages,
    certificates,
    references,
    metadata,
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
  const themeColor = metadata.themeColor || "#3B82F6";
  const { t } = useLanguage();

  const containerStyle = {
    "--theme-color": themeColor,
  };

  const formatDescription = (text) => {
    if (!text) return null;
    return text.split("\n").map((line, i) => {
      const isBullet = line.trim().match(/^[•\-\*]/);
      return (
        <div
          key={i}
          className={`${isBullet ? "hanging-indent mb-1" : "mb-2"} last:mb-0`}
        >
          {line}
        </div>
      );
    });
  };

  const renderSidebarSection = (sectionId) => {
    switch (sectionId) {
      case "personal":
        return (
          (personal.birthDate ||
            personal.civilStatus ||
            personal.gender ||
            personal.nationality) && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                {t.personalDetails}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {personal.birthDate && (
                  <div>
                    <span className="font-bold text-gray-500 text-xs block uppercase">
                      {t.birthDate}
                    </span>
                    {personal.birthDate}
                  </div>
                )}
                {personal.civilStatus && (
                  <div>
                    <span className="font-bold text-gray-500 text-xs block uppercase">
                      {t.civilStatus}
                    </span>
                    {personal.civilStatus}
                  </div>
                )}
                {personal.gender && (
                  <div>
                    <span className="font-bold text-gray-500 text-xs block uppercase">
                      {t.gender}
                    </span>
                    {personal.gender}
                  </div>
                )}
                {personal.nationality && (
                  <div>
                    <span className="font-bold text-gray-500 text-xs block uppercase">
                      {t.nationality}
                    </span>
                    {personal.nationality}
                  </div>
                )}
              </div>
            </section>
          )
        );
      case "skills":
        return (
          skills &&
          skills.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                {t.resumeSkills}
              </h3>
              <ul className="space-y-2 flex flex-col items-center">
                {skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-sm text-gray-700 w-full justify-center"
                  >
                    <span className="w-1.5 h-1.5 bg-[var(--theme-color)] rounded-full shrink-0"></span>
                    <span className="text-center">
                      {typeof skill === "string" ? skill : skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        );
      case "languages":
        return (
          languages &&
          languages.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                {t.resumeLanguages}
              </h3>
              <ul className="space-y-2">
                {languages.map((lang, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    <span className="font-medium">{lang.language}</span>
                    <span className="text-gray-500">
                      {" "}
                      - {t[lang.proficiency] || lang.proficiency}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )
        );
      case "certificates":
        return (
          certificates &&
          certificates.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1">
                {t.resumeCertificates}
              </h3>
              <div className="space-y-3">
                {certificates.map((cert, index) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium text-gray-800">{cert.name}</div>
                    <div className="text-gray-600 text-xs">{cert.issuer}</div>
                    {cert.date && (
                      <div className="text-gray-500 text-xs">{cert.date}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      default:
        return null;
    }
  };

  const renderMainSection = (sectionId) => {
    switch (sectionId) {
      case "experience":
        return (
          experience &&
          experience.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 break-after-avoid">
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
                    <p className="text-gray-700 font-medium text-xs mb-1">
                      {exp.company}
                    </p>
                    <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed max-w-2xl">
                      {formatDescription(exp.description)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "internships":
        return (
          internships &&
          internships.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 break-after-avoid">
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
                    <p className="text-gray-700 font-medium text-xs mb-1">
                      {intern.company}
                    </p>
                    <div className="text-gray-700 text-sm whitespace-pre-line leading-relaxed max-w-2xl">
                      {formatDescription(intern.description)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "education":
        return (
          education &&
          education.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 break-after-avoid">
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
                    {edu.description && (
                      <p className="text-gray-600 text-xs mt-1">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "references":
        return (
          references &&
          references.length > 0 && (
            <section>
              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-3 border-b border-gray-200 pb-1 break-after-avoid">
                {t.resumeReferences}
              </h3>
              <div className="space-y-4">
                {references.map((ref, index) => (
                  <div key={index} className="break-inside-avoid">
                    <div className="font-semibold text-gray-900">
                      {ref.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {ref.position} {ref.company && `at ${ref.company}`}
                    </div>
                    {ref.email && (
                      <div className="text-xs text-gray-500">{ref.email}</div>
                    )}
                    {ref.phone && (
                      <div className="text-xs text-gray-500">{ref.phone}</div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full min-h-[297mm] h-full flex bg-white text-sm text-gray-800 relative print:bg-transparent"
      style={containerStyle}
      id="cv-template"
    >
      {/* Sidebar Background (Absolute) */}
      <div
        className="absolute top-0 right-0 bottom-0 w-1/3 bg-gray-50 z-0 print:fixed print:right-0 print:top-0 print:h-screen print:w-1/3"
        style={{
          backgroundColor: "#f9fafb",
          printColorAdjust: "exact",
          WebkitPrintColorAdjust: "exact",
        }}
      ></div>

      {/* --- LEFT COLUMN (Main Content) --- */}
      <div className="w-2/3 relative z-10 print:w-2/3">
        <table className="w-full [.is-generating-pdf_&]:-mt-[20mm]">
          <thead className="h-0 [.is-generating-pdf_&]:h-[20mm]">
            <tr><td className="h-0 [.is-generating-pdf_&]:h-[20mm]"></td></tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6 pr-6 pt-6 align-top">
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
                  {personal.photoUrl ? (
                    <img
                      src={personal.photoUrl}
                      alt={`${personal.firstName} ${personal.lastName}`}
                      className="w-24 h-24 object-cover rounded-md border-2 border-[var(--theme-color)] bg-white"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-md border-2 border-[var(--theme-color)] bg-gray-100 text-[var(--theme-color)] font-bold text-2xl uppercase">
                      {(personal.firstName?.[0] || "") + (personal.lastName?.[0] || "")}
                    </div>
                  )}
                </header>

                <div className="space-y-5">
                  {/* Main Sections (Dynamic) */}
                  {sectionOrder
                    .filter(
                      (id) => !["skills", "languages", "certificates"].includes(id),
                    )
                    .map((id) => {
                      if (id === "personal") {
                        return (
                          personal.summary && (
                            <section key={id} className="break-inside-avoid">
                              <h3 className="text-[var(--theme-color)] font-bold uppercase tracking-wider mb-2 border-b border-gray-200 pb-1 break-after-avoid">
                                {t.summary}
                              </h3>
                              <p className="text-gray-700 leading-relaxed text-sm">
                                {personal.summary}
                              </p>
                            </section>
                          )
                        );
                      }
                      return <div key={id}>{renderMainSection(id)}</div>;
                    })}

                  {/* Signature */}
                  {personal.signatureUrl && (
                    <section className="pt-6 mt-auto flex flex-col items-center avoid-break">
                      <div className="text-center">
                        <img
                          src={personal.signatureUrl}
                          alt="Signature"
                          className="max-h-16 mb-2"
                        />
                        <div className="w-40 h-px bg-gray-400"></div>
                        <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                          {t.signature}
                        </p>
                      </div>
                    </section>
                  )}
                </div>
              </td>
            </tr>
          </tbody>

          {/* RODAPÉ FANTASMA ESQUERDA */}
          <tfoot className="h-0 [.is-generating-pdf_&]:h-[20mm]">
            <tr><td className="h-0 [.is-generating-pdf_&]:h-[20mm]"></td></tr>
          </tfoot>
        </table>
      </div>

      {/* --- RIGHT COLUMN (Sidebar) --- */}
      <div className="w-1/3 relative z-10 print:w-1/3">
        <table className="w-full [.is-generating-pdf_&]:-mt-[20mm]">
          <thead className="h-0 [.is-generating-pdf_&]:h-[20mm]">
            <tr><td className="h-0 [.is-generating-pdf_&]:h-[20mm]"></td></tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6 pl-4 align-top">
                <div className="space-y-5">
                  {/* Sidebar Sections (Dynamic) */}
                  {sectionOrder
                    .filter((id) =>
                      ["personal", "skills", "languages", "certificates"].includes(
                        id,
                      ),
                    )
                    .map((id) => (
                      <div key={id}>{renderSidebarSection(id)}</div>
                    ))}
                </div>
              </td>
            </tr>
          </tbody>

          {/* RODAPÉ FANTASMA DIREITA */}
          <tfoot className="h-0 [.is-generating-pdf_&]:h-[20mm]">
            <tr><td className="h-0 [.is-generating-pdf_&]:h-[20mm]"></td></tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

Modern.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Modern;
