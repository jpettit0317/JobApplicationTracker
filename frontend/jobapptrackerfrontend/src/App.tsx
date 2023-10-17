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
import { AddJobAppPage } from './components/addJobApp/AddJobAppPage';
import { ViewJobAppPage } from './components/viewJobApp/ViewJobAppPage';
import { EditJobAppPage } from './components/editjobApp/EditJobAppPage';
import { ErrorRoute } from './components/errorroute/ErrorRoute';
 
const App = () => {
  const router = createBrowserRouter([
    {
      path: RoutePath.home,
      element: <LoginPage />,
      errorElement: <ErrorRoute />
    },
    {
      path: RoutePath.login,
      element: <LoginPage />,
      errorElement: <ErrorRoute />
    },
    {
      path: RoutePath.signup,
      element: <SignUpPage />,
      errorElement: <ErrorRoute />
    },
    {
      path: RoutePath.jobapplist,
      element: <JobAppListPage />,
      errorElement: <ErrorRoute />
    },
    {
      path: RoutePath.addJobApp,
      element: <AddJobAppPage />,
      errorElement: <ErrorRoute />
    },
    {
      path: RoutePath.viewJobAppPath,
      element: <ViewJobAppPage id=""/>,
      errorElement: <ErrorRoute /> 
    },
    {
      path: RoutePath.editJobAppPath,
      element: <EditJobAppPage />,
      errorElement: <ErrorRoute />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} /> 
    </div>
  );
}

export default App;
