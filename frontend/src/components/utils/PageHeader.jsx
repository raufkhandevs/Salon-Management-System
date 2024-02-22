import PropTypes from "prop-types";

function PageHeader({ title }) {
  return (
    <div className="card shadow border-0 rounded-0 px-2 px-md-4 px-lg-5">
      <div className="card-body d-flex align-items-center justify-content-between">
        <h1 className="mb-0">{title}</h1>
      </div>
    </div>
  );
}

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default PageHeader;
