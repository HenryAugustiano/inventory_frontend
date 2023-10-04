import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import NavbarUser from "./Navbar";
import AddItemModal from './modals/AddItemModa';
import InfoItemModal from './modals/InfoItemModal';

const InventoryList = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  //Add Item Modal
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  //Info Item Modal
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowInfoModal = (item) => {
    setSelectedItem(item);
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setSelectedItem(null);
    setShowInfoModal(false);
  };

  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  const handleAddItem = async (newItem) => {
    try {
      setLoading(true);
      const result = await axios.post(`${process.env.REACT_APP_API_URL}/inventory/addInventory`, newItem, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      setLoading(false);
      setReload(!reload);
    } catch (error) {
      setLoading(false);
      console.log('An error occured', error);
    }
  };

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
  }, [token, reload]); //re-run the effect if the tsoken changes


  return (
    <>
      <NavbarUser userEmail={data.email} />
      <br/>
      <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={handleShow}>
            Add Item
          </Button>
        </div>
      </div>
      <br/>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData ? (
            inventoryData.map((item) => (
              <tr key={item.itemName}>
                <td>{item.itemName}</td>
                <td>{item.itemQuantity}</td>
                <td>{item.itemPrice}</td>
                <td>
                  <Button variant="info" onClick={() => handleShowInfoModal(item)}>Info</Button>
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

      <AddItemModal showModal={showModal} handleClose={handleClose} handleAddItem={handleAddItem} />
      <InfoItemModal showModal={showInfoModal} handleClose={handleCloseInfoModal} item={selectedItem} inventoryTransactions={inventoryTransactions} />
    </>
  );
};

export default InventoryList;
