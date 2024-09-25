import React, { useState, useEffect } from 'react';
import { Table, Avatar, message, Tag } from 'antd';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom'; // Import useNavigate and NavLink
import { Button, Box } from '@mui/material'; // Import Material-UI Button and Box for layout
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons

const columns = [
  // ... (same columns as before)
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 130,
  },
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
    width: 130,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    width: 130,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 130,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 90,
    render: (text) => `$${text}`, // Format price with a dollar sign
  },
  {
    title: 'Date',
    dataIndex: ['detail', 'date'], // Accessing nested date from the detail object
    key: 'date',
    width: 160,
    render: (text) => new Date(text).toLocaleDateString(), // Format date
  },
  {
    title: 'Image',
    dataIndex: 'img',
    key: 'img',
    width: 100,
    render: (imgUrl, record) => (
      <Avatar src={imgUrl} alt={record.name} shape="square" size={60} />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    render: (status) => {
      let color = 'default';
      if (status === 'Accepted') color = 'green';
      else if (status === 'Rejected') color = 'red';
      else if (status === 'Pending') color = 'yellow';
      return <Tag color={color}>{status}</Tag>; // Use Tag component with conditional color
    },
  },
];

const DistributorHomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate to handle navigation

  useEffect(() => {
    // Fetching data from API
    axios
      .get('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570')
      .then((response) => {
        const mappedData = response.data.map((item) => ({
          key: item.id, // Ant Design requires 'key' for each row
          id: item.id,  // Passing id for routing
          name: item.name,
          artist: item.artist,
          price: item.price,
          type: item.type,
          status: item.status,
          img: item.img,
          category: item.category,
          detail: item.detail, // Passing detail for nested date access
        }));
        setData(mappedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        message.error('Failed to load data');
        setLoading(false);
      });
  }, []);

  // Handle row click to navigate to ProductDetail page
  const handleRowClick = (record) => {
    navigate(`/seller/product/${record.id}`);
  };

  return (
    <>
    {/* Customized Heading */}
    <h2 style={{ fontWeight: 'bold', margin: '16px 0' }}>
      List of products that are sent
    </h2>

    {/* Add Product button using Material-UI */}
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <NavLink to="/seller/add-product" style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FaPlus />} // Use the react-icons plus icon here
        >
          Add Product
        </Button>
      </NavLink>
    </Box>

    {/* Ant Design Table */}
    <Table
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{ pageSize: 5 }}
      scroll={{ x: 'max-content' }} // Ensures scrollable table if content overflows
      onRow={(record) => ({
        onClick: () => handleRowClick(record), // Redirect when a row is clicked
      })}
    />
  </>
  );
};

export default DistributorHomePage;
