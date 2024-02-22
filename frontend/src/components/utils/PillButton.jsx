import PropTypes from "prop-types";

function PillButton({ text, icon }) {
  return (
    <div className="btn btn-outline-primary rounded-pill">
      <span className="me-2">{icon}</span>
      {text}
    </div>
  );
}

PillButton.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default PillButton;
