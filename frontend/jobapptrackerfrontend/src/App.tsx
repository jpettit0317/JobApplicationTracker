import './App.css';
import { LoginPage } from './components/login/LoginPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
