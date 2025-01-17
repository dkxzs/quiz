import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import btnLoginBg from "../../../assets/qizzz.png";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner } from "react-icons/im";
import "./Login.scss";

import { login } from "../../../services/apiServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { actionLogin } from "../../../redux/actions/userAction";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const validateEmail = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email) {
      toast.error("Please enter your email");
      return false;
    }
    if (!reg.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      toast.error("Please enter your password");
      return false;
    }

    if (password.trim().length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const validate = () => {
    if (!validateEmail() || !validatePassword()) {
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    let data = await login(email, password);
    if (data && data.EC === 0) {
      dispatch(actionLogin(data));
      toast.success(data.EM);
      setLoading(false);
      navigate("/");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="d-flex vh-100">
      {/* Left side */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center p-4 p-lg-5">
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <div className="mb-4">
            <h1 className="h3 fw-bold">WELCOME BACK</h1>
            <p className="text-muted">
              Welcome back! Please enter your details.
            </p>
          </div>

          <form className="mb-4">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-decoration-none text-primary">
                Forgot password
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-Login text-white w-100 mb-3"
              onClick={(e) => {
                handleLogin(e);
              }}
              disabled={loading}
            >
              {loading ? (
                <ImSpinner className="me-2 spinIcon" />
              ) : (
                <span>Sign in</span>
              )}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary w-100"
              disabled={loading}
            >
              {/* <img
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="me-2"
              /> */}
              Sign in with Google
            </button>
          </form>

          <p className="text-center text-muted">
            Don't have an account?{" "}
            <Link to="/register" className="text-danger text-decoration-none">
              Sign up for free!
            </Link>
          </p>
          <div
            className="text-center cursor-pointer text-primary fw-bold fs-5"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Go to home
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="d-none d-lg-flex flex-grow-1 bg-light position-relative overflow-hidden">
        {/* <div
          className="position-absolute w-100 h-100"
          style={{
            backgroundImage: "url('/splash.svg')",
            opacity: 0.5,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <img
          src={btnLoginBg}
          alt=""
          className="position-absolute top-50 start-50 translate-middle w-100 h-100 object-fit-cover"
        />
      </div>
    </div>
  );
}
