import React, { useState, useEffect } from 'react';
import { Table, Avatar, message, Tag, Input } from 'antd';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import { FaPlus } from 'react-icons/fa';

const { Search } = Input; // Destructure Search from Input

const columns = [
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
    filters: [
      { text: 'Budget', value: 'Budget' },
      { text: 'Luxury', value: 'Luxury' },
      { text: 'Standard', value: 'Standard' },
      { text: 'Special', value: 'Special' },
    ],
    filterMultiple: true,
    onFilter: (value, record) => record.type === value,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    width: 90,
    render: (text) => `$${text}`,
  },
  {
    title: 'Date',
    dataIndex: ['detail', 'date'],
    key: 'date',
    width: 160,
    sorter: (a, b) => new Date(a.detail.date) - new Date(b.detail.date),
    render: (text) => new Date(text).toLocaleDateString(),
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
    filters: [
      {
        text: <Tag color="green">Accepted</Tag>,
        value: 'Accepted',
      },
      {
        text: <Tag color="red">Rejected</Tag>,
        value: 'Rejected',
      },
      {
        text: <Tag color="yellow">Pending</Tag>,
        value: 'Pending',
      },
    ],
    filterMultiple: true,
    onFilter: (value, record) => record.status.includes(value),
    render: (status) => {
      let color = 'default';
      if (status === 'Accepted') color = 'green';
      else if (status === 'Rejected') color = 'red';
      else if (status === 'Pending') color = 'yellow';
      return <Tag color={color}>{status}</Tag>;
    },
  },
];

const DistributorHomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570')
      .then((response) => {
        const mappedData = response.data.map((item) => ({
          key: item.id,
          id: item.id,
          name: item.name,
          artist: item.artist,
          price: item.price,
          type: item.type,
          status: item.status,
          img: item.img,
          category: item.category,
          detail: item.detail,
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

  // Filter data based on the search input
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      {/* Customized Heading */}
      <h2 style={{ fontWeight: 'bold', margin: '16px 0', textAlign: 'center' }}>
        Danh sách sản phẩm đã gửi
      </h2>

      {/* Container for Add Product button and Search Bar */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        {/* Add Product button using Material-UI */}
        <NavLink to="/seller/add-product" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FaPlus />}
          >
            Add Product
          </Button>
        </NavLink>

        {/* Search Bar */}
        <Search
          placeholder="Search by name"
          allowClear
          onSearch={(value) => setSearchValue(value)}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: 300 }} // Set the width of the search bar
        />
      </Box>


      {/* Ant Design Table */}
      <Table
        columns={columns}
        dataSource={filteredData} // Use filtered data for the table
        loading={loading}
        pagination={{
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15', '20'],
          onShowSizeChange: (_, newPageSize) => setPageSize(newPageSize),
        }}
        scroll={{ x: 'max-content' }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </>
  );
};

export default DistributorHomePage;
