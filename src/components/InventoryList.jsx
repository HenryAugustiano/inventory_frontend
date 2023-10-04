import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import NavbarUser from "./Navbar";
import InventoryTable from './InventoryTable';
import AddItemModal from './modals/AddItemModa';
import InfoItemModal from './modals/InfoItemModal';
import EditItemModal from './modals/EditItemModal';

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

  //Edit Item Modal
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShowEditModal = (item) => {
    setSelectedItem(item);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedItem(null);
    setShowEditModal(false);
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

  const handleDeleteItem = async (itemName) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (!confirmDelete) {
        return;
      }
      setLoading(true);
      const result = await axios.delete(`${process.env.REACT_APP_API_URL}/inventory/deleteInventory?itemName=${itemName}`, {
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

  const handleEditItem = async (updatedItem) => {
    try {
      setLoading(true);
      const result = await axios.put(`${process.env.REACT_APP_API_URL}/inventory/updateInventory`, updatedItem, {
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
      <InventoryTable inventoryData={inventoryData} handleDeleteItem={handleDeleteItem} handleShowInfoModal={handleShowInfoModal} handleShowEditModal={handleShowEditModal} />
      {/* Modals */}
      <AddItemModal showModal={showModal} handleClose={handleClose} handleAddItem={handleAddItem} />
      <InfoItemModal showModal={showInfoModal} handleClose={handleCloseInfoModal} item={selectedItem} inventoryTransactions={inventoryTransactions} />
      <EditItemModal showModal={showEditModal} handleClose={handleCloseEditModal} item={selectedItem} handleEditItem={handleEditItem} />
    </>
  );
};

export default InventoryList;
