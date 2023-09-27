import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const Home = () => {

  const cookies = new Cookies();
  const token = cookies.get("token");

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <p>Your token is: {token}</p>
    </div>
  );
};

export default Home;
