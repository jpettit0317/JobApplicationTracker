import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './components/navbar/NavBar';
import { LoginPage } from './components/Login/LoginPage';

function App() {
  return (
    <div className="App">
      <LoginPage />
    </div>
  );
}

export default App;
