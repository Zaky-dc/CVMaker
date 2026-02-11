import { useState } from "react";
import { Briefcase, GraduationCap, Palette, User, Plus, Trash2, Camera, X, Globe, Award, Users, Link, PenTool, BookOpen } from "lucide-react";
import { useResume } from "../../context/ResumeContext";
import { useLanguage } from "../../context/LanguageContext";
import ExpansionPanel from "../ui/ExpansionPanel";
import TextField from "../ui/TextField";
import MonthPicker from "../ui/MonthPicker";
import TemplateSelector from "./TemplateSelector";
import { openUploadWidget } from "../../services/cloudinary";

const Editor = () => {
    const {
        resumeData,
        updateSection,
        updateExperience,
        addExperience,
        removeExperience,
        updateEducationItem,
        addEducation,
        removeEducation,
        setSkills,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addCertificate,
        updateCertificate,
        removeCertificate,
        addReference,
        updateReference,
        removeReference,
        addInternship,
        updateInternship,
        removeInternship,
    } = useResume();

    const { t } = useLanguage();
    const [newSkill, setNewSkill] = useState("");

    // Handle Metadata Change
    const handleMetadataChange = (e) => {
        updateSection("metadata", { [e.target.name]: e.target.value });
    };

    // Handle Personal Details Change
    const handlePersonalChange = (e) => {
        updateSection("personal", { [e.target.name]: e.target.value });
    };

    const handlePhotoUpload = () => {
        handleCloudinaryUpload('photoUrl');
    };

    const handleCloudinaryUpload = (field) => {
        openUploadWidget((error, result) => {
            if (!error && result && result.event === "success") {
                updateSection("personal", { [field]: result.info.secure_url });
            }
        });
    };
    const handleAddSkill = () => {
        if (newSkill.trim() === "") return;
        // Avoid duplicates
        if (!resumeData.skills.includes(newSkill.trim())) {
            setSkills([...resumeData.skills, newSkill.trim()]);
        }
        setNewSkill("");
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = [...resumeData.skills];
        updatedSkills.splice(index, 1);
        setSkills(updatedSkills);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission if inside a form
            handleAddSkill();
        }
    };

    const handleDescriptionKeyDown = (e, section, id, field) => {
        if (e.key === 'Enter') {
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const value = textarea.value;

            // Get current line
            const beforeText = value.substring(0, start);
            const lines = beforeText.split('\n');
            const currentLine = lines[lines.length - 1];

            // Check if current line starts with a bullet or dash
            const match = currentLine.match(/^(\s*[•\-\*]\s*)/);
            if (match) {
                e.preventDefault();
                const bullet = match[1];
                const newValue = value.substring(0, start) + '\n' + bullet + value.substring(end);

                // Update state depending on section
                if (section === 'experience') {
                    updateExperience(id, field, newValue);
                } else if (section === 'internships') {
                    updateInternship(id, field, newValue);
                }

                // Set cursor position after the new bullet
                setTimeout(() => {
                    textarea.selectionStart = textarea.selectionEnd = start + 1 + bullet.length;
                }, 0);
            }
        }
    };

    return (
        <div className="space-y-4 pb-20">
            {/* Design & Metadata */}
            <ExpansionPanel title={t.designTemplate} icon={Palette} defaultExpanded>
                <div className="space-y-4">
                    <TemplateSelector />
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {t.themeColor}
                            </label>
                            <input
                                type="color"
                                name="themeColor"
                                value={resumeData.metadata.themeColor}
                                onChange={handleMetadataChange}
                                className="w-full h-10 p-0 border-0 rounded cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </ExpansionPanel>

            {/* Personal Details */}
            <ExpansionPanel title={t.personalDetails} icon={User} defaultExpanded>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-4">
                            {resumeData.personal.photoUrl ? (
                                <img
                                    src={resumeData.personal.photoUrl}
                                    alt="Profile"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    <User size={24} />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={handlePhotoUpload}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors"
                            >
                                <Camera size={16} />
                                {resumeData.personal.photoUrl ? t.changePhoto : t.uploadPhoto}
                            </button>
                        </div>

                        {/* Signature Upload */}
                        <div className="flex items-center gap-4">
                            {resumeData.personal.signatureUrl ? (
                                <img
                                    src={resumeData.personal.signatureUrl}
                                    alt="Signature"
                                    className="w-24 h-12 rounded object-contain border border-gray-200 dark:border-gray-700 bg-white"
                                />
                            ) : (
                                <div className="w-24 h-12 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 border border-dashed border-gray-300">
                                    <PenTool size={16} />
                                </div>
                            )}
                            <button
                                type="button"
                                onClick={() => handleCloudinaryUpload('signatureUrl')}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors"
                            >
                                <PenTool size={16} />
                                {resumeData.personal.signatureUrl ? t.changeSignature : t.uploadSignature}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextField
                            label={t.firstName}
                            name="firstName"
                            value={resumeData.personal.firstName}
                            onChange={handlePersonalChange}
                        />
                        <TextField
                            label={t.lastName}
                            name="lastName"
                            value={resumeData.personal.lastName}
                            onChange={handlePersonalChange}
                        />
                        <TextField
                            label={t.email}
                            name="email"
                            type="email"
                            value={resumeData.personal.email}
                            onChange={handlePersonalChange}
                        />
                        <TextField
                            label={t.phone}
                            name="phone"
                            type="tel"
                            value={resumeData.personal.phone}
                            onChange={handlePersonalChange}
                        />
                        <div className="col-span-2 md:col-span-1">
                            <TextField
                                label={t.roleTitle}
                                name="role"
                                value={resumeData.personal.role || ""}
                                onChange={handlePersonalChange}
                            />
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <TextField
                                label={t.website}
                                name="website"
                                value={resumeData.personal.website || ""}
                                onChange={handlePersonalChange}
                            />
                        </div>
                        <TextField
                            label={t.birthDate}
                            name="birthDate"
                            type="date"
                            value={resumeData.personal.birthDate || ""}
                            onChange={handlePersonalChange}
                        />
                        <TextField
                            label={t.civilStatus}
                            name="civilStatus"
                            value={resumeData.personal.civilStatus || ""}
                            onChange={handlePersonalChange}
                        />
                        <TextField
                            label={t.gender}
                            name="gender"
                            value={resumeData.personal.gender || ""}
                            onChange={handlePersonalChange}
                        />
                        <TextField
                            label={t.nationality}
                            name="nationality"
                            value={resumeData.personal.nationality || ""}
                            onChange={handlePersonalChange}
                        />
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                {t.summary}
                            </label>
                            <textarea
                                rows="4"
                                className="block p-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 dark:border-gray-600 dark:text-white focus:ring-0 focus:border-primary resize-y"
                                placeholder={t.summaryPlaceholder}
                                name="summary"
                                value={resumeData.personal.summary}
                                onChange={handlePersonalChange}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </ExpansionPanel>

            {/* Experience */}
            <ExpansionPanel title={t.experience} icon={Briefcase}>
                <div className="space-y-6">
                    {(resumeData.experience || []).map((exp) => (
                        <div
                            key={exp.id}
                            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 relative group"
                        >
                            <button
                                onClick={() => removeExperience(exp.id)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <TextField
                                    label={t.jobTitle}
                                    name="role"
                                    value={exp.role}
                                    onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                                />
                                <TextField
                                    label={t.company}
                                    name="company"
                                    value={exp.company}
                                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.startDate}
                                    name="startDate"
                                    value={exp.startDate}
                                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.endDate}
                                    name="endDate"
                                    value={exp.endDate}
                                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                                />
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{t.description}</label>
                                    <textarea
                                        rows="3"
                                        className="block w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 dark:text-white focus:ring-0 focus:border-primary resize-y"
                                        value={exp.description}
                                        onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                                        onKeyDown={(e) => handleDescriptionKeyDown(e, 'experience', exp.id, 'description')}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addExperience}
                        className="w-full py-2 flex items-center justify-center gap-2 text-primary font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <Plus size={16} /> {t.addExperience}
                    </button>
                </div>
            </ExpansionPanel>

            {/* Internships */}
            <ExpansionPanel title={t.internships} icon={BookOpen}>
                <div className="space-y-6">
                    {(resumeData.internships || []).map((intern) => (
                        <div
                            key={intern.id}
                            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 relative group"
                        >
                            <button
                                onClick={() => removeInternship(intern.id)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <TextField
                                    label={t.jobTitle}
                                    name="role"
                                    value={intern.role}
                                    onChange={(e) => updateInternship(intern.id, "role", e.target.value)}
                                />
                                <TextField
                                    label={t.company}
                                    name="company"
                                    value={intern.company}
                                    onChange={(e) => updateInternship(intern.id, "company", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.startDate}
                                    name="startDate"
                                    value={intern.startDate}
                                    onChange={(e) => updateInternship(intern.id, "startDate", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.endDate}
                                    name="endDate"
                                    value={intern.endDate}
                                    onChange={(e) => updateInternship(intern.id, "endDate", e.target.value)}
                                />
                                <div className="col-span-1 md:col-span-2">
                                    <label className="block mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">{t.description}</label>
                                    <textarea
                                        rows="3"
                                        className="block w-full text-sm text-gray-900 bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 dark:text-white focus:ring-0 focus:border-primary resize-y"
                                        value={intern.description}
                                        onChange={(e) => updateInternship(intern.id, "description", e.target.value)}
                                        onKeyDown={(e) => handleDescriptionKeyDown(e, 'internships', intern.id, 'description')}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addInternship}
                        className="w-full py-2 flex items-center justify-center gap-2 text-primary font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <Plus size={16} /> {t.addInternship}
                    </button>
                </div>
            </ExpansionPanel>

            {/* Education */}
            <ExpansionPanel title={t.education} icon={GraduationCap}>
                <div className="space-y-6">
                    {(resumeData.education || []).map((edu) => (
                        <div
                            key={edu.id}
                            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 relative group"
                        >
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <TextField
                                    label={t.school}
                                    name="school"
                                    value={edu.school || ""}
                                    onChange={(e) => updateEducationItem(edu.id, "school", e.target.value)}
                                />
                                <TextField
                                    label={t.degree}
                                    name="degree"
                                    value={edu.degree || ""}
                                    onChange={(e) => updateEducationItem(edu.id, "degree", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.startDate}
                                    name="startDate"
                                    value={edu.startDate || ""}
                                    onChange={(e) => updateEducationItem(edu.id, "startDate", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.endDate}
                                    name="endDate"
                                    value={edu.endDate || ""}
                                    onChange={(e) => updateEducationItem(edu.id, "endDate", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addEducation}
                        className="w-full py-2 flex items-center justify-center gap-2 text-primary font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <Plus size={16} /> {t.addEducation}
                    </button>
                </div>
            </ExpansionPanel>

            {/* Skills */}
            <ExpansionPanel title={t.skills} icon={Palette}>
                <div className="space-y-4">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                            placeholder={t.skillsPlaceholder}
                        />
                        <button
                            onClick={handleAddSkill}
                            className="text-white bg-primary hover:bg-primary-dark focus:ring-4 focus:outline-none focus:ring-primary/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center gap-2"
                        >
                            <Plus size={16} />
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                        {(resumeData.skills || []).map((skill, idx) => (
                            <span key={idx} className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full dark:bg-primary/20 dark:text-primary-light flex items-center gap-2">
                                {typeof skill === 'string' ? skill : skill.name}
                                <button
                                    onClick={() => handleRemoveSkill(idx)}
                                    className="hover:text-red-500 transition-colors"
                                >
                                    <X size={14} />
                                </button>
                            </span>
                        ))}
                    </div>
                    {(!resumeData.skills || resumeData.skills.length === 0) && (
                        <p className="text-sm text-gray-400 italic">No skills added yet.</p>
                    )}
                </div>
            </ExpansionPanel>

            {/* Languages */}
            <ExpansionPanel title={t.languages} icon={Globe}>
                <div className="space-y-6">
                    {(resumeData.languages || []).map((lang) => (
                        <div
                            key={lang.id}
                            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 relative group"
                        >
                            <button
                                onClick={() => removeLanguage(lang.id)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label={t.language}
                                    name="language"
                                    value={lang.language || ""}
                                    onChange={(e) => updateLanguage(lang.id, "language", e.target.value)}
                                />
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {t.proficiency}
                                    </label>
                                    <select
                                        value={lang.proficiency || "intermediate"}
                                        onChange={(e) => updateLanguage(lang.id, "proficiency", e.target.value)}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    >
                                        <option value="native">{t.native}</option>
                                        <option value="fluent">{t.fluent}</option>
                                        <option value="advanced">{t.advanced}</option>
                                        <option value="intermediate">{t.intermediate}</option>
                                        <option value="basic">{t.basic}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addLanguage}
                        className="w-full py-2 flex items-center justify-center gap-2 text-primary font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <Plus size={16} /> {t.addLanguage}
                    </button>
                </div>
            </ExpansionPanel>

            {/* Certificates */}
            <ExpansionPanel title={t.certificates} icon={Award}>
                <div className="space-y-6">
                    {(resumeData.certificates || []).map((cert) => (
                        <div
                            key={cert.id}
                            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 relative group"
                        >
                            <button
                                onClick={() => removeCertificate(cert.id)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label={t.certificate}
                                    name="name"
                                    value={cert.name || ""}
                                    onChange={(e) => updateCertificate(cert.id, "name", e.target.value)}
                                />
                                <TextField
                                    label={t.issuer}
                                    name="issuer"
                                    value={cert.issuer || ""}
                                    onChange={(e) => updateCertificate(cert.id, "issuer", e.target.value)}
                                />
                                <MonthPicker
                                    label={t.certificateDate}
                                    name="date"
                                    value={cert.date || ""}
                                    onChange={(e) => updateCertificate(cert.id, "date", e.target.value)}
                                />
                                <TextField
                                    label={t.certificateUrl}
                                    name="url"
                                    value={cert.url || ""}
                                    onChange={(e) => updateCertificate(cert.id, "url", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addCertificate}
                        className="w-full py-2 flex items-center justify-center gap-2 text-primary font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <Plus size={16} /> {t.addCertificate}
                    </button>
                </div>
            </ExpansionPanel>

            {/* References */}
            <ExpansionPanel title={t.references} icon={Users}>
                <div className="space-y-6">
                    {(resumeData.references || []).map((ref) => (
                        <div
                            key={ref.id}
                            className="p-4 border border-gray-100 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-white/5 relative group"
                        >
                            <button
                                onClick={() => removeReference(ref.id)}
                                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove Item"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label={t.referenceName}
                                    name="name"
                                    value={ref.name || ""}
                                    onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                                />
                                <TextField
                                    label={t.position}
                                    name="position"
                                    value={ref.position || ""}
                                    onChange={(e) => updateReference(ref.id, "position", e.target.value)}
                                />
                                <TextField
                                    label={t.company}
                                    name="company"
                                    value={ref.company || ""}
                                    onChange={(e) => updateReference(ref.id, "company", e.target.value)}
                                />
                                <TextField
                                    label={t.email}
                                    name="email"
                                    type="email"
                                    value={ref.email || ""}
                                    onChange={(e) => updateReference(ref.id, "email", e.target.value)}
                                />
                                <TextField
                                    label={t.phone}
                                    name="phone"
                                    type="tel"
                                    value={ref.phone || ""}
                                    onChange={(e) => updateReference(ref.id, "phone", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={addReference}
                        className="w-full py-2 flex items-center justify-center gap-2 text-primary font-medium border border-dashed border-primary/30 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                        <Plus size={16} /> {t.addReference}
                    </button>
                </div>
            </ExpansionPanel>
        </div >
    );
};

export default Editor;
