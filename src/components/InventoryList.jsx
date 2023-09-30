import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import NavbarUser from "./Navbar";

const InventoryList = () => {
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

  const [items, setItems] = useState([
    { id: 1, name: "Item 1", quantity: 5 },
    { id: 2, name: "Item 2", quantity: 10 },
    // Add more items as needed
  ]);

  const handleAdjustQuantity = (id, increment) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + increment) }
          : item
      )
    );
  };

  return (
    <>
      <NavbarUser userEmail={data.email} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Adjust Quantity</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() => handleAdjustQuantity(item.id, 1)}
                >
                  +
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleAdjustQuantity(item.id, -1)}
                >
                  -
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InventoryList;
