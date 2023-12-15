import './App.css';
import Todolist from './components/Todotask';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Updatetask from './components/updatetask';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
           <Route path="/" element={<Todolist/>}/>
           <Route path="update/:id" element={<Updatetask/>}/>
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
