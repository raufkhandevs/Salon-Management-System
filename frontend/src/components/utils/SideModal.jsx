import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { useRef } from "react";
import PropTypes from "prop-types";
import useOutsideClickListener from "../../hooks/useOutsideClickListener";

function SideModal({ title, children }) {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  const modal = useRef(null);

  useOutsideClickListener(modal, handleClose);

  return (
    <div className="side-modal">
      <div className="card border-0 rounded-0 overflow-auto" ref={modal}>
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <div className="h4 fw-bold mb-0">{title || "Your Title Here"}</div>
            <button
              type="button"
              className="btn btn-text"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <hr />
          {children}
        </div>
      </div>
    </div>
  );
}

SideModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SideModal;
