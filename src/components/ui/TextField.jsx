import PropTypes from "prop-types";

const TextField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder = " ",
    className = "",
}) => {
    return (
        <div className={`float-field ${className}`}>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
            />
            <label htmlFor={name}>{label}</label>
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
