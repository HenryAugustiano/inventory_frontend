import React from "react";
import error404img from "../images/error404.png";
import { useNavigate } from "react-router-dom";
import "../styles/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-container">
      <img src={error404img} alt="404 Not Found" className="not-found-image" />
      <h1>Oops! You got us...</h1>
      <p>It seems like the page you are looking for does not exist.</p>
      <button 
        className="home-button"
        onClick={() => {
          navigate("/home");
        }}
      >
        Take Me Home
      </button>
    </div>
  );
};

export default NotFound;
