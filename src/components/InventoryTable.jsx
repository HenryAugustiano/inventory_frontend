import React from "react";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleInfo, faEdit } from '@fortawesome/free-solid-svg-icons';


const InventoryTable = ({inventoryData, handleShowInfoModal, handleDeleteItem, handleShowEditModal }) => {
  return(
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
                <Button variant="info" onClick={() => handleShowInfoModal(item)}><FontAwesomeIcon icon={faCircleInfo}  size='lg'/></Button>{' '}
                <Button variant="danger" onClick={() => {handleDeleteItem(item.itemName)}}><FontAwesomeIcon icon={faTrash} /></Button>{' '}
                <Button variant="warning" onClick={() => handleShowEditModal(item)}><FontAwesomeIcon icon={faEdit} size="lg" /></Button>{' '}

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
  );
};

export default InventoryTable;