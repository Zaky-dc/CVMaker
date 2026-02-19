import { useState, useEffect, useRef } from "react";
import Preview from "./preview/Preview";
import Editor from "./editor/Editor";
import { usePDFGenerator } from "../hooks/usePDFGenerator";
import {
  Moon,
  Sun,
  Download,
  LogIn,
  LogOut,
  User as UserIcon,
  Save,
  ArrowLeft,
  FileText,
  Shield,
  ZoomIn,
  ZoomOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { useResume } from "../context/ResumeContext";
import { pdfTranslations } from "../utils/pdfTranslations";
import { useNavigate } from "react-router-dom";

// ─── Nav Rail Button ────────────────────────────────────────────────────────
const NavBtn = ({ icon: Icon, onClick, label, active = false, danger = false, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={label}
    className={`nav-btn group ${active ? "active" : ""} ${danger ? "hover:!bg-red-500/20 hover:!text-red-400" : ""}`}
  >
    {children || <Icon size={20} />}
    <span className="nav-btn-tooltip">{label}</span>
  </button>
);

// ─── Main Layout ─────────────────────────────────────────────────────────────
const MainLayout = ({ onBack }) => {
  const navigate = useNavigate();
  const { user, loginWithGoogle, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { resetResume, saveResume, hasUnsavedChanges } = useResume();
  const activeTemplateId = useResume().resumeData.metadata.templateId;
  const PdfTemplate = usePDFGenerator(activeTemplateId);
  const { resumeData } = useResume();

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  // Zoom state (50–100)
  const [zoom, setZoom] = useState(75);

  // Resizable editor panel
  const [editorWidth, setEditorWidth] = useState(460);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef(null);

  // Download state
  const [isDownloading, setIsDownloading] = useState(false);

  // Print ref for the preview
  const componentRef = useRef();

  // Dark mode sync
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ── Resize Logic ──
  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    if (!isResizing) return;

    const onMove = (e) => {
      if (!containerRef.current) return;
      const navRailWidth = 72;
      const x = e.clientX - navRailWidth;
      if (x >= 360 && x <= 720) setEditorWidth(x);
    };
    const onUp = () => setIsResizing(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isResizing]);

  // ── Handlers ──
  const handleLogout = async () => {
    resetResume();
    await logout();
  };

  const handleSave = async () => {
    await saveResume();
  };

  const handleDownload = async () => {
    if (!PdfTemplate || isDownloading) return;
    setIsDownloading(true);
    try {
      const { pdf } = await import("@react-pdf/renderer");
      const tPdf = pdfTranslations[language] || pdfTranslations.en;

      // Generate the PDF blob
      const blob = await pdf(<PdfTemplate data={resumeData} t={tPdf} />).toBlob();

      // Open the PDF in a new tab. Chrome on Linux blocks programmatic downloads
      // from blob URLs, but window.open() always works. The user can save from
      // the PDF viewer (Ctrl+S or the viewer's own download button).
      const url = URL.createObjectURL(blob);
      const tab = window.open(url, "_blank");
      if (!tab) {
        // Popup blocked — fall back to location redirect
        window.location.href = url;
      }
      // Revoke after 60s so the tab has time to load the PDF
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (err) {
      console.error("PDF download error:", err);
      alert(`Erro ao gerar o PDF: ${err.message}`);
    } finally {
      setIsDownloading(false);
    }
  };



  return (
    <div
      ref={containerRef}
      className={`flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300 ${isResizing ? "select-none cursor-col-resize" : ""}`}
    >
      {/* ── Nav Rail ─────────────────────────────────────────── */}
      <nav className="flex flex-col items-center flex-shrink-0 w-[72px] h-full bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 border-r border-white/5 shadow-lg z-20 py-4 gap-1 print:hidden">
        {/* Logo */}
        <button
          onClick={onBack}
          className="flex flex-col items-center gap-1 mb-4 group"
          title={t.back}
        >
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <FileText size={20} className="text-indigo-300" />
          </div>
          <span className="text-[9px] text-indigo-400 font-semibold tracking-widest uppercase">cv</span>
        </button>

        <div className="w-8 h-px bg-white/10 mb-2" />

        {/* Save */}
        <NavBtn
          icon={Save}
          onClick={handleSave}
          label={hasUnsavedChanges ? (t.save || "Save") : (t.saved || "Saved")}
          active={hasUnsavedChanges}
        >
          <div className="relative">
            <Save size={20} />
            {hasUnsavedChanges && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-indigo-900 animate-pulse" />
            )}
          </div>
        </NavBtn>

        {/* Download */}
        <NavBtn
          icon={isDownloading ? Loader2 : Download}
          onClick={handleDownload}
          label={t.download || "Download PDF"}
        >
          {isDownloading ? (
            <Loader2 size={20} className="animate-spin text-indigo-300" />
          ) : (
            <Download size={20} />
          )}
        </NavBtn>

        <div className="w-8 h-px bg-white/10 my-1" />

        {/* Language switcher */}
        <div className="flex flex-col items-center gap-0.5 nav-btn group relative">
          <button
            onClick={() => setLanguage("pt")}
            className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${language === "pt" ? "bg-white/20 text-white" : "text-indigo-400 hover:text-white"}`}
          >
            PT
          </button>
          <div className="w-5 h-px bg-white/20" />
          <button
            onClick={() => setLanguage("en")}
            className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${language === "en" ? "bg-white/20 text-white" : "text-indigo-400 hover:text-white"}`}
          >
            EN
          </button>
        </div>

        {/* Dark mode */}
        <NavBtn
          icon={darkMode ? Sun : Moon}
          onClick={() => setDarkMode(!darkMode)}
          label={darkMode ? (t.lightMode || "Light Mode") : (t.darkMode || "Dark Mode")}
        />

        {/* Admin */}
        {user?.role === "admin" && (
          <NavBtn
            icon={Shield}
            onClick={() => navigate("/admin")}
            label="Admin Panel"
          />
        )}

        {/* Spacer */}
        <div className="flex-1" />
        <div className="w-8 h-px bg-white/10 mb-1" />

        {/* User */}
        {user ? (
          <>
            {user.photoURL ? (
              <div className="relative group cursor-default nav-btn">
                <img
                  src={user.photoURL}
                  alt={user.displayName}
                  className="w-9 h-9 rounded-full border-2 border-white/30 object-cover"
                  title={user.displayName}
                />
                <span className="nav-btn-tooltip">{user.displayName}</span>
              </div>
            ) : (
              <NavBtn icon={UserIcon} onClick={() => { }} label={user.displayName || "Profile"} />
            )}
            <NavBtn icon={LogOut} onClick={handleLogout} label={t.logout || "Logout"} danger />
          </>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="flex flex-col items-center gap-1 nav-btn group text-indigo-300 hover:text-white"
            title={t.login || "Sign In"}
          >
            <LogIn size={20} />
            <span className="nav-btn-tooltip">{t.login || "Sign In"}</span>
          </button>
        )}
      </nav>

      {/* ── Editor Panel ─────────────────────────────────────── */}
      <aside
        style={{ width: `${editorWidth}px` }}
        className="flex flex-col h-full flex-shrink-0 border-r border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-[#0f172a] z-10 overflow-hidden print:hidden"
      >
        {/* Editor header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-900 flex-shrink-0">
          <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-300 tracking-wide uppercase">
            {t.editor || "Editor"}
          </h2>
          <div className="text-xs text-slate-400 dark:text-slate-500">
            {hasUnsavedChanges ? (
              <span className="text-amber-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block" />
                {t.unsavedChanges || "Unsaved changes"}
              </span>
            ) : (
              <span className="text-emerald-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                {t.saved || "Saved"}
              </span>
            )}
          </div>
        </div>

        {/* Editor scroll area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <Editor />
        </div>
      </aside>

      {/* ── Resize Handle ────────────────────────────────────── */}
      <div
        onMouseDown={startResizing}
        className={`w-1 flex-shrink-0 h-full cursor-col-resize z-20 group print:hidden
          hover:bg-indigo-400/40 transition-colors duration-150
          ${isResizing ? "bg-indigo-500/50" : "bg-slate-200 dark:bg-slate-700/50"}`}
      />

      {/* ── Preview Panel ─────────────────────────────────────── */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative preview-bg">
        {/* Preview toolbar */}
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-slate-300/60 dark:border-slate-700/60 bg-slate-100/80 dark:bg-slate-900/70 backdrop-blur-sm flex-shrink-0 print:hidden">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Live Preview
          </span>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(45, z - 5))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <ZoomOut size={14} />
            </button>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={45}
                max={100}
                step={5}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-24 h-1 accent-indigo-500 cursor-pointer"
              />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono w-8 text-right">
                {zoom}%
              </span>
            </div>
            <button
              onClick={() => setZoom((z) => Math.min(100, z + 5))}
              className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
            >
              <ZoomIn size={14} />
            </button>
          </div>

        </div>

        {/* Scrollable preview area */}
        <div className="flex-1 overflow-auto flex justify-center items-start py-8 px-4">
          {/* Shadow rig to contain the transformed A4 */}
          <div
            style={{
              width: `${210 * (zoom / 100)}mm`,
              minHeight: `${297 * (zoom / 100)}mm`,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top left",
                width: "210mm",
                minHeight: "297mm",
              }}
            >
              <div className="bg-white text-black shadow-preview" id="preview-wrapper">
                <Preview ref={componentRef} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating download button overlay */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="absolute bottom-6 right-6 flex items-center gap-2.5 px-5 py-3 rounded-2xl
                     bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500
                     text-white font-semibold text-sm shadow-material-3
                     transition-all duration-200 hover:scale-105 hover:shadow-lg
                     disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                     print:hidden"
        >
          {isDownloading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Download size={18} />
          )}
          {isDownloading ? "A gerar PDF..." : (t.download || "Download PDF")}
        </button>
      </main>
    </div>
  );
};

export default MainLayout;
