import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getData, delDuplicate, getCurrentData } from '../utils';

/**
 * This is 'editProduct'/'editCustomer' page. will display data according to 'type' ('customer'/'product' - get from 'useParams').
 * @returns 
 */
export const Edit = () => {
  
  const { id, type } = useParams();

  const dispatch = useDispatch();

  // create instance of navigator (will be used when deleting a product/customer)
  const navigate = useNavigate();

  // get data from store
  const purchases = useSelector((state) => state.purchases)
  const products = useSelector((state) => state.products)
  const customers = useSelector((state) => state.customers)

  // to display the right form (editProduct or editCustomer)
  const [prodFields, setProdFields] = useState(type === 'product' ? true : false)
  const [custFields, setCustFields] = useState(type === 'customer' ? true : false)

  // if 'type' == 'product' -> 'invertedType' = 'customer' (for redirect to right page)
  const [invertedType, setInvertedType] = useState(type == 'product' ? 'customer' : 'product')
  
  // when user on 'edit' (products/customer) page -> click on items (customer/product) -> page needs to switch from
  // 'editProcut' -> 'editCustomer' (and the opposite), for switching pages we use 'invertedType' that will be updated every time
  // 'type' is changed.
  useEffect(() => {
    setInvertedType(type == 'product' ? 'customer' : 'product')
  }, [type])

  // get all data (json) of current customer/product using 'getCurrentData' function from 'utils' file
  const [currentData, setCurrentData] = useState(getCurrentData(id, type, products, customers))

  // this useState is for saving the updated current product/customer data (after user modify data on the left area of the page)
  // at first will be initialize according to 'type' (products fields or customers fields)
  const [updatedData, setUpdatedData] = useState(type === 'product' ? 
            {id: id, name: currentData?.name, price: currentData?.price, quantity: currentData?.quantity} : 
            {id: id, fname: currentData?.fname, lname: currentData?.lname, city: currentData?.city})

  // all the data that supposed to be displayed on the right area of this page (using 'getData' function from 'utils' file)
  // all customers that bought product with 'id'  ||  all products that was bought by specific customer
  const data = getData(id, purchases, products, customers, type)
  
  // if customer bought some of the products more then one -> he will appear more then once on the right area (same for products).
  // delete all duplicate customers/products and leave only one appearence (using 'delDuplicate' from 'utils' file)
  const noDup = delDuplicate(data)

  // handle 'UPDATE CUSTOMER/PRODUCT' form submit
  const handleUpdate = (event) => {
    event.preventDefault();
    if(type == 'product') {
      dispatch({ type: 'UPDATE PRODUCT', payload: updatedData });
    } else {
      dispatch({ type: 'UPDATE CUSTOMER', payload: updatedData });
    }
  }

  // handles 'DELETE CUSTOMER/PRODUCT' form submit
  const handleDelete = (event) => {
    event.preventDefault();
    if(type == 'product') {
      dispatch({ type: 'DELETE PRODUCT', payload: id });
      navigate('/products')
    } else {
      dispatch({ type: 'DELETE CUSTOMER', payload: id });
      navigate('/products')
    }
    
  }

  return (
    <div>
        <div style={{width: "49%", float:"left"}}>
            {/* title for left area */}
            <strong>Update/Delete - {type} - {id}</strong>          <br></br>
            {/* editProduct */}
            {prodFields && <div>
                            <form>
                                Name: <input type='text' name='name' onChange={(event) => setUpdatedData({ ...updatedData, name: event.target.value })}></input>       <br></br>
                                Price: <input type='number' name='price' onChange={(event) => setUpdatedData({ ...updatedData, price: parseInt(event.target.value) })}></input>       <br></br>
                                Quantity: <input type='number' name='quantity' onChange={(event) => setUpdatedData({ ...updatedData, quantity: parseInt(event.target.value) })}></input>       <br></br>
                                <button type='submit' onClick={handleUpdate}>Update</button>
                                <button type='submit' onClick={handleDelete}>Delete</button>
                            </form>
                            </div>}
            {/* editCustomer */}
            {custFields && <div>
                            <form>
                                First Name: <input type='text' name='fname' onChange={(event) => setUpdatedData({ ...updatedData, fname: event.target.value })}></input>       <br></br>
                                Last Name: <input type='text' name='lname' onChange={(event) => setUpdatedData({ ...updatedData, lname: event.target.value })}></input>       <br></br>
                                City: <input type='text' name='city' onChange={(event) => setUpdatedData({ ...updatedData, city: event.target.value })}></input>       <br></br>
                                <button type='submit' onClick={handleUpdate}>Update</button>
                                <button type='submit' onClick={handleDelete}>Delete</button>
                            </form>
                            </div>}
            
        </div>
        {/* right area of 'edit' page, will display products/customer as links */}
        <div style={{width: "49%", float:"right"}}>
            {
                noDup.map((item) => {
                    return <div key={item.id}><Link to={`/edit/${item.id}/${invertedType}`}>{item?.name} {item?.fname} {item?.lname}</Link></div>
                })
            }
        </div>
    </div>
  )
}
