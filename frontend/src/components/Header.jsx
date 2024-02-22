import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../images/logo.jpg";
import { logout, reset } from "../app/features/auth/auth.slice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar
      bg="dark"
      className="shadow"
      style={{ zIndex: 100, position: "relative" }}
      variant="dark"
      expand="lg"
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} width="300px" alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as="span" className="d-flex align-items-center">
              Welcome, {user.name}
            </Nav.Link>
            {user ? (
              <Nav.Link>
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaSignInAlt /> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
