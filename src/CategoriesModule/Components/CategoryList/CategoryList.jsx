// import React, { useEffect, useState } from 'react';
// import Header from '../../../Shared/Components/Header/Header';
// import headerimg2 from '../../../assets/images/header2.png';
// import axios from 'axios';
// import NoData from '../../../Shared/Components/NoData/NoData';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';




// export default function CategoryList() {


//   const navigate = useNavigate();

//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [show, setShow] = useState(false);
//   const [categoryId, setCategoryId] = useState(0);
//   const [categoryName, setCategoryName] = useState('');

//   // فتح وإغلاق المودال
//   const handleClose = () => setShow(false);

//   const handleShow = (category) => {
//     setCategoryId(category.id);
//     setCategoryName(category.name);
//     setShow(true);
//   };

//   // ================= GET ALL CATEGORIES =================
//   const getAllCategories = async () => {
//     try {
//       const response = await axios.get(
//         'https://upskilling-egypt.com:3006/api/v1/category/?pageSize=10&pageNumber=1',
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setCategories(response.data.data || []);
//     } catch (err) {
//       setError('Failed to load categories');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= DELETE CATEGORY =================
//   const deleteCategory = async () => {
//     try {
//       await axios.delete(
//         `https://upskilling-egypt.com:3006/api/v1/category/${categoryId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       toast.success(`'${categoryName}' category is deleted successfully`);
//       getAllCategories();
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Delete failed');
//     }
//   };

//   useEffect(() => {
//     getAllCategories();
//   }, []);

//   return (
//     <>
//       {/* ================= DELETE MODAL ================= */}
//       <Modal show={show} onHide={handleClose} animation={false}>
//         <Modal.Header closeButton />
//         <Modal.Body>
//           <DeleteConfirmation deleteItem="Category" name={categoryName} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="outline-danger"
//             onClick={() => {
//               deleteCategory();
//               handleClose();
//             }}
//           >
//             Delete this Item
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* ========================================= */}
        

//       {/* ================= HEADER ================= */}
//       <Header
//         title="Categories"
//         subtitle="Item"
//         description="You can now add your items that any user can order it from the Application and you can edit"
//         imgUrl={headerimg2}
//         minHeight="200px"
//         imgWidth="50"
//       />
//       <div className='d-flex justify-content-between my-4 align-items-center mx-4'>
//         <div>
//           <h6>Categories Table Details</h6>
//           <p>You can check all details</p>
//         </div>
//         <button
//           className="border-0 px-4 rounded-2 py-2 text-light secondary-bg"
//           // onClick={() => navigate('/dashboard/recipe-data')}
//         >
//           + Add New Category
//         </button>
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="container mt-4">
//         {loading && <p>Loading categories...</p>}
//         {error && <p className="text-danger">{error}</p>}

//         {!loading && !error && (
//           <table className="table table-striped table-bordered">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Creation Date</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {categories.length > 0 ? (
//                 categories.map((category) => (
//                   <tr key={category.id}>
//                     <td>{category.id}</td>
//                     <td>{category.name}</td>
//                     <td>{category.creationDate}</td>
//                     <td>
//                       <div className="dropdown">
//                         <i
//                           className="fa-solid fa-ellipsis"
//                           data-bs-toggle="dropdown"
//                         ></i>
//                         <ul className="dropdown-menu">
//                           <li>
//                             <button className="dropdown-item">View</button>
//                           </li>
//                           <li>
//                             <button
//                               className="dropdown-item"
//                               onClick={() =>
//                                 navigate(`/dashboard/categories/edit/${category.id}`)
//                               }
//                             >
//                               Edit
//                             </button>
//                           </li>
//                           <li>
//                             <button
//                               className="dropdown-item text-danger"
//                               onClick={() => handleShow(category)}
//                             >
//                               Delete
//                             </button>
//                           </li>
//                         </ul>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center">
//                     <NoData />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// }



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
import { useForm } from 'react-hook-form';

// ============ CategoryData Component ============
function CategoryData({ isEdit, category, closeModal, refreshCategories }) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (isEdit && category) {
      setValue('name', category.name);
    } else {
      setValue('name', '');
    }
  }, [isEdit, category, setValue]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await axios.put(`https://upskilling-egypt.com:3006/api/v1/category/${category.id}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Category updated successfully');
      } else {
        await axios.post(`https://upskilling-egypt.com:3006/api/v1/category`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Category added successfully');
      }
      refreshCategories();
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Category Name"
          {...register('name', { required: 'Category name is required' })}
        />
        {errors.name && <small className="text-danger">{errors.name.message}</small>}
      </div>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={closeModal}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

// ============ CategoryList Component ============
export default function CategoryList() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(0);
  const [deleteCategoryName, setDeleteCategoryName] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  // ============ API Calls ============
  const getAllCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://upskilling-egypt.com:3006/api/v1/category/?pageSize=10&pageNumber=1', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCategories(res.data.data || []);
    } catch {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async () => {
    try {
      await axios.delete(`https://upskilling-egypt.com:3006/api/v1/category/${deleteCategoryId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success(`'${deleteCategoryName}' category is deleted successfully`);
      getAllCategories();
      setShowDelete(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <Header
        title="Categories"
        subtitle="Item"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerimg2}
        minHeight="200px"
        imgWidth="50"
      />

      {/* ================= BUTTON + FORM MODAL ================= */}
      <div className="d-flex justify-content-between my-4 align-items-center mx-4">
        <h6>Categories Table Details</h6>
        <Button
          onClick={() => {
            setEditCategory(null);
            setShowForm(true);
          }}
          className="secondary-bg text-light"
        >
          + Add New Category
        </Button>
      </div>

      <Modal show={showForm} onHide={() => setShowForm(false)} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{editCategory ? 'Edit Category' : 'Add New Category'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoryData
            isEdit={!!editCategory}
            category={editCategory}
            closeModal={() => setShowForm(false)}
            refreshCategories={getAllCategories}
          />
        </Modal.Body>
      </Modal>

      {/* ================= DELETE MODAL ================= */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} animation={false}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem="Category" name={deleteCategoryName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={deleteCategory}>Delete this Item</Button>
        </Modal.Footer>
      </Modal>

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
              {categories.length > 0 ? categories.map(cat => (
                <tr key={cat.id}>
                  <td>{cat.id}</td>
                  <td>{cat.name}</td>
                  <td>{new Date(cat.creationDate).toLocaleDateString()}</td>
                  <td>
                    <div className="dropdown">
                      <i className="fa-solid fa-ellipsis" data-bs-toggle="dropdown"></i>
                      <ul className="dropdown-menu">
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => { setEditCategory(cat); setShowForm(true); }}
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item text-danger"
                            onClick={() => { setDeleteCategoryId(cat.id); setDeleteCategoryName(cat.name); setShowDelete(true); }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center"><NoData /></td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

