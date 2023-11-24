import './App.css';
import {Route, Routes } from "react-router-dom"
import { component} from ".components/componet"


function App() {
  return (
    <Routes>
      <Route path="/" element={<component />} /> 
    <h1>Hello, world!</h1>
    </Routes>
  );
}

export default App;
