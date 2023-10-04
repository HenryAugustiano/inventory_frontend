import React from "react";
import { Table, Button, OverlayTrigger, Tooltip  } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCircleInfo, faEdit, faShoppingCart } from '@fortawesome/free-solid-svg-icons';


const InventoryTable = ({inventoryData, handleShowInfoModal, handleDeleteItem, handleShowEditModal }) => {
  const renderTooltip = (text) => (
    <Tooltip id="button-tooltip">
      {text}
    </Tooltip>
  );

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
                <OverlayTrigger placement="top" overlay={renderTooltip('View Info')}>
                  <Button variant="info" onClick={() => handleShowInfoModal(item)}>
                    <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                  </Button>
                </OverlayTrigger>{' '}
                <OverlayTrigger placement="top" overlay={renderTooltip('Edit Item')}>
                  <Button variant="warning" onClick={() => handleShowEditModal(item)}>
                    <FontAwesomeIcon icon={faEdit} size="lg" />
                  </Button>
                </OverlayTrigger>{' '}
                <OverlayTrigger placement="top" overlay={renderTooltip('Sell Item')}>
                  <Button variant="success">
                    <FontAwesomeIcon icon={faShoppingCart} />
                  </Button>
                </OverlayTrigger>{' '}
                <OverlayTrigger placement="top" overlay={renderTooltip('Delete Item')}>
                  <Button variant="danger" onClick={() => handleDeleteItem(item.itemName)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </OverlayTrigger>{' '}
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