import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAuth } from "./AuthContext";
import { db } from "../services/firebase";
import { ref, onValue, set } from "firebase/database";
import { uploadToCloudinary } from "../services/cloudinary";
import { blobToBase64 } from "../utils/fileUtils";

const ResumeContext = createContext();

const initialResumeState = {
  metadata: {
    templateId: "modern",
    themeColor: "#3B82F6",
  },
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    photoUrl: "",
    summary: "",
    birthDate: "",
    civilStatus: "",
    gender: "",
    nationality: "",
    website: "",
    signatureUrl: "",
  },
  experience: [
    {
      id: 1,
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  education: [],
  skills: [],
  languages: [],
  certificates: [],
  references: [],
  internships: [],
  sectionOrder: [
    "personal",
    "experience",
    "internships",
    "education",
    "skills",
    "languages",
    "certificates",
    "references",
  ],
};

export const ResumeProvider = ({ children }) => {
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("resumeData");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return {
            ...initialResumeState,
            ...parsed,
            // Ensure nested objects are also merged if needed, 
            // but for sectionOrder (top-level) this is enough.
            sectionOrder: parsed.sectionOrder || initialResumeState.sectionOrder,
            metadata: { ...initialResumeState.metadata, ...(parsed.metadata || {}) },
            personal: { ...initialResumeState.personal, ...(parsed.personal || {}) }
          };
        } catch (e) {
          console.error("Error parsing saved resume data:", e);
          return initialResumeState;
        }
      }
    }
    return initialResumeState;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data on mount or user change
  useEffect(() => {
    if (user) {
      // Logged in: Load from Firebase RTDB
      const userRef = ref(db, `users/${user.uid}/resume`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          // Ensure all arrays exist, merge with initialResumeState to prevent undefined errors
          setResumeData({
            ...initialResumeState,
            ...data,
            experience: data.experience || initialResumeState.experience,
            education: data.education || initialResumeState.education,
            skills: data.skills || initialResumeState.skills,
            languages: data.languages || initialResumeState.languages,
            certificates: data.certificates || initialResumeState.certificates,
            references: data.references || initialResumeState.references,
            internships: data.internships || initialResumeState.internships,
            sectionOrder: data.sectionOrder || initialResumeState.sectionOrder,
            metadata: {
              ...initialResumeState.metadata,
              ...(data.metadata || {}),
              themeColor:
                data.metadata?.themeColor ||
                initialResumeState.metadata.themeColor,
            },
            personal: {
              ...initialResumeState.personal,
              ...(data.personal || {}),
            },
          });
          setHasUnsavedChanges(false); // Data just loaded, no unsaved changes
        } else {
          // New user: Load initial state
          setResumeData(initialResumeState);
          setHasUnsavedChanges(false);
        }
        setIsLoaded(true);
      });
      return () => unsubscribe();
    } else if (!isLoaded) {
      // If logout or guest: We already initialized from local storage.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setIsLoaded(true);
    }
  }, [user]);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  const [pendingSignature, setPendingSignature] = useState(null);

  // Save to Local Storage always (as backup/guest mode)
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("resumeData", JSON.stringify(resumeData));

    // Mark as having unsaved changes (only for logged-in users OR if there are pending uploads)
    // Pending uploads need "Save" to be processed (Base64 for guest, Cloudinary for user)
    if (user || pendingPhoto || pendingSignature) {
      setHasUnsavedChanges(true);
    }
  }, [resumeData, user, isLoaded, pendingPhoto, pendingSignature]);

  const saveResume = async () => {
    try {
      let updatedData = { ...resumeData };

      // Handle Photo
      if (pendingPhoto) {
        let photoUrl;
        if (user) {
          photoUrl = await uploadToCloudinary(pendingPhoto);
        } else {
          photoUrl = await blobToBase64(pendingPhoto);
        }
        updatedData.personal.photoUrl = photoUrl;
        setPendingPhoto(null);
      }

      // Handle Signature
      if (pendingSignature) {
        let signatureUrl;
        if (user) {
          signatureUrl = await uploadToCloudinary(pendingSignature);
        } else {
          signatureUrl = await blobToBase64(pendingSignature);
        }
        updatedData.personal.signatureUrl = signatureUrl;
        setPendingSignature(null);
      }

      // Update state (triggers localStorage save via useEffect)
      setResumeData(updatedData);

      if (user) {
        const userRef = ref(db, `users/${user.uid}/resume`);
        await set(userRef, updatedData);
      }

      setHasUnsavedChanges(false);
      return { success: true };
    } catch (err) {
      console.error("Error saving resume:", err);
      return { success: false, error: err };
    }
  };

  const updateSection = (section, data) => {
    setResumeData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(), // Generate unique ID
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (id) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  // Generic update for array items (Education, Skills similar logic could be added)
  // For now, focusing on the provided schema. Skills is array of strings or objects? The prompt says "skills: []". Usually array of strings or objects {id, name, level}.
  // Assuming simple strings or objects based on common patterns. I'll make it generic.

  // Education Helpers
  const updateEducationItem = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          school: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (id) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  // Generic helper for reordering/updating full arrays if needed (drag and drop)
  const setEducation = (newEducation) => {
    setResumeData((prev) => ({ ...prev, education: newEducation }));
  };

  const setSkills = (newSkills) => {
    setResumeData((prev) => ({ ...prev, skills: newSkills }));
  };

  // Languages CRUD
  const addLanguage = () => {
    setResumeData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now(),
          language: "",
          proficiency: "intermediate",
        },
      ],
    }));
  };

  const updateLanguage = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang,
      ),
    }));
  };

  const removeLanguage = (id) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang.id !== id),
    }));
  };

  // Certificates CRUD
  const addCertificate = () => {
    setResumeData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          id: Date.now(),
          name: "",
          issuer: "",
          date: "",
          url: "",
        },
      ],
    }));
  };

  const updateCertificate = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert,
      ),
    }));
  };

  const removeCertificate = (id) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((cert) => cert.id !== id),
    }));
  };

  // References CRUD
  const addReference = () => {
    setResumeData((prev) => ({
      ...prev,
      references: [
        ...prev.references,
        {
          id: Date.now(),
          name: "",
          position: "",
          company: "",
          email: "",
          phone: "",
        },
      ],
    }));
  };

  const updateReference = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      references: prev.references.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref,
      ),
    }));
  };

  const removeReference = (id) => {
    setResumeData((prev) => ({
      ...prev,
      references: prev.references.filter((ref) => ref.id !== id),
    }));
  };

  const addInternship = () => {
    setResumeData((prev) => ({
      ...prev,
      internships: [
        ...prev.internships,
        {
          id: Date.now(),
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateInternship = (id, field, value) => {
    setResumeData((prev) => ({
      ...prev,
      internships: prev.internships.map((intern) =>
        intern.id === id ? { ...intern, [field]: value } : intern,
      ),
    }));
  };

  const removeInternship = (id) => {
    setResumeData((prev) => ({
      ...prev,
      internships: prev.internships.filter((intern) => intern.id !== id),
    }));
  };

  const updateSectionOrder = (newOrder) => {
    setResumeData((prev) => ({
      ...prev,
      sectionOrder: newOrder,
    }));
  };

  const resetResume = () => {
    setResumeData(initialResumeState);
    localStorage.removeItem("resumeData");
  };

  const value = {
    resumeData,
    setResumeData, // Direct access if needed, but prefer helpers
    updateSection,
    updateExperience,
    addExperience,
    removeExperience,
    updateEducation: setEducation, // Deprecated alias if needed or just use setEducation
    updateSkills: setSkills, // Deprecated alias if needed or just use setSkills
    setEducation,
    setSkills,
    addEducation,
    removeEducation,
    updateEducationItem,
    resetResume,
    saveResume,
    hasUnsavedChanges,
    // Languages
    addLanguage,
    updateLanguage,
    removeLanguage,
    // Certificates
    addCertificate,
    updateCertificate,
    removeCertificate,
    // References
    addReference,
    updateReference,
    removeReference,
    addInternship,
    updateInternship,
    removeInternship,
    updateSectionOrder,
    setPendingPhoto,
    setPendingSignature,
  };

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
};

ResumeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
