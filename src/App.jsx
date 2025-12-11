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
import Dashboard from './Shared/Components/Dashboard/Dashboard';

// Recipes
import RecipesList from './RecipeModule/Components/RecipesList/RecipesList';
import RecipeData from './RecipeModule/Components/RecipesData/RecipesData';

// Categories
import CategoriesList from './CategoriesModule/Components/CategoryList/CategoryList';
import CategoryData from './CategoriesModule/Components/CategoryData/CategoryData';

// Users
import UsersList from './UserModule/Components/UsersList/UsersList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'Register', element: <Register /> },
        { path: 'Login', element: <Login /> },
        { path: 'ChangePass', element: <ChangePass /> },
        { path: 'verifyAccount', element: <VerifyAccount /> },
        { path: 'ResetPass', element: <ResetPass /> },
        { path: 'ForgetPass', element: <ForgetPass /> },
      ],
    },
    {
      path: 'dashboard',
      element: <MasterLayout />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: 'recips', element: <RecipesList /> },
        { path: 'Recipe-Data', element: <RecipeData /> },
        { path: 'categories', element: <CategoriesList /> },
        { path: 'category-data', element: <CategoryData /> },
        { path: 'users', element: <UsersList /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
