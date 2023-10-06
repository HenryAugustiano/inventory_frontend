import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import NavbarUser from './Navbar';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Profile = () => {

  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");

  //call the api
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/info`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setData(result.data);
      } catch (error) {
        navigate("/"); //redirect to landing page
      }
    };
    fetchData();
  }, [token]); //re-run the effect if the token changes

  const email = data.email;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChangePassword = async (e) => {
    try {
      let isValid = true;
      e.preventDefault();
      if(oldPassword.trim() === "" || newPassword.trim() === "") {
        alert("Please fill in all fields");
        isValid = false;
      }
      if(oldPassword === newPassword) {
        alert("New password cannot be the same as old password");
        isValid = false;
      }

      
      if(!isValid) {
        return;
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/users/changePassword`,
        {
          email: email,
          password: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setErrorMessage("");

    } catch (error) {
      console.error("An error occurred:", error);
      if(error.response.status === 401) {
        setErrorMessage("Invalid old password");
      }else{
        setErrorMessage("An error occurred");
      }

    } finally {
      setOldPassword('');
      setNewPassword('');
    }
  };

  return (
    <>
      <NavbarUser userEmail={data.email}/>
      <Container className="mt-5">
        <Card style={{ width: '18rem', margin: 'auto' }}>
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            {/* display error */}
            <Card.Subtitle className="mb-2 text-muted">{errorMessage? <span style={{color: 'red'}}>{errorMessage}</span> : null}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">Email: {data.email}</Card.Subtitle>
            <br/>
            <Form>
              <Form.Group className="mb-3" controlId="oldPassword">
                <Form.Label>Old Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="newPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              {success ? (
                <p style={{ color: 'green' }}>Password changed successfully!</p>
              ) : (
                <Button variant="primary" onClick={handleChangePassword} disabled={success}>
                  {success ? 'Success' : 'Change Password'}
                </Button>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Profile;
