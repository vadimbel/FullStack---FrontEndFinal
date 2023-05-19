import {useState} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Menu } from './pages/Menu';
import { Products } from './pages/Products';
import { Customers } from './pages/Customers'
import { Purchases } from './pages/Purchases'
import { Edit } from './pages/Edit';


/**
 * This page contains all routes of the app
 * @returns 
 */
function App() {
  
  return (
    <div>
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element={<Menu/>}></Route>
        <Route path='/products' element={<Products/>}></Route>
        <Route path='/edit/:id/:type' element={<Edit/>}></Route>
        <Route path='/customers' element={<Customers/>}></Route>
        <Route path='/purchases' element={<Purchases/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
