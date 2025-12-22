import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Components/Header/Header';
import headerimg2 from '../../../assets/images/header2.png';
import axios from 'axios';
import NoData from '../../../Shared/Components/NoData/NoData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




export default function CategoryList() {


  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState('');

  // فتح وإغلاق المودال
  const handleClose = () => setShow(false);

  const handleShow = (category) => {
    setCategoryId(category.id);
    setCategoryName(category.name);
    setShow(true);
  };

  // ================= GET ALL CATEGORIES =================
  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        'https://upskilling-egypt.com:3006/api/v1/category/?pageSize=10&pageNumber=1',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCategories(response.data.data || []);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  // ================= DELETE CATEGORY =================
  const deleteCategory = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success(`'${categoryName}' category is deleted successfully`);
      getAllCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {/* ================= DELETE MODAL ================= */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem="Category" name={categoryName} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            onClick={() => {
              deleteCategory();
              handleClose();
            }}
          >
            Delete this Item
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ========================================= */}
        

      {/* ================= HEADER ================= */}
      <Header
        title="Categories"
        subtitle="Item"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerimg2}
        minHeight="200px"
        imgWidth="50"
      />
      <div className='d-flex justify-content-between my-4 align-items-center mx-4'>
        <div>
          <h6>Categories Table Details</h6>
          <p>You can check all details</p>
        </div>
        <button
          className="border-0 px-4 rounded-2 py-2 text-light secondary-bg"
          // onClick={() => navigate('/dashboard/recipe-data')}
        >
          + Add New Category
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="container mt-4">
        {loading && <p>Loading categories...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Creation Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>{category.creationDate}</td>
                    <td>
                      <div className="dropdown">
                        <i
                          className="fa-solid fa-ellipsis"
                          data-bs-toggle="dropdown"
                        ></i>
                        <ul className="dropdown-menu">
                          <li>
                            <button className="dropdown-item">View</button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                navigate(`/dashboard/categories/edit/${category.id}`)
                              }
                            >
                              Edit
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              onClick={() => handleShow(category)}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    <NoData />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
