import './App.css';
import Home from './pages/Home';
import {Routes , Route} from "react-router-dom" 
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';

function App() {
  return (
    <div className="app">
         <Routes>
           <Route path="/" element={ <Home />} />
           <Route path="/addUser" element= { <AddUser /> } />
           <Route path="/editUser/:id" element= { <EditUser /> } />
          </Routes>
    </div>
  );
}

export default App;
