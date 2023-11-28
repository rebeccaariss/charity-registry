import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { OrganizationList } from "./components/OrganizationList";
import Profile from "./components/Profile";
import { CreateOrg } from "./components/CreateOrg";
import DonationList from "./components/DonationList";
import Feed from "./routes/Feed" 
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
