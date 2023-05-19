import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getData, delDuplicate, getAllPurchaseDates } from '../utils';
import { Add } from '../components/Add';

/**
 * 
 * Customers page - will display two areas :
 * area 1 :
 * table display what products on what dates every customer bought.
 * area 2 :
 * add purchase for choosen customer
 * @returns
 */
export const Customers = () => {
  
  // store data
  const customers = useSelector((state) => state.customers)
  const purchases = useSelector((state) => state.purchases)
  const products = useSelector((state) => state.products)

  // combo box with customers name + 'Add' component will appear only after user clicks on 'Buy product' button
  const [rightRegionForm, setRightRegionForm] = useState(false)
  // after user clicks on 'Buy product' button -> set the first value to be the first customer from store
  const [selectedCust, setSelectedCust] = useState(customers[0].id)

  const dispatch = useDispatch();

  return (
    <div>
      {/* left side of 'customer' page */}
      <div style={{width: "49%", float:"left"}} >
        <table border='1'>
          {/* table head - all titles: */}
          <thead>
            {/* titles : */}
            <tr>
              <td>Customers:  </td>
              <td>Customer Products:  </td>
              <td>Purchase Date</td>
            </tr>
          </thead>
          {/* table body */}
          <tbody>
            {
              // for eact customer
            customers.map((cust) => {
              // get all products that bought by the customer
              const customerProducts = getData(cust.id, purchases, products, customers, 'customer')
              // remove duplicate
              const noDuplicate = delDuplicate(customerProducts)
              // for every customer display :
              return <tr key={cust.id}>
                {/* customer name */}
                <td>{cust.fname} - {cust.lname}</td>
                <td>
                  {/* list of all products that been bought by the customer */}
                  <ul>
                  {
                    noDuplicate.map((prod, index) => {
                      return <li key={index}><a href={`/edit/${prod.id}/${'product'}`}>{prod.name}</a></li>
                    })
                  }
                  </ul>
                </td>
                <td>
                {
                  // for every product (prod) that some customer (cust) bought
                  noDuplicate.map((prod) => {
                  let dates = getAllPurchaseDates(prod.id, cust.id, purchases)
                  // create a list
                  return <ul key={prod.id}>
                    {
                      dates.map((date, index) => {
                        // and display the date of the purchase
                        return <li key={index}>{date}</li>
                      })
                    }
                  </ul>

                })
                }
                </td>
              </tr>
            })
            }
          </tbody>
        </table>
      </div>
      {/* right area */}
      <div style={{width: "49%", float:"right"}} >
        {/* Buy products button */}
        <button onClick={() => setRightRegionForm(!rightRegionForm)}>Buy Product</button>
        {
          // after user clicks on 'Buy product' button -> a combo box with customers names will appear + 'Add' component
          rightRegionForm && <div>
                                Add product to customer:    <br></br>
                                <select onChange={(e) => setSelectedCust(e.target.value)}>
                                  {
                                    customers.map((cust) => {
                                      return <option key={cust.id} value={cust.id}>{cust.fname} - {cust.lname}</option>
                                    })
                                  }
                                </select>       <br></br>
                                <Add data={selectedCust} prod={products}></Add>
                             </div>
        }
      </div>
    </div>
  )
}
