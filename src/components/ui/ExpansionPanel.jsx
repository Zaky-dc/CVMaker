import PropTypes from "prop-types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import clsx from "clsx";

const ExpansionPanel = ({ title, children, defaultExpanded = false, icon: Icon }) => {
    const [expanded, setExpanded] = useState(defaultExpanded);

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg mb-4 overflow-hidden shadow-sm dark:bg-surface-dark transition-all duration-300">
            <button
                type="button"
                className={clsx(
                    "w-full flex items-center justify-between p-4 bg-white dark:bg-[#1e1e1e] hover:bg-gray-50 dark:hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20",
                    expanded && "border-b border-gray-100 dark:border-gray-700"
                )}
                onClick={() => setExpanded(!expanded)}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="text-primary dark:text-primary-light" size={20} />}
                    <span className="font-medium text-gray-800 dark:text-gray-200">{title}</span>
                </div>
                {expanded ? (
                    <ChevronUp size={20} className="text-gray-500" />
                ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                )}
            </button>

            <div
                className={clsx(
                    "bg-white dark:bg-[#1e1e1e] transition-all duration-300 ease-in-out overflow-hidden",
                    expanded ? "max-h-[1000px] opacity-100 p-4" : "max-h-0 opacity-0 p-0"
                )}
            >
                {children}
            </div>
        </div>
    );
};

ExpansionPanel.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    defaultExpanded: PropTypes.bool,
    icon: PropTypes.elementType,
};

export default ExpansionPanel;
