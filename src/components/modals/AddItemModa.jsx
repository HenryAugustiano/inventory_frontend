import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddItemModal = ({ showModal, handleClose, handleAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleAdd = () => {
    // Perform validation or additional logic here if needed
    const newItem = {
      itemName,
      itemPrice,
      itemQuantity,
      description: itemDescription,
    };

    // Pass the new item to the parent component
    handleAddItem(newItem);
    
    // Reset the form and close the modal
    setItemName('');
    setItemPrice('');
    setItemQuantity('');
    setItemDescription('');
    handleClose();
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="itemPrice">
            <Form.Label>Item Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item price"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="itemQuantity">
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item quantity"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="itemDescription">
            <Form.Label>Item Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter item description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAdd}>
          Add Item
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
