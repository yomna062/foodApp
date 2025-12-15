import React, { useEffect, useState } from 'react';
import Header from '../../../Shared/Components/Header/Header';
import headerimg2 from '../../../assets/images/header2.png';
import axios from 'axios';
import NoData from '../../../Shared/Components/NoData/NoData';

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      console.log('Categories API Response:', response.data);
      setCategories(response.data.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories');
      setLoading(false);
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

      <div className="container mt-4">
        {loading && <p>Loading categories...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead className="bg-danger text-white">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Creation Date</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <tr key={category.id}>
                      <th scope="row">{category.id}</th>
                      <td>{category.name}</td>
                      <td>{category.creationDate}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">
                      <NoData/>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
