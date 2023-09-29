import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../styles/Navbar.css'

const NavbarUser = ({ userEmail }) => {
  const navigate = useNavigate();

  //Buttons handler
  const handleHome = () => {
    navigate("/home");
  };
  const handleInventory = () => {
    navigate("/inventory");
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  const cookies = new Cookies();
  const handleSignOut = () => {
    cookies.remove("token");
    navigate("/");
  };

  //Sign Out Modal
  const [showSignOut, setShowSignOut] = useState(false);
  const handleCloseSignOut = () => setShowSignOut(false);
  const handleShowSignOut = () => setShowSignOut(true);


  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link onClick={handleHome}>Home</Nav.Link>
              <Nav.Link onClick={handleInventory}>Inventory</Nav.Link>
              <Nav.Link onClick={handleProfile}>Profile</Nav.Link>
            </Nav>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#" onClick={handleShowSignOut}>{userEmail}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Sign Out Modal */}
      <Modal show={showSignOut} onHide={handleCloseSignOut} centered>
        <Modal.Header closeButton>
          <Modal.Title className="modalSignOut">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignOut}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarUser;