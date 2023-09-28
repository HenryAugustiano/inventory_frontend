import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../styles/LandingPage.css";
import cloudBg from "../images/cloudBackground.png";

//Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function LandingPage() {
  const navigate = useNavigate();
  //Sign In Modal
  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);
  const [validated, setValidated] = useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  //Sign Up Modal
  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => setShowSignUp(true);
  const [emailSignUp, setEmailSignUp] = React.useState("");
  const [passwordSignUp, setPasswordSignUp] = React.useState("");

  const handleSubmitSignIn = async (e) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);

      if (!validated) {
        return;
      }

      let body = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const cookies = new Cookies();
      cookies.set("token", response.data.token, {
        path: "/",
      });

      // Navigate to home page
      navigate("/home");

      console.log("Login success");
      console.log(response.data);

      setShowSignIn(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("An error occurred:", error);
      setEmail("");
      setPassword("");
    }
  };
  const handleSubmitSignUp = async (e) => {
    try {
      e.preventDefault();
      const form = e.currentTarget;

      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
      setValidated(true);

      if (!validated) {
        return;
      }

      let body = {
        email: emailSignUp,
        password: passwordSignUp,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      console.log("Register success");
      console.log(response.data);

      setShowSignUp(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("An error occurred:", error);
      setEmail("");
      setPassword("");
    }
  };
  return (
    <>
      {/* Sign In Modal */}
      <Modal
        show={showSignIn}
        onHide={handleCloseSignIn}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignIn}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitSignIn}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Sign Up Modal */}
      <Modal
        show={showSignUp}
        onHide={handleCloseSignUp}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={emailSignUp}
                onChange={(e) => setEmailSignUp(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={passwordSignUp}
                onChange={(e) => setPasswordSignUp(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignUp}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitSignUp}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        className="flex-container"
        style={{
          backgroundImage: `url(${cloudBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="card">
          <h1 className="title">Welcome to Cloud Inventory</h1>
          <p className="subtitle">Your professional inventory storage.</p>
          <div className="buttons-container">
            <button
              className="sign-in-button"
              onClick={() => handleShowSignIn()}
            >
              Sign In
            </button>
            <button 
              className="create-account-button"
              onClick={() => handleShowSignUp()}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
