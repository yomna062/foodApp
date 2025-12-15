import React, { useEffect, useState } from 'react'
import Header from '../../../Shared/Components/Header/Header'
import headerimg2 from '../../../assets/images/header2.png'
import axios from 'axios'

export default function RecipesList() {
  const [recipesList, setRecipesList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

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

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  useEffect(() => {
    getAllRecipes()
  }, [])

  return (
    <>
      <Header
        title="Recipes"
        subtitle="Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgUrl={headerimg2}
        altText="Recipes Header Image"
        minHeight="200px"
        imgWidth="50"
      />

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
                    ></i>

                    {openMenuId === recipe.id && (
                      <div className='p-3 border-1 bg-light'
                        style={{
                          position: 'absolute',
                          right: 0,
                          top: '25px',
                          borderRadius: '6px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          zIndex: 10,
                        }}
                      >   <button className="dropdown-item text-success p-1"> <i className="fa-solid fa-eye"></i>view</button>
                       
                        <button className="dropdown-item p-1"><i className="fa-solid fa-pen-to-square"></i> Edit</button>
                        <button className="dropdown-item text-danger p-1">
                          <i className="fa-solid fa-trash"></i>
                          Delete
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
