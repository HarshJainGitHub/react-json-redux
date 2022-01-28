import './App.css';
import Home from './pages/Home';
import {Routes , Route} from "react-router-dom" 
import AddUser from './pages/AddUser';

function App() {
  return (
    <div className="app">
         <Routes>
           <Route path="/" element={ <Home />} />
           <Route path="/addUser" element= { <AddUser /> } />
          </Routes>
    </div>
  );
}

export default App;
