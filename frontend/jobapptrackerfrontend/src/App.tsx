import './App.css';
import { LoginPage } from './components/login/LoginPage';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SignUpPage } from './components/signup/SignUpPage';
import { RoutePath
 } from './enums/RoutePath_enum';
import { JobAppListPage } from './components/jobapplist/JobAppListPage';
 
 function App() {
  const router = createBrowserRouter([
    {
      path: RoutePath.home,
      element: <LoginPage />
    },
    {
      path: RoutePath.login,
      element: <LoginPage />
    },
    {
      path: RoutePath.signup,
      element: <SignUpPage />
    },
    {
      path: RoutePath.jobapplist,
      element: <JobAppListPage />
    }
  ])

  return (
    <div className="App">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
