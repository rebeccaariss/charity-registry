import './App.css';
import { Route, Routes } from "react-router-dom"
import  ProjectList  from "./components/ProjectList"
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Routes>
     <Route path='api/projects/followed-projects' element={<ProjectList />} />
    </Routes>
  );
}

export default App;
