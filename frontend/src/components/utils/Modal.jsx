import { useNavigate } from "react-router-dom";
import BsModal from "react-bootstrap/Modal";
import PropTypes from "prop-types";

function Modal({ size, title, children }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <BsModal size={size} centered show onHide={handleClose}>
      <BsModal.Header closeButton>
        <BsModal.Title>
          <div className="d-flex align-items-center justify-content-between">
            <div className="h4 fw-bold mb-0">{title || "Your Title Here"}</div>
          </div>
        </BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>{children}</BsModal.Body>
    </BsModal>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  size: PropTypes.string,
};

Modal.defaultProps = {
  size: "sm",
};

export default Modal;
