import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const InfoItemModal = ({ showModal, handleClose, item, inventoryTransactions }) => {
  if (!item) {
    return null;
  }

  const getQuantityItemSoldThisMonth = () => {
    console.log(inventoryTransactions);
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
  
    const transaction = inventoryTransactions.find(
      (trans) => trans.month === currMonth && trans.year === currYear
    );
    
    console.log(transaction);

    if (transaction) {
      const soldItem = transaction.soldItems.find((soldItem) => soldItem.itemName === item.itemName);
      return soldItem ? soldItem.quantitySold : 0;
    }
  
    return 0;
  };
  
  


  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Item Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Item Name:</strong> {item.itemName}</p>
        <p><strong>Quantity:</strong> {item.itemQuantity}</p>
        <p><strong>Price:</strong> {item.itemPrice}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Quantity Sold This Month:</strong> {getQuantityItemSoldThisMonth()}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoItemModal;
