import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom"
import { OrganizationList } from "./routes/OrganizationList";
import Profile from "./routes/Profile"
import Feed from "./routes/Feed"
import { CreateOrg } from './components/CreateOrg'; 
import DonationList from "./components/DonationList"; 
import { EditOrg } from './components/EditOrg';
import { CreateProject } from './components/CreateProject'; 

function App() {
  return (
    <Routes>
      <Route path="api/projects/followed-projects" element={<Feed />} />
      <Route path="/" element={<OrganizationList />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/:id/create-project" element={<CreateProject />} />
      <Route path="/api/donations/user/:id" element={<DonationList />} />
      <Route path="/orgcreate" element={<CreateOrg />} /> 
      <Route path="/orgedit/:id" element={<EditOrg />} />
    </Routes>
  );
}

export default App;
