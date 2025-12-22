import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

// Auth Module
import AuthLayout from './Shared/Components/AuthLayout/AuthLayout';
import Login from './AuthModule/Components/Login/Login';
import Register from './AuthModule/Components/Register/Register';
import ChangePass from './AuthModule/Components/ChangePass/ChangePass';
import VerifyAccount from './AuthModule/Components/VerifyAccount/VerifyAccount';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';
import ForgetPass from './AuthModule/Components/ForgetPass/ForgetPass';

// Shared
import NotFound from './Shared/Components/NotFound/NotFound';
import MasterLayout from './Shared/Components/MasterLayout/MasterLayout';

// Recipes
import RecipesList from './RecipeModule/Components/RecipesList/RecipesList';
import RecipeData from './RecipeModule/Components/RecipesData/RecipesData';

// Categories
import CategoriesList from './CategoriesModule/Components/CategoryList/CategoryList';
import CategoryData from './CategoriesModule/Components/CategoryData/CategoryData';

// Users
import UsersList from './UserModule/Components/UsersList/UsersList';

import Dashboard from './Dashboardmodule/Component/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Shared/Components/ProtectedRoute/ProtectedRoute';

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
       
        { path: 'verifyaccount', element: <VerifyAccount /> },
        { path: 'resetpass', element: <ResetPass /> },
        { path: 'forgetpass', element: <ForgetPass /> },
      ],
    },
    {
      path: 'dashboard',
      element: <ProtectedRoute><MasterLayout /></ProtectedRoute>,
      children: [
        { index: true, element: <Dashboard /> }, 
        { path: 'recipes-list', element: <RecipesList /> },
        { path: 'recipe-data', element: <RecipeData /> }, 
         { path: 'changepass', element: <ChangePass /> },
        { path: 'categories-list', element: <CategoriesList /> }, 
            { path: 'category-data', element: <CategoryData /> },          // ADD
        { path: 'category-data/:id', element: <CategoryData /> },
         { path: 'recipe-data', element: <RecipeData /> },          // ADD
        { path: 'recipe-data/:recipeId', element: <RecipeData /> } ,// EDIT ✅
        { path: 'users', element: <UsersList /> }, 
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-center" theme="colored"/>
    </>
  );
}

export default App;
