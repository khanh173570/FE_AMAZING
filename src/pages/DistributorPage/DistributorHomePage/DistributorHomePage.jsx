import React, { useState, useEffect } from 'react';
import { Table, Avatar, message, Tag, Input, Button, Row, Col, Card } from 'antd';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './DistributorHomePage.css';
import SellerProductDetailModal from './../SellerProductDetail/SellerProductDetailModal';

const { Search } = Input;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    responsive: ['sm'],
    render: (text) => (
      <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{text}</span>
    ),
  },
  {
    title: 'Artist',
    dataIndex: 'artist',
    key: 'artist',
    responsive: ['md'],
    render: (text) => (
      <span style={{ color: '#ff5722', fontWeight: 'bold' }}>{text}</span>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    responsive: ['md'],
    filters: [
      { text: 'Gỗ', value: 'Gỗ' },
      { text: 'Tre', value: 'Tre' },
    ],
    filterMultiple: true,
    onFilter: (value, record) => record.category === value,
    render: (text) => (
      <span style={{ color: '#3f51b5', fontWeight: 'bold' }}>{text}</span>
    ),
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    responsive: ['lg'],
    filters: [
      { text: 'Budget', value: 'Budget' },
      { text: 'Luxury', value: 'Luxury' },
      { text: 'Standard', value: 'Standard' },
      { text: 'Special', value: 'Special' },
    ],
    filterMultiple: true,
    onFilter: (value, record) => record.type === value,
    render: (text) => (
      <span style={{ fontStyle: 'italic', color: '#ff9800', fontWeight: 'bold' }}>{text}</span>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    responsive: ['sm'],
    render: (text) => (
      <span style={{ color: 'green', fontWeight: 'bold' }}>${text}</span>
    ),
  },
  {
    title: 'Date',
    dataIndex: ['detail', 'date'],
    key: 'date',
    responsive: ['md'],
    sorter: (a, b) => new Date(a.detail.date) - new Date(b.detail.date),
    render: (text) => (
      <span style={{ color: '#607d8b', fontWeight: 'bold' }}>
        {new Date(text).toLocaleDateString()}
      </span>
    ),
  },
  {
    title: 'Image',
    dataIndex: 'img',
    key: 'img',
    responsive: ['lg'],
    render: (imgUrl, record) => (
      <Avatar src={imgUrl} alt={record.name} shape="circle" size={60} />
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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

      return (
        <Tag color={color}>
          <span style={{ fontWeight: 'bold' }}>{status}</span>
        </Tag>
      );
    },
  }
];

const DistributorHomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSize, setPageSize] = useState(5);
  const [searchValue, setSearchValue] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, []);

  const fetchData = () => {
    setLoading(true);
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
  };

  const handleRowClick = (record) => {
    setSelectedProductId(record.id);
    setModalVisible(true);
  };

  return (
    <>
      <Row justify="center" style={{ marginBottom: '16px' }}>
        <Col span={24}>
          <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
            Danh sách sản phẩm đã gửi
          </h2>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginBottom: '16px' }}>
        <Col xs={24} sm={8} md={6}>
          <NavLink to="/seller/add-product" style={{ textDecoration: 'none' }}>
            <Button type="primary" icon={<FaPlus />}>
              Add Product
            </Button>
          </NavLink>
        </Col>
        <Col xs={24} sm={16} md={12}>
          <Search
            placeholder="Search by name"
            allowClear
            onSearch={(value) => setSearchValue(value)}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>

      <Card style={{ marginBottom: '24px' }}>
        <Table
          columns={columns}
          dataSource={filteredData}
          loading={loading}
          pagination={{
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '15', '20'],
            onShowSizeChange: (_, newPageSize) => setPageSize(newPageSize),
          }}
          scroll={{ x: true, y: 500 }} // Enable both horizontal and vertical scrolling
          onRow={(record) => ({
            onClick: () => handleRowClick(record),
          })}
        />
      </Card>

      <SellerProductDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        productId={selectedProductId}
        refreshData={fetchData} // Pass the refresh function to the modal
      />
    </>
  );
};

export default DistributorHomePage;
