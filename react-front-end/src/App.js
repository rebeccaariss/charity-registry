import './App.css';

import { Route, Routes } from "react-router-dom"
import  ProjectList  from "./components/ProjectList"
import 'bootstrap/dist/css/bootstrap.min.css';
import { OrganizationList } from './components/OrganizationList';
import Profile from "./components/Profile"

function App() {
  return (
    <Routes>
     <Route path='api/projects/followed-projects' element={<ProjectList />} />
     <Route path="/" element={<OrganizationList />} />
     <Route path="/Profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
