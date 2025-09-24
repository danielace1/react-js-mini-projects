import { FiAlertTriangle } from "react-icons/fi";
import PropTypes from "prop-types";

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-3 text-red-100 bg-red-500/80 backdrop-blur-md border border-red-300 rounded-xl px-4 py-3 mt-6 shadow-lg animate-pulse">
      <FiAlertTriangle size={22} />
      <span className="font-medium">{message}</span>
    </div>
  );
}
