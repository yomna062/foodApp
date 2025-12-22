import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'

export default function CategoryData({
  isEdit,
  category,
  closeModal,
  refreshCategories,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isEdit && category) {
      setValue('name', category.name)
    }
  }, [isEdit, category])

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await axios.put(
          `https://upskilling-egypt.com:3006/api/v1/category/${category.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        toast.success('Category updated successfully')
      } else {
        await axios.post(
          `https://upskilling-egypt.com:3006/api/v1/category`,
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        toast.success('Category added successfully')
      }

      refreshCategories()
      closeModal()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Category Name"
          {...register('name', { required: 'Category name is required' })}
        />
        {errors.name && (
          <small className="text-danger">{errors.name.message}</small>
        )}
      </div>

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
