import PropTypes from "prop-types";
import clsx from "clsx";

const TextField = ({ label, name, value, onChange, type = "text", className }) => {
    return (
        <div className={clsx("relative z-0 w-full mb-4 group", className)}>
            <input
                type={type}
                name={name}
                id={name}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
                placeholder=" "
                value={value}
                onChange={onChange}
                required
            />
            <label
                htmlFor={name}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary-light peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>
        </div>
    );
};

TextField.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
};

export default TextField;
