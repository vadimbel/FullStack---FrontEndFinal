
import React,  { useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

/**
 * This component will be rendered when user clicks on 'add' button on 'products' page. The component will display a combobox
 * and 'save' button, then will add a new purchase for customer that the 'add' button was clicked.
 */

// 'add' component will be rendered only if 'data'/'prod' will be changed
const Add = React.memo(({data, prod}) => {
  
  // boolean variable for displaying 'Add' component ('Add' will be displayied only if user clicked on 'Add' button).
  const [visible, setVisable] = useState(false)

  // the item that user selects from combobox (at beginning will be the first product in store)
  const [item, setItem] = useState(prod[0])

  const dispatch = useDispatch()

  // will be activated when user change value from combobox
  const searchItem = (e) => {
    // set 'item' to be the selected value from combobox
    let obj = prod.find(item => item.name == e.target.value)
    setItem(obj)
  }

  // dispach - will be activated when user click on 'save' button
  const addItem = () => {
    // create new id - for new purchase
    const my_uuid = uuidv4();
    // create new date using 'date' object
    const currentDate = new Date();
    let newDate = currentDate.getDate()+"/"+(currentDate.getMonth() + 1)+"/"+currentDate.getFullYear()
    // create json to be added to store
    let obj = {id: my_uuid, customerId: data, productId: item.id, date: newDate}
    // add new value to my store
    dispatch({type: 'ADD', payload: obj})
  }

  return (
    <div>
        {/* click on add button will open new region contains a combobox with all products & save button */}
        <button onClick={() => setVisable(!visible)}>ADD</button>
        {visible && <div>
                  {/* combobox with all products */}
                      <select onChange={(e) => searchItem(e)}>
                        {
                          prod.map((p, index) => {
                            return <option key={index}>{p.name}</option>
                          })
                        }
                      </select>         <br></br>
                  {/* save button - activate 'addItem' function that will create new json and pass it to my store as payload */}
                      <button onClick={() => addItem()}>SAVE</button>
                    </div>}
    </div>
  )
});

export {Add};
