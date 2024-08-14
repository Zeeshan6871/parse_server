import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../sevices/auth";
import MainNavbar from "../components/Navbar";
import Footer from "../components/Footer";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const user = await login(username, password);
      console.log(user);
      return navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  return (
    <>
      <MainNavbar />
      <div className="d-flex justify-content-center align-items-center m-5">
        <div className="card p-4 shadow col-lg-4 col-md-6 col-sm-8">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
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
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleRegister}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Loginpage;
