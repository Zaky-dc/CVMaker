import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

const ExpansionPanel = ({
    title,
    children,
    defaultExpanded = false,
    icon: Icon,
    badge = null, // optional badge count/status
}) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div
            className={clsx(
                "rounded-xl border overflow-hidden transition-all duration-200",
                expanded
                    ? "border-indigo-200 dark:border-indigo-800/60 shadow-material-1"
                    : "border-slate-200 dark:border-slate-700 shadow-sm"
            )}
        >
            {/* Header */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className={clsx(
                    "w-full flex items-center justify-between px-4 py-3.5",
                    "bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/60",
                    "focus:outline-none transition-colors duration-150",
                    expanded && "border-b border-slate-100 dark:border-slate-700"
                )}
            >
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div
                            className={clsx(
                                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                                expanded
                                    ? "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                                    : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400"
                            )}
                        >
                            <Icon size={16} />
                        </div>
                    )}
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 select-none">
                        {title}
                    </span>
                    {badge !== null && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400">
                            {badge}
                        </span>
                    )}
                </div>

                <ChevronDown
                    size={16}
                    className={clsx(
                        "text-slate-400 transition-transform duration-300 flex-shrink-0",
                        expanded && "rotate-180"
                    )}
                />
            </button>

            {/* Content — smooth grid-rows animation */}
            <div
                className={clsx(
                    "grid transition-all duration-300 ease-in-out",
                    expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
            >
                <div className="overflow-hidden">
                    <div className="bg-white dark:bg-slate-800 p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

ExpansionPanel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool,
    icon: PropTypes.elementType,
    badge: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ExpansionPanel;
