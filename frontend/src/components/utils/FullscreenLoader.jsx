import Spinner from "react-bootstrap/Spinner";

function FullscreenLoader() {
  return (
    <div
      className="vh-100 align-items-center d-flex justify-content-center"
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100000,
      }}
    >
      <Spinner animation="grow" style={{ width: "75px", height: "75px" }} />
    </div>
  );
}

export default FullscreenLoader;
