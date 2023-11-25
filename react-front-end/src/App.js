import './App.css';
import { Route, Routes } from 'react-router-dom';
import { OrganizationList } from './components/OrganizationList';
import Profile from "./components/Profile"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OrganizationList />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </> 
  );
}

export default App;
