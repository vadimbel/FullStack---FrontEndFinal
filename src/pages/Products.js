
import { useEffect, React, useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Add } from '../components/Add';
import { getData } from '../utils';

/**
 * This is the 'products' page. Contains a list of the products from our store, and all data under. under every product all customers that bought this 
 * product will be displayed with the date of the purchase. 'Add' button will be placed under every customer for adding products.
 * @returns
 */
export const Products = () => {
  
  // load store data using 'useSelector'
  const purchases = useSelector((state) => state.purchases)
  const products = useSelector((state) => state.products)
  const customers = useSelector((state) => state.customers)

  const [check, setCheck] = useState(0)

  // sum of all purchases - will be displayed on the left area of 'products' page.
  const [totalAmount, setTotalAmount] = useState(0)

  // every time our 'products'/'purchases' is changed -> we want to update our 'totalAmount' (sum of all purchases).
  useEffect(() => {
    let sum = 0;
    // loop on all 'purchases' and sum the prices
    purchases.forEach((purchase) => {
      const product = products.find((p) => p.id == purchase.productId);
      
      if (product) {
        sum += product.price;
      }
    });
    console.log("use effect Product render")
    // update 'totalAmount'
    setTotalAmount(sum);
  }, [purchases, products])

  return (
    <div>
      {/* Area 1 - contains the total amount of all purchesed */}
      <div style={{width: "49%", float:"left"}} >
        {totalAmount}
        <br></br>
        <button onClick={() => setCheck(check+1)}>display</button>
      </div>

      {/* Area 2 */}
      <div style={{width: "49%", float:"right"}} >
        {
          products.map((prod) => {
            // get all customers that bought 'prod' with 'id'
            let cust = getData(prod.id, purchases, products, customers, 'product')

            // right area of the page - contains all products from store and data of products
            return <div key={prod.id}>
                    {/* product name as link -> redirect to 'editProduct' page */}
                    <Link to={`/edit/${prod.id}/product`}>{prod.name}</Link>     <br></br>
                    {/* product price */}
                    Price: {prod.price}                                         <br></br>
                    {/* product quantity */}
                    Quantity: {prod.quantity}                                   <br></br>
                    {/* all customers that bought the product */}
                    <strong>Customers:</strong>                                 <br></br><br></br>
                    {
                      cust.map((c, index) => {
                        return <div key={index}>
                              {/* link of customers names that bought the specific product -> redirect to 'editCustomer' page */}
                              <Link to={`/edit/${c.id}/customer`}>{c.fname} - {c.lname}<br></br></Link>
                              {/* date that current specific customer bought the product */}
                              Purchase Date: {c.date}                       <br></br>
                              {/* add button - that opend a new region for adding new item for customer */}
                              <Add data={c.id} prod={products}/>
                              <br></br>
                              </div>
                      })
                    }
                    <br></br>
                   </div>
          })
        }
      </div>
    </div>
  )
}
