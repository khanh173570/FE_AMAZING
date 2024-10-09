import React, { useState, useCallback } from 'react';
import { Form, Input, InputNumber, Button, Row, Col, message, Select, Card } from 'antd';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const SellerAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null); // State to store the uploaded image URL
  const navigate = useNavigate();

  const checkProductExists = async (name, idProduct) => {
    try {
      const { data } = await axios.get('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570');
      
      // Check for existing product name
      const isNameExists = data.some(product => product.name === name);
      if (isNameExists) {
        message.error('Name already exists');
        return false;
      }

      // Check for existing idProduct
      const isIdProductExists = data.some(product => product.detail.idProduct === idProduct);
      if (isIdProductExists) {
        message.error('idProduct already exists');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error fetching products:', error);
      message.error('Failed to validate product information');
      return false;
    }
  };

  const onFinish = async (values) => {
    setLoading(true);

    // Validate idProduct is positive
    if (values.detail.idProduct <= 0) {
      message.error('idProduct must be a positive number');
      setLoading(false);
      return;
    }

    // Check if product name or idProduct already exists
    const isProductValid = await checkProductExists(values.name, values.detail.idProduct);
    if (!isProductValid) {
      setLoading(false);
      return;
    }

    const productData = {
      ...values,
      img: imageUrl, // Use the uploaded image URL
      status: 'Pending',
      detail: {
        ...values.detail,
        date: new Date().toISOString().split('T')[0], // Set the date to the current date
      },
    };

    axios
      .post('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570', productData)
      .then(() => {
        message.success('Product added successfully');
        navigate('/seller'); // Redirect to product list page after success
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        message.error('Failed to add product');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    // Check file size (e.g., limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      message.error('File size must be less than 2MB');
      return;
    }

    // Create an image object to check its dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (img.width > 800 || img.height > 800) {
        message.error('Image dimensions must be less than 800x800 pixels');
        return;
      }

      // If the dimensions are acceptable, proceed to convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set image URL to the base64 string
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    };
  }, []);

  // Function to remove selected image
  const removeImage = () => {
    setImageUrl(null); // Reset the image URL to allow another upload
  };

  // Configure react-dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  return (
    <Form
      name="add_product"
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ quantity: 1 }}
    >
      <Row gutter={[24, 16]} justify="start">
        {/* First Column */}
        <Col xs={24} sm={12} lg={12}>
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'Please enter the product name' }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Artist"
            name="artist"
            rules={[{ required: true, message: 'Please enter the artist name' }]}
          >
            <Input placeholder="Enter artist name" />
          </Form.Item>

          <Form.Item
            label="Price ($)"
            name="price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <InputNumber
              placeholder="Enter price"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: 'Please select the product type' }]}
          >
            <Select placeholder="Select product type">
              <Option value="Budget">Budget</Option>
              <Option value="Standard">Standard</Option>
              <Option value="Luxury">Luxury</Option>
              <Option value="Special">Special</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: 'Please select the category' }]}
          >
            <Select placeholder="Select category">
              <Option value="Gỗ">Gỗ</Option>
              <Option value="Tre">Tre</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter the description' }]}
          >
            <TextArea rows={4} placeholder="Enter product description" />
          </Form.Item>
        </Col>

        {/* Second Column */}
        <Col xs={24} sm={12} lg={12}>

          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter the quantity' }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Height (cm)"
            name={['detail', 'height']}
            rules={[{ required: true, message: 'Please enter the height' }]}
          >
            <InputNumber
              placeholder="Enter height"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Weight (kg)"
            name={['detail', 'weight']}
            rules={[{ required: true, message: 'Please enter the weight' }]}
          >
            <InputNumber
              placeholder="Enter weight"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Length (cm)"
            name={['detail', 'length']}
            rules={[{ required: true, message: 'Please enter the length' }]}
          >
            <InputNumber
              placeholder="Enter length"
              min={1}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Product ID"
            name={['detail', 'idProduct']}
            rules={[{ required: true, message: 'Please enter the product ID' }]}
          >
            <Input placeholder="Enter product ID" />
          </Form.Item>

          {/* Image Dropzone */}
          <Form.Item
            label="Product Image"
            required
            help={!imageUrl && 'Please upload an image'}
          >
            {!imageUrl ? (
              <div
                {...getRootProps()}
                style={{
                  border: '2px dashed #d9d9d9',
                  padding: '20px',
                  textAlign: 'center',
                  background: isDragActive ? '#fafafa' : '',
                  cursor: 'pointer',
                }}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag & drop an image here, or click to select one</p>
                )}
              </div>
            ) : (
              <Card
                hoverable
                style={{ width: 240, marginTop: '10px' }}
                cover={<img alt="Uploaded Product" src={imageUrl} style={{ objectFit: 'contain', height: 200 }} />}
              >
                <Button
                  type="link"
                  style={{ color: 'red', marginTop: '10px' }}
                  onClick={removeImage}
                >
                  Remove Image
                </Button>
              </Card>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Row gutter={[16, 8]} justify="end">
          <Col>
            <NavLink to="/seller">
              <Button type="default">Back</Button>
            </NavLink>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit" loading={loading}>
              Add Product
            </Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default SellerAddProduct;
