import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import NavbarUser from './Navbar';
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import InventoryChart from "./InventoryChart";
import NearbyBusiness from './NearbyBusiness';


const Home = () => {

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

  return (
    <div>
      <NavbarUser userEmail={data.email} />
      <br/>
      <Row>
        <Col>
          <h2 style={{textAlign: 'center'}}>Inventory Trends</h2>
          <InventoryChart />
        </Col>
        <Col>
          <h2 style={{textAlign: 'center'}}>Find Nearby Buyer </h2>
            <NearbyBusiness />
        </Col>
      </Row>

    </div>
  );
};

export default Home;
