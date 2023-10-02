import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Table } from 'react-bootstrap';
import '../styles/SearchButton.css'

const NearbyBusiness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [businesses, setBusinesses] = useState([]);
  const [lati, setLati] = useState("");
  const [lngi, setLngi] = useState("");
  const [loading, setLoading] = useState(false);
  // Get User's location to feed into the API
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLati(position.coords.latitude);
          setLngi(position.coords.longitude);
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("You denied the request for Geolocation. Default Location will be in Vancouver.");
          }
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);
  

  const handleSearch = async () => {
    setLoading(true);
    try {
      //https://rapidapi.com/letscrape-6bRBa3QguO5/api/local-business-data
      const options = {
        method: 'GET',
        url: 'https://local-business-data.p.rapidapi.com/search',
        params: {
          query: searchTerm,
          limit: '10',
          lat: lati === "" ? '49.246292' : lati,
          lng: lngi === "" ? '-123.116226' : lngi,
          zoom: '13',
          language: 'en',
          region: 'ca'
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <Col>
      <br />
      <div className="search">
        <input
          placeholder="Search..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {loading ? (
          <div className="banter-loader">
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
            <div className="banter-loader__box"></div>
          </div>
        ) : (
          <button type="submit" onClick={handleSearch}>
            Search
          </button>
        )}
      </div>

      {/* Display the fetched businesses */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business, index) => (
            <tr key={index}>
              <td>{business.name}</td>
              <td>
                {business.website ? (
                  <a href={business.website} target="_blank" rel="noreferrer">
                    [CLICK ME]
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

export default NearbyBusiness;
