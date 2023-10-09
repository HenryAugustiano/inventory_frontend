import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditItemModal = ({ showModal, handleClose, handleEditItem, item }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [itemDescription, setItemDescription] = useState('');

  const handleEdit = () => {
    // Perform validation or additional logic
    if(itemQuantity < 0 || itemPrice < 0){
      alert('Please enter a valid positive integer');
      return;
    }

    if(itemDescription.trim().length < 1){
      alert('Please enter a valid description');
      return;
    }

    const updatedItem = {
      itemName,
      itemPrice,
      itemQuantity,
      description: itemDescription,
    };

    // Pass the new item to the parent component
    handleEditItem(updatedItem);
    
    // Reset the form and close the modal
    setItemName('');
    setItemPrice('');
    setItemQuantity('');
    setItemDescription('');
    handleClose();
  };

  useEffect(() => {
    if(item){
      setItemName(item.itemName);
      setItemPrice(item.itemPrice);
      setItemQuantity(item.itemQuantity);
      setItemDescription(item.description);
    }
  }, [item]);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="itemName">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              value={itemName}
              disabled
              onChange={(e) => setItemName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="itemPrice">
            <Form.Label>Item Price</Form.Label>
            <Form.Control
              type="text"
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="itemQuantity">
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control
              type="text"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="itemDescription">
            <Form.Label>Item Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
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
        <Button variant="primary" onClick={handleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditItemModal;
