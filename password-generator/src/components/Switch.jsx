import PropTypes from "prop-types";

const Switch = ({ label, checked, onChange }) => {
  const toggleChecked = () => {
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <div className="flex items-center justify-between space-x-5">
      <h1 className="text-white text-lg font-semibold">{label}</h1>
      <label className="relative inline-flex items-center cursor-pointer text-white">
        <input
          checked={checked}
          type="checkbox"
          defaultValue=""
          className="sr-only peer"
          onChange={toggleChecked}
        />
        <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-7  shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-0.5 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95"></div>
      </label>
    </div>
  );
};

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
};

export default Switch;
