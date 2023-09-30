import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const NearbyBusiness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);

  const handleSearch = async () => {
    try {
      //https://rapidapi.com/letscrape-6bRBa3QguO5/api/local-business-data
      const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: searchTerm,
          limit: '10',
          lat: '37.359428',
          lng: '-121.925337',
          zoom: '13',
          language: 'en',
          region: 'us'
        },
        headers: {
          'X-RapidAPI-Key': 'a9ec82c9c8msh5467573c918f7c5p14f631jsn14069d60db4d',
          'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
        }
      };
      
      const response = await axios.request(options);
      // Extract only the business name and website from the response
      const extractedBusinesses = response.data.data.map(business => ({
        name: business.name,
        website: business.website
      }));
      setBusinesses(extractedBusinesses);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Col>
      <br />
      <Form className="d-flex align-items-center">
        <Form.Group controlId="searchTerm" className="mb-0 me-2">
          <Form.Label className="visually-hidden">Search for businesses:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search businesses"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="outline-success" onClick={handleSearch}>
          Search
        </Button>
      </Form>


      {/* Display the fetched businesses */}
      <ul>
        {businesses.map((business, index) => (
          <li key={index}>
            <strong>{business.name}</strong> - Website: {business.website}
          </li>
        ))}
      </ul>
    </Col>
  );
};

export default NearbyBusiness;
