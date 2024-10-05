import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProductTable.css'
import { AiOutlineSearch, AiOutlineCloudUpload, AiOutlineEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import ProductDetailModal from '../ProductDetailModal/ProductDetailModal'; // Import the modal component

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // New state for search input
    const [filteredProducts, setFilteredProducts] = useState([]); // New state for filtered products
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State for confirmation popup
    const [productToUpload, setProductToUpload] = useState(null); // Product to be uploaded

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
    
            // After successful upload, delete the product from the original MockAPI
            await axios.delete(`https://66665901a2f8516ff7a322ea.mockapi.io/KhanhTPSE173570/${productToUpload.id}`);
    
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
                <table className='producttable-table-section'>
                    <thead className='stafftable-thead-section'>
                        <tr>
                            <th className='producttable-first-row'>Tên sản phẩm</th>
                            <th className='producttable-first-row'>Chất liệu</th>
                            <th className='producttable-first-row'>Gía</th>
                            <th className='producttable-first-row'>Nghệ nhân</th>
                            <th className='producttable-first-row'>Trạng thái</th>
                            <th className='producttable-first-row'>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product) => (
                            <tr key={product.id}>
                                <td className='producttable-second-row'>
                                    <span 
                                        className="product-name" 
                                        onClick={() => handleProductClick(product.id)}>
                                        {product.name}
                                    </span>
                                </td>
                                <td className='producttable-second-row'>{product.category}</td>
                                <td className='producttable-second-row'>${product.price}</td>
                                <td className='producttable-second-row'>{product.artist}</td>
                                <td className='producttable-second-row'>{product.status}</td>
                                <td>
                                    <button className="upload-btn" onClick={() => handleUploadClick(product)}>
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
        </div>
    );
};

export default ProductTable;
