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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand className="cursor-pointer" onClick={() => navigate("/")}>
          {" "}
          <img
            src="https://test.mintix.no/static/media/logo.ae7f1a1fda88fa9b502e6ae0ca936313.svg"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {username ? (
              <NavDropdown title={username} id="basic-nav-dropdown">
                {/* <NavDropdown.Item href="#action/3.1">
                  My tickets
                </NavDropdown.Item> */}
                {/* <NavDropdown.Item href="#action/3.2">Profile</NavDropdown.Item> */}
                <NavDropdown.Item href="#action/3.3" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item> */}
              </NavDropdown>
            ) : (
              <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
