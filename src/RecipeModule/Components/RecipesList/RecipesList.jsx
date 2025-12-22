// ================= RecipesList.jsx =================
import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerimg2 from '../../../assets/images/header2.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import DeleteConfirmation from '../../../Shared/Components/DeleteConfirmation/DeleteConfirmation'

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [recipeId, setRecipeId] = useState(0)
  const [recipeName, setRecipeName] = useState('')
  const navigate = useNavigate()
  const [show, setShow] = useState(false)



  

  // فتح/غلق Modal
  const handleClose = () => setShow(false)
  const handleShow = (recipe) => {
    setRecipeId(recipe.id)
    setRecipeName(recipe.name)
    setShow(true)
  }

  // جلب كل الوصفات
  const getAllRecipes = async () => {
    try {
      const response = await axios.get(
        'https://upskilling-egypt.com:3006/api/v1/Recipe/',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setRecipesList(response.data.data)
    } catch (err) {
      setError('Failed to load recipes')
    } finally {
      setLoading(false)
    }
  }

  // حذف وصفة
  const deleteRecipe = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      toast.success(`Recipe "${recipeName}" deleted successfully`)
      getAllRecipes()
      handleClose()
    } catch (err) {
      console.log(err)
      toast.error('Failed to delete recipe')
    }
  }

  // Dropdown toggle
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  useEffect(() => {
    getAllRecipes()
  }, [])

  return (
    <>
      {/* Delete Confirmation Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <DeleteConfirmation deleteItem={'recipe'} name={recipeName} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteRecipe}>
            Delete
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Header */}
      <Header
        title="Recipes"
        subtitle="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerimg2}
        altText="Recipes Header Image"
        minHeight="200px"
        imgWidth="50"
      />

      {/* Add Recipe Button */}
      <div className="d-flex justify-content-between align-items-center mx-4 mt-4">
        <div className="recipe-title">
          <h6>Recipe Table Details</h6>
          <p>You can check all details</p>
        </div>
        <button
          className="border-0 px-4 rounded-2 py-2 text-light secondary-bg"
          onClick={() => navigate('/dashboard/recipe-data')}
        >
          + Add New Recipe
        </button>
      </div>

      {/* Table */}
      <div className="container mt-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Description</th>
                <th>Tag</th>
                <th>Category</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td>
                    <img
                      src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                      alt={recipe.name}
                      width="70"
                      height="60"
                      style={{ objectFit: 'cover', borderRadius: '6px' }}
                    />
                  </td>
                  <td>{recipe.price} EGP</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag?.name || 'No Tag'}</td>
                  <td>{recipe.category?.name || 'No Category'}</td>
                  <td style={{ position: 'relative' }}>
                    <i
                      className="fa-solid fa-ellipsis cursor-pointer"
                      onClick={() => toggleMenu(recipe.id)}
                    />

                    {openMenuId === recipe.id && (
                      <div
                        className="p-3 border bg-white shadow-sm rounded"
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '25px',
                          minWidth: '120px',
                          zIndex: 10,
                        }}
                      >
                        <button
                          className="dropdown-item text-success p-1"
                          onClick={() => navigate(`/dashboard/recipe-view/${recipe.id}`)}
                        >
                          <i className="fa-solid fa-eye"></i> View
                        </button>
                        <button
                          className="dropdown-item p-1"
                          onClick={() => navigate(`/dashboard/recipe-data/${recipe.id}`)}
                        >
                          <i className="fa-solid fa-pen-to-square"></i> Edit
                        </button>
                        <button
                          className="dropdown-item text-danger p-1"
                          onClick={() => handleShow(recipe)}
                        >
                          <i className="fa-solid fa-trash"></i> Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
