import React, { useEffect, useState } from "react";
import API_URL from "../config/api";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaSearch,
  FaSort,
  FaCloudUploadAlt,
  FaImage,
  FaChevronLeft,
  FaChevronRight,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";

const DashboardAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editProduct, setEditProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [isHovering, setIsHovering] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  // Neon color palette
  const neonColors = {
    pink: "#ff00ff",
    blue: "#00ffff",
    purple: "#9d00ff",
    green: "#00ff88",
    yellow: "#fff700",
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setProducts(res.data);

      // Extract unique categories
      const categories = [
        ...new Set(res.data.map((product) => product.category)),
      ];
      setUniqueCategories(categories);
    } catch (error) {
      showErrorToast("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      style: {
        background: "#1a1a1a",
        color: neonColors.pink,
        border: `1px solid ${neonColors.purple}`,
      },
    });
  };

  const showSuccessToast = (message) => {
    toast.success(message, {
      style: {
        background: "#1a1a1a",
        color: neonColors.green,
        border: `1px solid ${neonColors.blue}`,
      },
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/products/${deleteId}`);
      showSuccessToast("Product deleted");
      setShowDeleteModal(false);
      fetchProducts();
    } catch (error) {
      showErrorToast("Delete failed");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", editProduct.title);
    formData.append("description", editProduct.description);
    formData.append("price", editProduct.price);
    formData.append("category", editProduct.category);
    if (editProduct.imageFile) {
      formData.append("images", editProduct.imageFile);
    }

    try {
      await axios.put(`${API_URL}/api/products/${editProduct._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSuccessToast("Product updated");
      setEditProduct(null);
      setSelectedFile(null);
      fetchProducts();
    } catch (error) {
      showErrorToast("Update failed");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("price", e.target.price.value);
    formData.append("category", e.target.category.value);
    if (e.target.image.files[0]) {
      formData.append("images", e.target.image.files[0]);
    }

    try {
      await axios.post(`${API_URL}/api/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      showSuccessToast("Product created");
      setShowAddModal(false);
      setSelectedFile(null);
      fetchProducts();
    } catch (error) {
      showErrorToast("Creation failed");
    }
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = React.useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig !== null) {
      sortableProducts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const filteredProducts = sortedProducts.filter(
    (product) =>
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === "" || product.category === categoryFilter)
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleFileChange = (e, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (isEdit && editProduct) {
        setEditProduct({ ...editProduct, imageFile: file });
      }
    }
  };

  const clearCategoryFilter = () => {
    setCategoryFilter("");
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, categoryFilter]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{
            scale: [1, 1.2, 1.2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 0.5,
          }}
          style={{
            width: 100,
            height: 100,
            background: `linear-gradient(45deg, ${neonColors.pink}, ${neonColors.blue})`,
            boxShadow: `0 0 10px ${neonColors.pink}, 0 0 20px ${neonColors.blue}`,
          }}
        />
      </div>
    );

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto bg-gray-900 text-gray-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              background: `radial-gradient(circle, ${
                Object.values(neonColors)[Math.floor(Math.random() * 5)]
              }20, transparent 70%)`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <motion.h1
        className="text-5xl font-bold mb-8 text-center bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${neonColors.pink}, ${neonColors.blue})`,
          textShadow: `0 0 10px ${neonColors.purple}`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Product Dashboard
      </motion.h1>

      <div className="relative z-10 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-3 top-3 text-purple-300" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-purple-500 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <motion.button
            className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-purple-500"
            onClick={() => setShowCategoryFilter(!showCategoryFilter)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaFilter />
            Filter
          </motion.button>
          {categoryFilter && (
            <motion.button
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-purple-500"
              onClick={clearCategoryFilter}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <FaTimes />
              Clear
            </motion.button>
          )}
          <motion.button
            className="px-6 py-3 rounded-lg flex items-center gap-2"
            style={{
              background: `linear-gradient(45deg, ${neonColors.pink}, ${neonColors.purple})`,
              boxShadow: `0 0 10px ${neonColors.pink}`,
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: `0 0 15px ${neonColors.pink}`,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
          >
            <FaPlus />
            Add Product
          </motion.button>
        </div>
      </div>

      {/* Category Filter Dropdown */}
      <AnimatePresence>
        {showCategoryFilter && (
          <motion.div
            className="relative z-10 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-4 bg-gray-800 rounded-lg border border-purple-500">
              {uniqueCategories.map((category) => (
                <motion.button
                  key={category}
                  className={`px-3 py-1 rounded-full text-sm ${
                    categoryFilter === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    setCategoryFilter(
                      categoryFilter === category ? "" : category
                    );
                    setShowCategoryFilter(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sort controls */}
      <div className="relative z-10 mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => requestSort("title")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-purple-500"
        >
          <span>Name</span>
          <FaSort
            className={`transition-transform ${
              sortConfig.key === "title" ? "text-purple-300" : "text-gray-400"
            } ${
              sortConfig.key === "title" && sortConfig.direction === "desc"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>
        <button
          onClick={() => requestSort("price")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-blue-500"
        >
          <span>Price</span>
          <FaSort
            className={`transition-transform ${
              sortConfig.key === "price" ? "text-blue-300" : "text-gray-400"
            } ${
              sortConfig.key === "price" && sortConfig.direction === "desc"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>
        <button
          onClick={() => requestSort("category")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-green-500"
        >
          <span>Category</span>
          <FaSort
            className={`transition-transform ${
              sortConfig.key === "category" ? "text-green-300" : "text-gray-400"
            } ${
              sortConfig.key === "category" && sortConfig.direction === "desc"
                ? "rotate-180"
                : ""
            }`}
          />
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl mb-2" style={{ color: neonColors.yellow }}>
            No products found
          </h3>
          <p className="text-gray-400">
            Try adjusting your search or add a new product
          </p>
        </motion.div>
      ) : (
        <>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 relative z-10">
            {currentItems.map((product) => (
              <motion.div
                key={product._id}
                className="relative rounded-2xl overflow-hidden bg-gray-800 border border-gray-700 hover:border-purple-500 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{
                  y: -5,
                  boxShadow: `0 10px 25px -5px ${neonColors.purple}80`,
                }}
                onMouseEnter={() => setIsHovering(product._id)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className="relative overflow-hidden h-48 w-full">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-500"
                    style={{
                      transform:
                        isHovering === product._id ? "scale(1.1)" : "scale(1)",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h2 className="text-xl font-bold">{product.title}</h2>
                    <p className="text-purple-300 font-semibold">
                      ₹{product.price}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        background: `${neonColors.blue}20`,
                        color: neonColors.blue,
                        border: `1px solid ${neonColors.blue}`,
                      }}
                    >
                      {product.category}
                    </span>
                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => {
                          setDeleteId(product._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash />
                      </motion.button>
                      <motion.button
                        className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                        onClick={() => setEditProduct({ ...product })}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 relative z-10">
              <nav className="flex items-center gap-2">
                <motion.button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg bg-gray-800 border border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: currentPage !== 1 ? 1.1 : 1 }}
                  whileTap={{ scale: currentPage !== 1 ? 0.9 : 1 }}
                >
                  <FaChevronLeft />
                </motion.button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <motion.button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`px-4 py-1 rounded-lg ${
                        currentPage === number
                          ? `text-white bg-gradient-to-r from-purple-600 to-blue-500`
                          : "bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {number}
                    </motion.button>
                  )
                )}

                <motion.button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg bg-gray-800 border border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: currentPage !== totalPages ? 1.1 : 1 }}
                  whileTap={{ scale: currentPage !== totalPages ? 0.9 : 1 }}
                >
                  <FaChevronRight />
                </motion.button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Delete Modal */}
      <Dialog
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="fixed inset-0 bg-black bg-opacity-70" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gray-800 rounded-xl shadow-2xl border border-purple-500 max-w-md w-full p-6"
        >
          <Dialog.Title
            className="text-xl font-bold mb-4"
            style={{ color: neonColors.pink }}
          >
            Confirm Deletion
          </Dialog.Title>
          <p className="mb-6 text-gray-300">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </p>
          <div className="flex justify-end gap-4">
            <motion.button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleDelete}
              className="px-4 py-2 rounded-lg text-white"
              style={{
                background: `linear-gradient(45deg, ${neonColors.pink}, ${neonColors.purple})`,
                boxShadow: `0 0 10px ${neonColors.pink}`,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      </Dialog>

      {/* Edit Modal */}
      {editProduct && (
        <Dialog
          open={true}
          onClose={() => {
            setEditProduct(null);
            setSelectedFile(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gray-800 rounded-xl shadow-2xl border border-blue-500 max-w-2xl w-full p-6"
          >
            <Dialog.Title
              className="text-xl font-bold mb-4"
              style={{ color: neonColors.blue }}
            >
              Edit Product
            </Dialog.Title>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-blue-500 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  placeholder="Title"
                  value={editProduct.title}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-blue-500 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                  placeholder="Description"
                  rows="3"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Price</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-blue-500 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Price"
                    value={editProduct.price}
                    onChange={(e) =>
                      setEditProduct({ ...editProduct, price: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-blue-500 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Category"
                    value={editProduct.category}
                    onChange={(e) =>
                      setEditProduct({
                        ...editProduct,
                        category: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image</label>
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-500 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile || editProduct.images[0] ? (
                        <>
                          <FaImage className="w-8 h-8 mb-3 text-blue-400" />
                          <p className="mb-2 text-sm text-blue-400">
                            {selectedFile ? selectedFile.name : "Current image"}
                          </p>
                        </>
                      ) : (
                        <>
                          <FaCloudUploadAlt className="w-8 h-8 mb-3 text-blue-400" />
                          <p className="mb-2 text-sm text-blue-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-blue-400">
                            PNG, JPG, GIF (MAX. 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, true)}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setEditProduct(null);
                    setSelectedFile(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white"
                  style={{
                    background: `linear-gradient(45deg, ${neonColors.blue}, ${neonColors.green})`,
                    boxShadow: `0 0 10px ${neonColors.blue}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </motion.div>
        </Dialog>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <Dialog
          open={true}
          onClose={() => {
            setShowAddModal(false);
            setSelectedFile(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gray-800 rounded-xl shadow-2xl border border-green-500 max-w-2xl w-full p-6"
          >
            <Dialog.Title
              className="text-xl font-bold mb-4"
              style={{ color: neonColors.green }}
            >
              Add New Product
            </Dialog.Title>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Title</label>
                <input
                  name="title"
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-green-500 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Description</label>
                <textarea
                  name="description"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-green-500 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                  placeholder="Description"
                  rows="3"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-2">Price</label>
                  <input
                    name="price"
                    type="number"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-green-500 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                    placeholder="Price"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Category</label>
                  <input
                    name="category"
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-green-500 focus:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                    placeholder="Category"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Image</label>
                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-500 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {selectedFile ? (
                        <>
                          <FaImage className="w-8 h-8 mb-3 text-green-400" />
                          <p className="mb-2 text-sm text-green-400">
                            {selectedFile.name}
                          </p>
                        </>
                      ) : (
                        <>
                          <FaCloudUploadAlt className="w-8 h-8 mb-3 text-green-400" />
                          <p className="mb-2 text-sm text-green-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-green-400">
                            PNG, JPG, GIF (MAX. 5MB)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      name="image"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      required={!selectedFile}
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-gray-600 text-gray-300 hover:bg-gray-700"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedFile(null);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 rounded-lg text-white"
                  style={{
                    background: `linear-gradient(45deg, ${neonColors.green}, ${neonColors.yellow})`,
                    boxShadow: `0 0 10px ${neonColors.green}`,
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Product
                </motion.button>
              </div>
            </form>
          </motion.div>
        </Dialog>
      )}
    </div>
  );
};

export default DashboardAdmin;
