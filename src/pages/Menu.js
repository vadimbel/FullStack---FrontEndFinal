import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';

/**
 * This page is the main page, display 3 options : 'products', 'customers', 'purchases'. Every option is a page in the app.
 * @returns
 */
export const Menu = () => {
  
  return (
    <div>
        <Link to='/products'>Products</Link>          <br></br>
        <Link to='/customers'>Customers</Link>        <br></br>
        <Link to='/purchases'>purchases</Link>        <br></br>
    </div>
  )
}
