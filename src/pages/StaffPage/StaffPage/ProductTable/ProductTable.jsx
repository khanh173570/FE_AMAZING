import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductTable.css'
import { AiOutlineSearch, AiOutlineCloudUpload, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal'; // Import the modal component
import { Tooltip } from '@mui/material';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search input
    const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State for confirmation popup
    const [isConfirmUploadAllOpen, setIsConfirmUploadAllOpen] = useState(false); // State for upload all confirmation popup
    const [productToUpload, setProductToUpload] = useState(null); // Product to be uploaded
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570');

                // Filter products by status 'accepted'
                const acceptedProducts = response.data.filter(product => product.status === 'Accepted');

                setProducts(acceptedProducts);
                setFilteredProducts(acceptedProducts); // Initially set filtered products to accepted products
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
        setCurrentPage(1); // Reset to the first page after search
    };

    // Handle click on upload icon to open confirmation popup
    const handleUploadClick = (product) => {
        setProductToUpload(product); // Set the product to be uploaded
        setIsConfirmOpen(true); // Open confirmation popup
    };

    // Function to upload the product to the second API link
    const handleConfirmUpload = async () => {
        try {
            // Upload the product to the second API link
            await axios.post('https://666a8f987013419182cfc970.mockapi.io/api/example', productToUpload);

            // Remove the deleted product from the table by updating the products and filteredProducts states
            const updatedProducts = products.filter(product => product.id !== productToUpload.id);
            const updatedFilteredProducts = filteredProducts.filter(product => product.id !== productToUpload.id);

            setProducts(updatedProducts); // Update the products state
            setFilteredProducts(updatedFilteredProducts); // Update the filtered products state

            alert('Sản phẩm đã được tải lên và xóa thành công!');
        } catch (error) {
            console.error('Error uploading or deleting product:', error);
            alert('Có lỗi xảy ra khi tải lên hoặc xóa sản phẩm.');
        } finally {
            setIsConfirmOpen(false); // Close the confirmation popup
            setProductToUpload(null); // Clear the product to upload
        }
    };

    const handleConfirmUploadAll = async () => {
        try {
            // Loop through selected products and upload each one
            for (const productId of selectedProducts) {
                const product = products.find(p => p.id === productId);

                // Upload product to the second API link
                await axios.post('https://666a8f987013419182cfc970.mockapi.io/api/example', product);
            }

            // Update the UI by removing uploaded products
            const updatedProducts = products.filter(product => !selectedProducts.includes(product.id));
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
            setSelectedProducts([]); // Clear selected products after upload

            alert('Tất cả sản phẩm đã được tải lên và xóa thành công!');
        } catch (error) {
            console.error('Error uploading or deleting products:', error);
            alert('Có lỗi xảy ra khi tải lên hoặc xóa sản phẩm.');
        } finally {
            setIsConfirmUploadAllOpen(false); // Close the confirmation popup
        }
    };

    const handleUploadAllClick = () => {
        setIsConfirmUploadAllOpen(true); // Open confirmation popup for uploading all
    };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedProducts([]); // Deselect all products
        } else {
            setSelectedProducts(currentProducts.map((product) => product.id)); // Select all products
        }
        setSelectAll(!selectAll); // Toggle select all state
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(productId => productId !== id)); // Deselect product
        } else {
            setSelectedProducts([...selectedProducts, id]); // Select product
        }
    };

    const handleProductClick = (productId) => {
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);
    };

    // Calculate the index range for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const isAllSelected = currentProducts.length > 0 && selectedProducts.length === currentProducts.length;

    return (
        <div className='producttable'>
            <div className="producttable-top">
                <h1>Danh sách sản phẩm</h1>
                <hr />
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder='Nhập từ khóa tìm kiếm'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleSearch}><AiOutlineSearch /></button>
                </div>
            </div>

            <div className="producttable-table">
                <table className='producttable-table-section'>
                    <thead className='producttable-thead-section'>
                        <tr className='producttable-tr-section'>
                            {/* Select All checkbox in the header */}
                            <th className='producttable-first-row' style={{ textAlign: 'center' }}>
                                <input
                                    className='producttable-checkbox'
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={isAllSelected}
                                />
                            </th>
                            <th className='producttable-first-row'>Tên sản phẩm</th>
                            <th className='producttable-first-row'>Chất liệu</th>
                            <th className='producttable-first-row'>Giá</th>
                            <th className='producttable-first-row'>Nghệ nhân</th>
                            <th className='producttable-first-row'>Trạng thái</th>
                            <th className='producttable-first-row'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody className='producttable-tbody-section'>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td className='producttable-second-row' data-label="Chọn" style={{ textAlign: 'center' }}>
                                    <input
                                        type="checkbox"
                                        className='producttable-checkbox'
                                        checked={selectedProducts.includes(product.id)}
                                        onChange={() => handleSelectProduct(product.id)}
                                    />
                                </td>
                                <td className='producttable-second-row' data-label="Tên sản phẩm">
                                    <span
                                        className="product-name"
                                        onClick={() => handleProductClick(product.id)}>
                                        {product.name}
                                    </span>
                                </td>
                                <td className='producttable-second-row' data-label="Chất liệu">{product.category}</td>
                                <td className='producttable-second-row' data-label="Giá">${product.price}</td>
                                <td className='producttable-second-row' data-label="Nghệ nhân">{product.artist}</td>
                                <td className='producttable-second-row' data-label="Trạng thái">{product.status}</td>
                                <td className='producttable-second-row' data-label="Hành động">
                                    <Tooltip title="Tải lên User" arrow>
                                        <button className="upload-btn" onClick={() => handleUploadClick(product)}>
                                            <AiOutlineCloudUpload />
                                        </button>
                                    </Tooltip>

                                    <Tooltip title="Chỉnh sửa" arrow>
                                        <button className="edit-btn">
                                            <Link to={`/staff/editproduct/${product.id}`}>
                                                <AiOutlineEdit />
                                            </Link>
                                        </button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination and selected product count */}
            <div className="pagination-wrapper">
                <div className="selected-and-upload-container">
                    {/* Display number of selected products */}
                    <p>{selectedProducts.length} sản phẩm đã được chọn</p>

                    {/* Upload all selected products button */}
                    <button
                        className={`upload-all-btn ${selectedProducts.length === 0 ? 'disabled' : ''}`}
                        onClick={handleUploadAllClick}
                        disabled={selectedProducts.length === 0} // Disable when no products are selected
                    >
                        Tải lên tất cả
                    </button>
                </div>

                {/* Pagination controls */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => paginate(i + 1)}
                            className={currentPage === i + 1 ? 'active' : ''}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>


            {isModalOpen && (
                <ProductDetailModal
                    productId={selectedProductId}
                    onClose={handleCloseModal}
                />
            )}

            {/* Confirmation popup for upload */}
            {isConfirmOpen && (
                <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <h3>Xác nhận</h3>
                        <p>Bạn có chắc chắn muốn tải lên sản phẩm này không?</p>
                        <button onClick={handleConfirmUpload}>Xác nhận</button>
                        <button onClick={() => setIsConfirmOpen(false)}>Hủy</button>
                    </div>
                </div>
            )}

            {/* Confirmation Popup for uploading all selected products */}
            {isConfirmUploadAllOpen && (
                <div className="confirm-popup">
                    <div className="confirm-popup-content">
                        <h3>Xác nhận</h3>
                        <p>Bạn có chắc chắn muốn tải tất cả sản phẩm đã chọn lên không?</p>
                        <button onClick={handleConfirmUploadAll}>Xác nhận</button>
                        <button onClick={() => setIsConfirmUploadAllOpen(false)}>Hủy</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;
