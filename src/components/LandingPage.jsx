import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "../styles/LandingPage.css";
import bg from "../images/bg.jpg";

//Bootstrap
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';

function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  //Sign In Modal
  const [showSignIn, setShowSignIn] = useState(false);
  const handleCloseSignIn = () => {
    setShowSignIn(false);
    setEmail("");
    setPassword("");
    setSignInResponse("");
  }
  const handleShowSignIn = () => setShowSignIn(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [signInResponse, setSignInResponse] = React.useState("");

  //Sign Up Modal
  const [showSignUp, setShowSignUp] = useState(false);
  const handleCloseSignUp = () => {
    setShowSignUp(false);
    setEmailSignUp("");
    setPasswordSignUp("");
    setSignUpResponse("");
  }
  const handleShowSignUp = () => setShowSignUp(true);
  const [emailSignUp, setEmailSignUp] = React.useState("");
  const [passwordSignUp, setPasswordSignUp] = React.useState("");
  const [signUpResponse, setSignUpResponse] = React.useState("");

  const handleSubmitSignIn = async (e) => {
    try {
      //reset error message
      setSignInResponse("");
      
      e.preventDefault();
      let validated = true;

      if(email === "" || password === ""){
        validated = false;
      };

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
      setSignInResponse("Invalid email or password");
      setEmail("");
      setPassword("");
    }
  };
  const handleSubmitSignUp = async (e) => {
    try {
      //reset error message
      setSignUpResponse("");
      
      e.preventDefault();
      let validated = true;
      if(emailSignUp === "" || passwordSignUp === ""){
        validated = false;
      };

      if (!validated) {
        return;
      }

      let body = {
        email: emailSignUp,
        password: passwordSignUp,
      };

      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);
      setSuccess(true);

      console.log("Register success");
      console.log(response.data);

      //Delay the modal closing to show success checkmark
      setTimeout(() => {
        setShowSignUp(false);
        setEmailSignUp("");
        setPasswordSignUp("");
        setSuccess(false);
      }, 3000);

    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      setSignUpResponse(error.response.data.message || "An error occurred");
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
          <Modal.Title style={{ color: signInResponse ? 'red' : 'black' }}>
            {signInResponse === "" ? "Sign In" : signInResponse}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          <Modal.Title style={{ color: signUpResponse ? 'red' : 'black' }}>
            {signUpResponse === "" ? "Sign Up" : signUpResponse}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : success ? (
            <span style={{ color: 'green'}}>success ✓</span>
          ) : (
            <Button variant="secondary" onClick={handleCloseSignUp}>
              Close
            </Button>
          )}
          {!success && !loading && (
            <Button variant="primary" onClick={handleSubmitSignUp}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {/* Landing Page */}
      <div
        className="flex-container"
        style={{
          backgroundImage: `url(${bg})`,
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
