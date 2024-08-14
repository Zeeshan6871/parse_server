import { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";
import { signUp } from "../sevices/auth";

function Signuppage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainNavbar />
      <Container className="d-flex justify-content-center align-items-center m-5">
        <Card className="shadow-lg ms-5">
          <Card.Body className="p-5">
            <h1 className="text-center mb-4">Sign Up</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}

export default Signuppage;
