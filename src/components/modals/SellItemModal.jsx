import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SellItemModal = ({ showModal, handleClose, handleSellItem, item }) => {
  const [itemQuantity, setItemQuantity] = useState('');

  const handleSell = async () => {
    // Validate that itemQuantity is a positive integer
    const quantityInt = parseInt(itemQuantity, 10);
    if (isNaN(quantityInt) || quantityInt <= 0) {
      alert('Please enter a valid positive integer for item quantity.');
      return;
    }

    // Call the handleSellItem function with the API call
    handleSellItem(item.itemName, quantityInt);

    // Reset the form and close the modal
    setItemQuantity('');
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sell Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="itemQuantity">
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              type="text"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSell}>
          Sell Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SellItemModal;
