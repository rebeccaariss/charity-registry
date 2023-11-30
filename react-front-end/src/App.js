import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Landing from "./routes/Landing";
import Login from "./routes/Login";
import { OrganizationList } from "./components/OrganizationList";
import Profile from "./routes/Profile";
import { CreateOrg } from "./components/CreateOrg";
import DonationList from "./components/DonationList";
import Feed from "./routes/Feed";
import { EditOrg } from "./components/EditOrg";
import { CreateProject } from "./components/CreateProject";
import FundraiserProgressBar from "./components/FundraiserProgressBar";

function App() {
  return (
    <Routes>
      <Route path="api/projects/followed-projects" element={<Feed />} />
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/organizations" element={<OrganizationList />} />
      <Route path="/profile/:id" element={<Profile />} />
      <Route path="/profile/:id/create-project" element={<CreateProject />} />
      <Route path="/api/donations/user/:id" element={<DonationList />} />
      <Route path="/orgcreate" element={<CreateOrg />} />
      <Route path="/orgedit/:id" element={<EditOrg />} />
      <Route
        path="/api/fundraisers/:projectId"
        element={<FundraiserProgressBar />}
      />
    </Routes>
  );
}

export default App;
