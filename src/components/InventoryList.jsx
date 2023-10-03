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
  const [inventoryData, setInventoryData] = useState([]);
  const [inventoryTransactions, setInventoryTransactions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${process.env.REACT_APP_API_URL}/users/info`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        const inventoryresult = await axios.get(`${process.env.REACT_APP_API_URL}/inventory/getInventory`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        setData(result.data);
        setInventoryData(inventoryresult.data.inventory.items);
        setInventoryTransactions(inventoryresult.data.inventory.inventoryTransactions);
      } catch (error) {
        navigate("/"); //redirect to landing page
      }
    };
    fetchData();
  }, [token]); //re-run the effect if the tsoken changes


  return (
    <>
      <NavbarUser userEmail={data.email} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData ? (
            inventoryData.map((item) => (
              <tr key={item.itemName}>
                <td>{item.itemName}</td>
                <td>{item.itemQuantity}</td>
                <td>
                  <Button onClick={() => console.log(item)}>Info</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Loading...</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default InventoryList;
