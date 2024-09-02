import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";
import { login } from "../sevices/auth";
import Parse from "parse";

function Loginpage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (Parse.User.current()) {
      return navigate("/");
    }
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);

    try {
      const user = await login(username, password);
      user ? navigate("/") : alert("Invalid username or password");
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

      <div className="container py-5 my-5">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <h2 className="py-3 text-center">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
              <div id="myusername" className="position-relative">
                <input
                  type="text"
                  id="username"
                  className="form-control py-3 mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div id="mypassword" className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="form-control py-3 my-3"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="position-absolute top-0 end-0 p-3"
                  id="eye2"
                  style={{ cursor: "pointer" }}
                  onClick={togglePasswordVisibility}
                >
                  <i className={`bi bi-eye${showPassword ? "" : "-slash"}`}></i>
                </span>
              </div>
              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-outline-secondary btn-block py-3 fw-bold"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row py-3">
          <div className="offset-md-4 col-md-4 text-center fs-5">
            <p className="p-0 m-0">---------------- OR ---------------- </p>
          </div>
        </div>
        <div className="row py-3">
          <div className="offset-md-4 col-md-4 text-center fs-5">
            <div>
              <button
                type="button"
                style={{
                  display: "block",
                  border: "0px",
                  borderRadius: "3px",
                  boxShadow: "rgba(0, 0, 0, 0.5) 0px 1px 2px",
                  color: "rgb(255, 255, 255)",
                  cursor: "pointer",
                  fontSize: "19px",
                  margin: "5px",
                  width: "calc(100% - 10px)",
                  overflow: "hidden",
                  padding: "0px 10px",
                  userSelect: "none",
                  height: "50px",
                  background: "rgb(59, 89, 152)",
                }}
              >
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      minWidth: "26px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26px"
                      height="26px"
                      viewBox="0 0 90 90"
                    >
                      <g>
                        <path
                          d="M90,15.001C90,7.119,82.884,0,75,0H15C7.116,0,0,7.119,0,15.001v59.998C0,82.881,7.116,90,15.001,90H45V56H34V41h11v-5.844C45,25.077,52.568,16,61.875,16H74v15H61.875C60.548,31,59,32.611,59,35.024V41h15v15H59v34h16c7.884,0,15-7.119,15-15.001V15.001z"
                          fill="#FFFFFF"
                        ></path>
                      </g>
                    </svg>
                  </div>
                  <div style={{ width: "10px" }}></div>
                  <div style={{ textAlign: "left", width: "100%" }}>
                    Log in with Facebook
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="row py-3 my-3">
          <div className="offset-md-4 col-md-4 text-center fs-5">
            <a className="text-reset cursor-pointer" onClick={handleRegister}>
              Create An Account
            </a>
            <a className="px-3 text-reset" href="">
              Forget Password
            </a>
          </div>
        </div>
        <div className="row py-3"></div>
      </div>

      <Footer />
    </>
  );
}

export default Loginpage;
