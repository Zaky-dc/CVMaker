import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";

const MonthPicker = ({ label, name, value, onChange, disabled = false }) => {
    const { t } = useLanguage();
    const [isPresent, setIsPresent] = useState(false);
    const [dateValue, setDateValue] = useState("");

    useEffect(() => {
        if (value === "Present" || value === "Atualmente") {
            setIsPresent(true);
            setDateValue("");
        } else {
            setIsPresent(false);
            setDateValue(value || "");
        }
    }, [value]);

    const handleDateChange = (e) => {
        const newValue = e.target.value;
        setDateValue(newValue);
        if (onChange) onChange({ target: { name, value: newValue } });
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsPresent(checked);
        onChange({ target: { name, value: checked ? "Present" : dateValue } });
    };

    return (
        <div className="w-full">
            <label className="block mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {label}
            </label>
            <div className="flex items-center gap-3">
                <input
                    type="month"
                    name={name}
                    id={name}
                    value={dateValue}
                    onChange={handleDateChange}
                    disabled={disabled || isPresent}
                    className="flex-1 px-3 py-2 text-sm text-slate-900 dark:text-white
                     bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600
                     rounded-lg outline-none transition-all duration-200
                     focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10
                     disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <label
                    htmlFor={`${name}-present`}
                    className="flex items-center gap-2 cursor-pointer group select-none"
                >
                    <div className="relative">
                        <input
                            id={`${name}-present`}
                            type="checkbox"
                            checked={isPresent}
                            onChange={handleCheckboxChange}
                            disabled={disabled}
                            className="sr-only"
                        />
                        <div
                            className={`w-8 h-4 rounded-full transition-colors duration-200 ${isPresent ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-700"
                                }`}
                        />
                        <div
                            className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-200 ${isPresent ? "translate-x-4" : "translate-x-0"
                                }`}
                        />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                        {t.present || "Present"}
                    </span>
                </label>
            </div>
        </div>
    );
};

MonthPicker.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default MonthPicker;
