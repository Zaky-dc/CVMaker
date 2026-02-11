import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLanguage } from "../../context/LanguageContext";

const MonthPicker = ({ label, name, value, onChange, disabled = false }) => {
    const { t } = useLanguage();
    const [isPresent, setIsPresent] = useState(false);
    const [dateValue, setDateValue] = useState("");

    // Parse initial value
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
        if (onChange) {
            onChange({ target: { name, value: newValue } });
        }
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsPresent(checked);
        if (checked) {
            // If checked, value becomes specific string for "Present"
            // We'll trust the parent to handle localization of "Present" if needed, 
            // or we send a constant and translation happens at display time.
            // ideally we store "Present" and translate it in the view.
            onChange({ target: { name, value: "Present" } });
        } else {
            // Restore last date or empty
            onChange({ target: { name, value: dateValue } });
        }
    };

    return (
        <div className="w-full">
            <label className="block mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                {label}
            </label>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="relative flex-1 min-w-[140px]">
                    <input
                        type="month"
                        name={name}
                        id={name}
                        value={dateValue}
                        onChange={handleDateChange}
                        disabled={disabled || isPresent}
                        className="block py-2 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    />
                </div>
                <div className="flex items-center group cursor-pointer">
                    <div className="relative flex items-center">
                        <input
                            id={`${name}-present`}
                            type="checkbox"
                            checked={isPresent}
                            onChange={handleCheckboxChange}
                            disabled={disabled}
                            className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer transition-transform group-hover:scale-110"
                        />
                    </div>
                    <label
                        htmlFor={`${name}-present`}
                        className="ms-2 text-xs font-medium text-gray-600 dark:text-gray-400 group-hover:text-primary transition-colors cursor-pointer select-none"
                    >
                        {t.present || "Present"}
                    </label>
                </div>
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
