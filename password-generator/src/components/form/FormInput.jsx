import PropTypes from "prop-types";

const FormInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <div className="flex items-center justify-between space-x-5">
      <label
        htmlFor="passwordlength"
        className="text-white text-lg font-semibold"
      >
        {label} :{" "}
      </label>
      <input
        autoFocus
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        min={0}
        value={value}
        onChange={handleChange}
        className="px-3 py-1 w-20 outline-none rounded [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        required
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func,
};

export default FormInput;
