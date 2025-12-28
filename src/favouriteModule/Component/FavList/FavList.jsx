// ================= FavList.jsx =================
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function FavList() {
  const [favList, setFavList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const BASE_URL = 'https://upskilling-egypt.com:3006';

  // ================= Get Favourite Recipes =================
  const getFavList = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      const { data } = await axios.get(`${BASE_URL}/api/v1/userRecipe/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavList(data.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load favourite recipes');
    } finally {
      setLoading(false);
    }
  };

  // ================= Remove from Favourite (API) =================
  const removeFav = async (favId, recipeName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('User not authenticated');

      // حذف العنصر
      await axios.delete(`${BASE_URL}/api/v1/userRecipe/${favId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`"${recipeName}" removed from favourites`);
      navigate('/dashboard/recipes-list')

   
      const { data } = await axios.get(`${BASE_URL}/api/v1/userRecipe/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFavList(data.data || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from favourites');
      
    }
  };

  useEffect(() => {
    getFavList();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (favList.length === 0)
    return <p className="text-center mt-5">No favourite recipes yet</p>;

  return (
    <div className="container mt-4">
      <h4 className="mb-3">My Favourite Recipes ❤️</h4>
      <div className="row">
        {favList.map(({ id, recipe }) => {
          const imgSrc = recipe.imagePath.startsWith('http')
            ? recipe.imagePath
            : `${BASE_URL}/${recipe.imagePath}`;

          return (
            <div className="col-md-4 mb-3" key={id}>
              <div className="card h-100 shadow-sm">
                <div style={{ position: 'relative' }}>
                  <img
                    src={imgSrc}
                    className="card-img-top"
                    alt={recipe.name}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  {/* Heart Icon for removing */}
                  <i
                    className="fa-solid fa-heart text-danger cursor-pointer"
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      fontSize: '20px',
                      textShadow: '0 0 5px black',
                    }}
                    onClick={() => removeFav(id, recipe.name)}
                  />
                </div>

                <div className="card-body">
                  <h6>{recipe.name}</h6>
                  <p className="mb-1">{recipe.price} EGP</p>
                  <p
                    className="text-truncate"
                    style={{ maxWidth: '100%' }}
                    title={recipe.description}
                  >
                    {recipe.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
