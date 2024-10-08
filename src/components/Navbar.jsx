import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import Parse from "parse";
import { logOut } from "../sevices/auth";

function MainNavbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      setUsername(user.get("username"));
    }
  }, []);

  // console.log(username);

  const handleLogout = async () => {
    try {
      await logOut();
      setUsername("");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container>
        <Navbar.Brand className="d-flex align-items-center gap-4">
          {" "}
          <img
            className="cursor-pointer"
            src="https://test.mintix.no/static/media/logo.ae7f1a1fda88fa9b502e6ae0ca936313.svg"
            alt="logo"
            onClick={() => navigate("/")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div
            className=" fs-5 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            What is Mintix
          </div>
          <Nav className="ms-auto fw-bold fs-5 color-primary">
            {username ? (
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/mytickets")}>
                  My tickets
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                {/*
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            ) : (
              <Nav.Link
                className="cursor-pointer fs-5 fw-normal"
                onClick={() => navigate("/login")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
