import './App.css';
import { LoginPage } from './components/login/LoginPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUpPage } from './components/signup/SignUpPage';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/signup",
      element: <SignUpPage />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
