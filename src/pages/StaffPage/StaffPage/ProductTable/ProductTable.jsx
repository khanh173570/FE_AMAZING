import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductTable.css';
import { AiOutlineSearch, AiOutlineCloudUpload, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal'; // Import the modal component

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search input
    const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570');
                setProducts(response.data);
                setFilteredProducts(response.data); // Initially set filtered products to all products
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Filter products based on search term
    const handleSearch = () => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.artist.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    return (
        <div className='producttable'>
            <div className="producttable-top">
                <h1>Danh sách sản phẩm</h1>
                <hr />
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder='Nhập từ khóa tìm kiếm'
                        value={searchTerm} // Bind the input value to searchTerm state
                        onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on change
                    />
                    <button onClick={handleSearch}><AiOutlineSearch /></button>
                </div>
            </div>
            <div className="producttable-table">
                <table>
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Chất liệu</th>
                            <th>Gía</th>
                            <th>Nghệ nhân</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>
                                    <span 
                                        className="product-name" 
                                        onClick={() => handleProductClick(product.id)}>
                                        {product.name}
                                    </span>
                                </td>
                                <td>{product.category}</td>
                                <td>${product.price}</td>
                                <td>{product.artist}</td>
                                <td>{product.status}</td>
                                <td>
                                    <button className="upload-btn">
                                        <AiOutlineCloudUpload />
                                    </button>
                                    <button className="edit-btn" >
                                        <Link to={`/staff/editproduct/${product.id}`}>
                                            <AiOutlineEdit />
                                        </Link>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ProductDetailModal 
                    productId={selectedProductId} 
                    onClose={handleCloseModal} 
                />
            )}
        </div>
    );
};

export default ProductTable;
