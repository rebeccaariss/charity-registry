import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom"
import { OrganizationList } from "./routes/OrganizationList";
import Profile from "./routes/Profile"
import Feed from "./routes/Feed"

function App() {
  return (
    <Routes>
      <Route path="api/projects/followed-projects" element={<Feed />} />
      <Route path="/" element={<OrganizationList />} />
      <Route path="/profile/:id" element={<Profile />} />
    </Routes>
  );
}

export default App;
