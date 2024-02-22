import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSpring, animated, easings } from "react-spring";
import Logo from "../images/logo.jpg";
import { login, reset } from "../app/features/auth/auth.slice";
import FullscreenLoader from "../components/utils/FullscreenLoader";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isSuccess, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      password,
    };

    dispatch(login(userData));
  };

  const styles = useSpring({
    loop: false,
    config: {
      easing: easings.easeOutQuad,
      duration: 600,
    },
    delay: 200,
    from: { top: "100%", opacity: 0 },
    to: { top: "0%", opacity: 1 },
  });

  if (isLoading) {
    return <FullscreenLoader />;
  }

  return (
    <div className="login-gradient">
      <div
        style={{ height: "100vh", overflow: "hidden" }}
        className="container d-flex align-items-center justify-content-center"
      >
        <animated.div
          style={{
            position: "relative",
            ...styles,
          }}
        >
          <div
            className="card shadow bg-dark"
            style={{
              minWidth: "500px",
              borderRadius: "1.5rem",
              maxWidth: "100%",
            }}
          >
            <div className="card-body">
              <div className="mb-4 text-center">
                <img src={Logo} width="500px" alt="" />
              </div>

              <section className="form">
                <form onSubmit={onSubmit}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label text-white">
                      Username
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        name="username"
                        value={username}
                        placeholder="Enter your username"
                        onChange={onChange}
                      />
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label text-white">
                      Password
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={onChange}
                      />
                    </label>
                  </div>

                  <div className="mt-4 mb-3 text-end">
                    <button type="submit" className="btn btn-light">
                      Login
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
}

export default Login;
