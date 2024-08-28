import { useState } from "react";
import { signUp } from "../sevices/auth";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";

function Signuppage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await signUp(
        formData.username,
        formData.email,
        formData.password
      );

      navigate("/");
      console.log(user);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h2 className="py-3 text-center">
              <b>Create New Account</b>
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                className="form-control py-3"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="form-control py-3"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                className="form-control py-3"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {error && <p className="text-danger">{error}</p>}
              <div className="d-grid">
                <button
                  type="submit"
                  className="py-3 btn btn-outline-secondary btn-block fw-bold"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signuppage;
