import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import btnLoginBg from "../../../assets/qizzz.png";
import { useNavigate, Link } from "react-router-dom";

import "./Register.scss";

import { register } from "../../../services/apiServices";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  const validateUsername = () => {
    if (!username) {
      toast.error("Please enter your username");
      return false;
    }
    if (username.trim().length <= 2) {
      toast.error("Username must be at least 3 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.error(
        "Username can only contain letters, numbers, and underscores"
      );
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (!password) {
      toast.error("Please enter your password");
      return false;
    }

    if (password.trim().length <= 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const validate = () => {
    if (!validateEmail() || !validateUsername() || !validatePassword()) {
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    let data = await register(email, password, username);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
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
              <label htmlFor="email" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
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
              />
            </div>

            <button
              type="submit"
              className="btn btn-Login text-white w-100 mb-3"
              onClick={(e) => {
                handleRegister(e);
              }}
            >
              Sign up
            </button>

            <button type="button" className="btn btn-outline-secondary w-100">
              {/* <img
                src="/google.svg"
                alt="Google"
                width={20}
                height={20}
                className="me-2"
              /> */}
              Sign up with Google
            </button>
          </form>

          <p className="text-center text-muted">
            Already have an account?{" "}
            <Link to="/login" className="text-danger text-decoration-none">
              Sign in now
            </Link>
          </p>
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
};

export default Register;
