import React, { useEffect, useState } from 'react';
import { Modal, Button, Avatar, Tag, message } from 'antd';
import axios from 'axios';

const SellerProductDetailModal = ({ visible, onClose, productId, refreshData }) => {
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      axios
        .get(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${productId}`)
        .then((response) => {
          setProductDetails(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product details:', error);
          message.error('Failed to load product details');
          setLoading(false);
        });
    }
  }, [productId]);

  const handleDelete = () => {
    // Ensure the product status is 'Pending' before allowing deletion
    if (productDetails.status === 'Pending') {
      axios
        .delete(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${productId}`)
        .then(() => {
          message.success('Product deleted successfully');
          refreshData(); // Refresh the data in the table
          onClose(); // Close the modal after deletion
        })
        .catch((error) => {
          console.error('Error deleting product:', error);
          message.error('Failed to delete product');
        });
    } else {
      message.warning('You can only delete products with status Pending');
    }
  };

  if (!productDetails) {
    return null; // Return nothing if there are no details
  }

  const { name, artist, price, type, status, img, description, detail } = productDetails;

  // Format date to dd/mm/yyyy
  const formattedDate = new Date(detail.date).toLocaleDateString('en-GB');

  const confirmDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this product?',
      onOk: handleDelete,
    });
  };
  
  return (
    <Modal
      title="Product Details"
      visible={visible}
      onCancel={onClose}
      footer={[
        status === 'Pending' && (
       
// Button for deleting product
<Button
  key="delete"
  type="primary"
  danger
  onClick={confirmDelete}
  loading={loading}
  style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
>
  Delete Product
</Button>
        ),
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Avatar src={img} alt={name} size={100} />
        <div style={{ marginLeft: '16px' }}>
          <h3>{name}</h3>
          <p><strong>Artist:</strong> {artist}</p>
          <p><strong>Price:</strong> ${price}</p>
          <p><strong>Category:</strong> {productDetails.category}</p>
          <p><strong>Type:</strong> <span >{type}</span></p>
         
         
        </div>
      </div>
    
      <p><strong>Description:</strong> {description}</p>
      <p>
        <strong>Dimensions:</strong> {detail.height} cm (H) x {detail.length} cm (L) x {detail.weight} kg
      </p>
      <p><strong>Date:</strong> {formattedDate}</p> {/* Display formatted date */}
      <p>
        <strong>Status:</strong>{ <Tag color={status === 'Accepted' ? 'green' : status === 'Rejected' ? 'red' : 'yellow'}>
            {status}
          </Tag>}
      </p>
     
    </Modal>
  );
};

export default SellerProductDetailModal;
