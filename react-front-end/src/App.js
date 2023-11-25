import './App.css';
import { Route, Routes } from 'react-router-dom';
import { OrganizationList } from './components/OrganizationList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OrganizationList />} />
      </Routes>
    </>
  );
}

export default App;
