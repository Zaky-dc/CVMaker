import PropTypes from "prop-types";
import { Mail, Phone, Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Creative = ({ data }) => {
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
  const themeColor = metadata.themeColor || "#8B5CF6";
  const { t } = useLanguage();

  const containerStyle = {
    "--theme-color": themeColor,
  };

  const getProficiencyLevel = (proficiency) => {
    const levels = {
      native: 100,
      fluent: 90,
      advanced: 75,
      intermediate: 50,
      basic: 30,
    };
    return levels[proficiency] || 50;
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
            <div className="space-y-2 mb-8">
              <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[9px] mb-3 opacity-80 border-b border-white/20 pb-1.5">
                {t.personalDetails}
              </h3>
              {personal.birthDate && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black opacity-60 tracking-wider font-sans">
                    {t.birthDate}
                  </span>
                  <span className="text-[11px] font-medium opacity-90">
                    {personal.birthDate}
                  </span>
                </div>
              )}
              {personal.civilStatus && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black opacity-60 tracking-wider font-sans">
                    {t.civilStatus}
                  </span>
                  <span className="text-[11px] font-medium opacity-90">
                    {personal.civilStatus}
                  </span>
                </div>
              )}
              {personal.gender && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black opacity-60 tracking-wider font-sans">
                    {t.gender}
                  </span>
                  <span className="text-[11px] font-medium opacity-90">
                    {personal.gender}
                  </span>
                </div>
              )}
              {personal.nationality && (
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] uppercase font-black opacity-60 tracking-wider font-sans">
                    {t.nationality}
                  </span>
                  <span className="text-[11px] font-medium opacity-90">
                    {personal.nationality}
                  </span>
                </div>
              )}
            </div>
          )
        );
      case "skills":
        return (
          skills &&
          skills.length > 0 && (
            <div className="mb-5">
              <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[9px] mb-3 opacity-80 border-b border-white/20 pb-1.5">
                {t.resumeSkills}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-white/15 hover:bg-white/25 border border-white/10 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide backdrop-blur-sm transition-all duration-300 cursor-default"
                  >
                    {typeof skill === "string" ? skill : skill.name}
                  </span>
                ))}
              </div>
            </div>
          )
        );
      case "languages":
        return (
          languages &&
          languages.length > 0 && (
            <div>
              <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[9px] mb-3 opacity-80 border-b border-white/20 pb-1.5">
                {t.resumeLanguages}
              </h3>
              <div className="space-y-4">
                {languages.map((lang, index) => (
                  <div key={index} className="space-y-1.5">
                    <div className="flex justify-between items-center px-0.5">
                      <span className="text-[11px] font-bold tracking-wide">
                        {lang.language}
                      </span>
                      <span className="text-[9px] uppercase font-black opacity-60 tracking-tighter">
                        {t[lang.proficiency] || lang.proficiency}
                      </span>
                    </div>
                    <div className="w-full bg-black/10 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-white rounded-full h-full shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000"
                        style={{
                          width: `${getProficiencyLevel(lang.proficiency)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            <section className="mb-5">
              <h3 className="flex items-center gap-4 text-xs font-black text-gray-900 mb-3 uppercase tracking-[0.2em] break-after-avoid">
                <span className="w-10 h-1 bg-[var(--theme-color)] rounded-full"></span>
                {t.resumeExperience}
              </h3>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative pl-8 ml-2 border-l border-slate-200 last:border-l-0 group"
                  >
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-[var(--theme-color)] shadow-sm group-hover:scale-125 transition-all duration-300"></div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <h4 className="font-black text-gray-900 text-base uppercase tracking-tight leading-tight group-hover:text-[var(--theme-color)] transition-colors">
                          {exp.role}
                        </h4>
                        <span className="text-[9px] font-black text-white bg-gray-900 px-2 py-1 rounded-md shadow-sm uppercase tracking-widest flex-shrink-0">
                          {exp.date || `${exp.startDate} - ${exp.endDate}`}
                        </span>
                      </div>
                      <div className="text-[var(--theme-color)] font-black text-[10px] uppercase tracking-widest">
                        {exp.company}
                      </div>
                      <div className="text-gray-500 text-[12px] leading-relaxed max-w-2xl whitespace-pre-line">
                        {formatDescription(exp.description)}
                      </div>
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
            <section className="mb-6">
              <h3 className="flex items-center gap-4 text-xs font-black text-gray-900 mb-4 uppercase tracking-[0.2em] break-after-avoid">
                <span className="w-10 h-1 bg-[var(--theme-color)] rounded-full"></span>
                {t.resumeInternships}
              </h3>
              <div className="space-y-4">
                {internships.map((intern) => (
                  <div
                    key={intern.id}
                    className="relative pl-8 ml-2 border-l border-slate-200 last:border-l-0 group"
                  >
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full border-2 border-white bg-[var(--theme-color)] shadow-sm group-hover:scale-125 transition-all duration-300"></div>

                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-between items-start gap-4">
                        <h4 className="font-black text-gray-900 text-lg uppercase tracking-tight leading-none group-hover:text-[var(--theme-color)] transition-colors">
                          {intern.role}
                        </h4>
                        <span className="text-[10px] font-black text-white bg-gray-900 px-3 py-1.5 rounded-md shadow-sm uppercase tracking-widest">
                          {intern.startDate} - {intern.endDate}
                        </span>
                      </div>
                      <div className="text-[var(--theme-color)] font-black text-xs uppercase tracking-widest">
                        {intern.company}
                      </div>
                      <div className="text-gray-500 text-[12px] leading-relaxed max-w-2xl whitespace-pre-line">
                        {formatDescription(intern.description)}
                      </div>
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
            <section className="mb-6">
              <h3 className="flex items-center gap-4 text-xs font-black text-gray-900 mb-4 uppercase tracking-[0.2em] break-after-avoid">
                <span className="w-10 h-1 bg-[var(--theme-color)] rounded-full"></span>
                {t.resumeEducation}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-4 rounded-2xl bg-white border-2 border-slate-50 hover:border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 break-inside-avoid"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-black text-gray-900 text-base uppercase tracking-tight">
                          {edu.school}
                        </h4>
                        <div className="text-[var(--theme-color)] font-bold text-xs uppercase tracking-widest mt-0.5">
                          {edu.degree}
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-gray-400 bg-slate-50 px-3 py-1 rounded-md uppercase tracking-widest">
                        {edu.date || `${edu.startDate} - ${edu.endDate}`}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-gray-500 text-[12px] leading-relaxed italic">
                        {edu.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )
        );
      case "certificates":
        return (
          certificates &&
          certificates.length > 0 && (
            <section className="mb-6">
              <h3 className="flex items-center gap-4 text-xs font-black text-gray-900 mb-4 uppercase tracking-[0.2em] break-after-avoid">
                <span className="w-10 h-1 bg-[var(--theme-color)] rounded-full"></span>
                {t.resumeCertificates}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-lg transition-all duration-300 break-inside-avoid"
                  >
                    <div className="w-10 h-10 flex-shrink-0 bg-[var(--theme-color)]/10 text-[var(--theme-color)] rounded-lg flex items-center justify-center font-black text-xl">
                      C
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 text-xs uppercase tracking-tight mb-1">
                        {cert.name}
                      </h4>
                      <div className="text-[10px] font-bold text-gray-500 uppercase">
                        {cert.issuer}
                      </div>
                      {cert.date && (
                        <div className="text-[9px] font-black text-[var(--theme-color)] uppercase tracking-tighter mt-1">
                          {cert.date}
                        </div>
                      )}
                    </div>
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
            <section className="mb-6">
              <h3 className="flex items-center gap-4 text-xs font-black text-gray-900 mb-4 uppercase tracking-[0.2em] break-after-avoid">
                <span className="w-10 h-1 bg-[var(--theme-color)] rounded-full"></span>
                {t.resumeReferences}
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {references.map((ref, index) => (
                  <div key={index} className="space-y-2 group break-inside-avoid">
                    <h4 className="font-black text-gray-900 text-sm uppercase tracking-tight group-hover:text-[var(--theme-color)] transition-colors">
                      {ref.name}
                    </h4>
                    <div className="space-y-0.5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {ref.position}
                      </p>
                      <p className="text-[10px] font-black text-[var(--theme-color)] uppercase tracking-tighter">
                        {ref.company}
                      </p>
                    </div>
                    <div className="pt-2 space-y-1">
                      {ref.email && (
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                          <Mail size={10} className="text-gray-300" />{" "}
                          {ref.email}
                        </div>
                      )}
                      {ref.phone && (
                        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                          <Phone size={10} className="text-gray-300" />{" "}
                          {ref.phone}
                        </div>
                      )}
                    </div>
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
      className="w-full min-h-[297mm] bg-white flex print:block text-sm font-sans relative print:bg-transparent"
      style={containerStyle}
      id="cv-template"
    >
      {/* Sidebar Background */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1/3 z-0 print:fixed print:top-0 print:left-0 print:h-screen print:w-1/3"
        style={{
          backgroundColor: themeColor,
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      ></div>

      {/* Left Sidebar */}
      <aside className="w-1/3 text-white relative z-10 print:absolute print:left-0 print:top-0 print:h-full print:w-1/3">
        <table className="w-full print:-mt-[15mm] [.is-generating-pdf_&]:-mt-[15mm]">
          <thead className="h-0 print:h-[15mm] [.is-generating-pdf_&]:h-[15mm]">
            <tr>
              <td className="h-0 print:h-[15mm] [.is-generating-pdf_&]:h-[15mm]"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6 pt-6 align-top">
                <div className="relative z-10">
                  {/* Photo */}
                  <div className="mb-4 flex justify-center">
                    {personal.photoUrl ? (
                      <div className="relative p-1 bg-white/5 rounded-xl">
                        <img
                          src={personal.photoUrl}
                          alt="Profile"
                          className="w-32 h-32 rounded-xl object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-white/20 flex items-center justify-center text-4xl font-bold backdrop-blur-md shadow-xl border border-white/30">
                        {personal.firstName?.[0]}
                        {personal.lastName?.[0]}
                      </div>
                    )}
                  </div>

                  {/* Contact */}
                  <div className="space-y-3 mb-5">
                    <h3 className="text-white font-bold uppercase tracking-[0.25em] text-[9px] mb-3 opacity-80 border-b border-white/20 pb-1.5">
                      {t.resumeContact || "Contact"}
                    </h3>
                    {personal.email && (
                      <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                          <Mail size={14} className="text-white/90" />
                        </div>
                        <span className="text-[11px] font-medium leading-tight break-all opacity-90">
                          {personal.email}
                        </span>
                      </div>
                    )}
                    {personal.phone && (
                      <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                          <Phone size={14} className="text-white/90" />
                        </div>
                        <span className="text-[11px] font-medium opacity-90">
                          {personal.phone}
                        </span>
                      </div>
                    )}
                    {personal.website && (
                      <div className="flex items-center gap-4 group">
                        <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300">
                          <Globe size={14} className="text-white/90" />
                        </div>
                        <span className="text-[11px] font-medium leading-tight break-all opacity-90">
                          {personal.website}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Sections (Dynamic) */}
                  {sectionOrder
                    .filter((id) =>
                      ["personal", "skills", "languages"].includes(id),
                    )
                    .map((id) => (
                      <div key={id}>{renderSidebarSection(id)}</div>
                    ))}
                </div>
              </td>
            </tr>
          </tbody>

          {/* RODAPÉ FANTASMA LATERAL */}
          <tfoot className="h-0 print:h-[20mm] [.is-generating-pdf_&]:h-[20mm]">
            <tr><td className="h-0 print:h-[20mm] [.is-generating-pdf_&]:h-[20mm]"></td></tr>
          </tfoot>
        </table>
      </aside>

      {/* Main Content */}
      <main className="w-2/3 bg-white print:bg-transparent print:w-2/3 print:ml-[33.333333%]">
        <table className="w-full print:-mt-[25mm] [.is-generating-pdf_&]:-mt-[25mm]">
          <thead className="h-0 print:h-[15mm] [.is-generating-pdf_&]:h-[15mm]">
            <tr>
              <td className="h-0 print:h-[15mm] [.is-generating-pdf_&]:h-[15mm]"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="p-8 pt-6">
                  {/* Header */}
                  <header className="mb-4 relative inline-block">
                    <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1.5 h-full rounded-full bg-[var(--theme-color)] opacity-20"></div>
                    <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter leading-[0.85] mb-2">
                      {personal.firstName}
                      <br />
                      <span className="text-[var(--theme-color)]">
                        {personal.lastName}
                      </span>
                    </h1>
                    <p className="text-base font-bold text-gray-400 uppercase tracking-[0.3em] ml-1 mt-1">
                      {personal.role || t.roleTitle}
                    </p>
                  </header>

                  {/* Main Sections (Dynamic) */}
                  {sectionOrder
                    .filter(
                      (id) =>
                        ![/*"personal",*/ "skills", "languages"].includes(id),
                    )
                    .map((id) => {
                      if (id === "personal") {
                        return (
                          personal.summary && (
                            <section key={id} className="mb-5 break-inside-avoid">
                              <h3 className="flex items-center gap-4 text-xs font-black text-gray-900 mb-2 uppercase tracking-[0.2em] break-after-avoid">
                                <span className="w-10 h-1 bg-[var(--theme-color)] rounded-full"></span>
                                {t.summary}
                              </h3>
                              <div className="relative p-3 bg-slate-50 rounded-2xl border border-slate-100 italic text-gray-600 leading-relaxed text-[13px] shadow-sm">
                                <div className="absolute top-0 left-6 -translate-y-1/2 bg-white px-2 text-2xl font-serif text-[var(--theme-color)] opacity-20 h-4 leading-none">
                                  “
                                </div>
                                {personal.summary}
                              </div>
                            </section>
                          )
                        );
                      }
                      return <div key={id}>{renderMainSection(id)}</div>;
                    })}

                  {/* Signature */}
                  {personal.signatureUrl && (
                    <section className="mt-8 pt-8 border-t border-slate-100 flex flex-col items-center">
                      <img
                        src={personal.signatureUrl}
                        alt="Signature"
                        className="max-w-[200px] max-h-[80px] object-contain mb-2"
                      />
                      <div className="w-48 h-px bg-gray-300 mb-2"></div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                        {t.signature}
                      </p>
                    </section>
                  )}
                </div>
              </td>
            </tr>
          </tbody>

          {/* RODAPÉ FANTASMA CENTRAL */}
          <tfoot className="h-0 print:h-[20mm] [.is-generating-pdf_&]:h-[20mm]">
            <tr><td className="h-0 print:h-[20mm] [.is-generating-pdf_&]:h-[20mm]"></td></tr>
          </tfoot>
        </table>
      </main>
    </div>
  );
};

Creative.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Creative;
