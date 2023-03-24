import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LoginPage } from './components/Login/LoginPage';
import { RegisterPage } from './components/Register/RegisterPage';
import { 
  createBrowserRouter,
  RouterProvider 
} from 'react-router-dom';
import { ErrorPage } from './components/errorpages/ErrorPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />
    },
    {
      path: "/register",
      element: <RegisterPage />,
      errorElement: <ErrorPage />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
