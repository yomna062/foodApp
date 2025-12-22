// ================= RecipesData.jsx =================
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function RecipesData() {
  const navigate = useNavigate()
  const { recipeId } = useParams() // لو موجود يبقى Edit
  const [categories, setCategories] = useState([])
  const [tagsList, setTagsList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recipeData, setRecipeData] = useState(null)

  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  // ================= GET CATEGORIES =================
  const getAllCategories = async () => {
    try {
      const res = await axios.get(
        'https://upskilling-egypt.com:3006/api/v1/category/?pageSize=10&pageNumber=1',
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setCategories(res.data.data || [])
    } catch (err) {
      setError('Failed to load categories')
    }
  }

  // ================= GET TAGS =================
  const getAllTags = async () => {
    try {
      const res = await axios.get(
        'https://upskilling-egypt.com:3006/api/v1/tag/',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            accept: 'application/json',
          },
        }
      )
      setTagsList(res.data)
    } catch (err) {
      console.log('Tags Error ❌', err)
    }
  }

  // ================= GET RECIPE DATA (Edit) =================
  const getRecipeData = async (id) => {
    try {
      const res = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      setRecipeData(res.data)
      // Set form values
      setValue('name', res.data.name)
      setValue('description', res.data.description)
      setValue('price', res.data.price)
      setValue('tagId', res.data.tag?.id)
      setValue('categoryId', res.data.category?.id)
    } catch (err) {
      toast.error('Failed to load recipe data')
    }
  }

  useEffect(() => {
    getAllCategories()
    getAllTags()
    if (recipeId) getRecipeData(recipeId)
    setLoading(false)
  }, [recipeId])

  // ================= FORM DATA =================
  const appendToFormData = (data) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('price', data.price)
    formData.append('tagId', data.tagId)
    formData.append('categoriesIds', data.categoryId)

    if (data.image && data.image.length > 0) {
      formData.append('recipeImage', data.image[0])
    }

    return formData
  }

  // ================= SUBMIT =================
  const onSubmit = async (data) => {
    try {
      const formData = appendToFormData(data)
      let response

      if (recipeId) {
        // Edit
        response = await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
      } else {
        // Add
        response = await axios.post(
          'https://upskilling-egypt.com:3006/api/v1/Recipe/',
          formData,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        )
      }

      toast.success(response.data.message)
      navigate('/dashboard/recipes-list')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  if (loading) return <p className="text-center mt-5">Loading...</p>
  if (error) return <p className="text-danger text-center mt-5">{error}</p>

  return (
    <>
      {/* HEADER */}
      <div className="dashboard-details d-flex flex-column flex-md-row align-items-center p-4 p-md-5 justify-content-between my-3 rounded-4 shadow-sm bg-white">
        <div className="caption w-50">
          <h4>
            {recipeId ? 'Edit' : 'Add'} <span className="secondary-color">Recipe!</span>
          </h4>
          <p className="text-muted mb-0">
            {recipeId
              ? 'Update your recipe using the form below.'
              : 'Fill the meals easily using the form.'}
          </p>
        </div>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center mt-5">
        <div className="bg-white w-75 p-5 rounded-4 shadow-sm">

          {/* RECIPE NAME */}
          <div className="mb-3">
            <input
              {...register('name', { required: 'Recipe name is required' })}
              type="text"
              className="form-control py-2 input-bg-custom"
              placeholder="Recipe Name"
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          {/* TAG SELECT */}
          <div className="mb-3">
            <select
              {...register('tagId', { required: 'Tag is required' })}
              className="form-select py-2 input-bg-custom"
            >
              <option value="">Tag</option>
              {tagsList?.map(tag => (
                <option key={tag.id} value={tag.id}>{tag.name}</option>
              ))}
            </select>
            {errors.tagId && <small className="text-danger">{errors.tagId.message}</small>}
          </div>

          {/* PRICE */}
          <div className="mb-3">
            <div className="input-group">
              <input
                {...register('price', { required: 'Price is required' })}
                type="number"
                step="0.01"
                className="form-control py-2 input-bg-custom"
                placeholder="350.99"
              />
              <span className="input-group-text bg-white border-start-0 text-muted">EGP</span>
            </div>
            {errors.price && <small className="text-danger">{errors.price.message}</small>}
          </div>

          {/* CATEGORY */}
          <div className="mb-3">
            <select
              {...register('categoryId', { required: 'Category is required' })}
              className="form-select py-2 input-bg-custom"
            >
              <option value="">Categ</option>
              {categories?.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <small className="text-danger">{errors.categoryId.message}</small>}
          </div>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <textarea
              {...register('description', { required: 'Description is required' })}
              className="form-control input-bg-custom"
              placeholder="Description *"
              rows="5"
            ></textarea>
            {errors.description && <small className="text-danger">{errors.description.message}</small>}
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mb-4">
            <label htmlFor="recipeImage" className="upload-container w-100 py-4 text-center d-block">
              <div className="text-muted">
                <i className="fa-solid fa-upload fs-3 mb-2 text-dark"></i>
                <p className="mb-0">
                  Drag & Drop or <span className="text-success fw-bold">Choose a Item Image</span> to Upload
                </p>
              </div>
              <input
                {...register('image')}
                type="file"
                id="recipeImage"
                className="d-none"
                accept="image/*"
              />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/recipes-list')}
              className="btn btn-outline-success px-5"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success px-5 text-white">
              {recipeId ? 'Update Recipe' : 'Add Recipe'}
            </button>
          </div>

        </div>
      </form>
    </>
  )
}
