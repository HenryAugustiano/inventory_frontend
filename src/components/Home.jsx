import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const Home = () => {

  const cookies = new Cookies();
  const token = cookies.get("token");

  //call the api
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/info`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setData(result.data);
    };
    fetchData();
  }, [token]);

  return (
    <div>
      <h1>Home</h1>
      <p>Home page content</p>
      <p>Your token is: {token}</p>
      your data is {JSON.stringify(data)}
    </div>
  );
};

export default Home;
