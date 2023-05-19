import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { delDup } from '../utils';

export const Purchases = () => {
  
  // get data from store
  const customers = useSelector((state) => state.customers)
  const purchases = useSelector((state) => state.purchases)
  const products = useSelector((state) => state.products)

  // selected customer/product from comboboxes
  const [selectedCust, setSelectedCust] = useState(0)
  const [selectedProd, setSelectedProd] = useState(0)
  const [selectedYear, setSelectedYear] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [selectedDay, setSelectedDay] = useState(0)

  // data that will be displayed on the table in the right area
  const [objToDisplay, setObjToDisplay] = useState([])

  // right area table will appear only after user click on 'search' button
  const [displayTable, setDisplayTable] = useState(false)

  useEffect(() => {
    
  }, [objToDisplay])
  

  const handleSearch = () => {
    // every click on 'search' button will display new data in table
    setObjToDisplay([])
    // table will appear only after first click on 'search' button
    setDisplayTable(true)

    let dates = []
    let cust = []
    let prod = []

    // customer & product & date is selected -> display specific customer that boguht specific product in specific date
    if(selectedCust != 0 && selectedProd != 0 && selectedYear != 0 && selectedMonth != 0 && selectedDay != 0) {
      // only need check if specific customer that boguht specific product in specific date and display on table
      let checkPurchase = false;

      purchases.map((purchase) => {
        // date from 'purchase' json
        const dateArray = purchase.date.split("/")
        // check if select customer bought selected product in selected date
        if(purchase.customerId == selectedCust && purchase.productId == selectedProd && selectedDay == dateArray[0] && selectedMonth == dateArray[1] && 
          selectedYear == dateArray[2]) {
            checkPurchase = true
            return true
          }
      })

      // if selected customer bought the selected product on selected date, then we will add this to 'objToDisplay'
      if(checkPurchase) {
        // find customer name
        const customerName = customers.find((cus) => cus.id == selectedCust)
        // find product name
        const productName = products.find((pro) => pro.id == selectedProd)
        // create object and add it
        const obj = {customerName: [customerName.fname + "-" + customerName.lname], productName: [productName.name], dates: [selectedDay+"/"+selectedMonth+"/"+selectedYear]}
        setObjToDisplay([obj]);
      }
    }
    // product & date selected (not customer) -> display all customers that bought specific product on specific date
    else if(selectedCust == 0 && selectedProd != 0 && selectedYear != 0 && selectedMonth != 0 && selectedDay != 0) {
      // find all customers that bought selected product
      purchases.map((purchase) => {
        // date from 'purchase' json
        const dateArray = purchase.date.split("/")
        if(purchase.productId == selectedProd && selectedDay == dateArray[0] && selectedMonth == dateArray[1] && selectedYear == dateArray[2]) {
          cust.push(purchase.customerId)
        }
      })
      // delete duplicate instances
      cust = delDup(cust)
      // get customers names
      let names = []
      for(let i=0; i<cust.length; i++) {
        for(let j=0; j<customers.length; j++) {
          if(cust[i] == customers[j].id) {
            names.push(customers[j].fname + "-" + customers[j].lname)
            break
          }
        }
      }
      // find product name
      let productName = products.find((prod) => prod.id == selectedProd)
      // create object and add it
      const obj = {customerName: names, productName: [productName.name], dates: [selectedDay+"/"+selectedMonth+"/"+selectedYear]}
      setObjToDisplay([obj]);
    }
    // customer & date selected (not product) -> display all products that been bought by specific customer on specific date
    else if(selectedCust != 0 && selectedProd == 0 && selectedYear != 0 && selectedMonth != 0 && selectedDay != 0) {
      // find all products that bought by selected customer
      purchases.map((purchase) => {
        // date from 'purchase' json
        const dateArray = purchase.date.split("/")
        if(purchase.customerId == selectedCust && selectedDay == dateArray[0] && selectedMonth == dateArray[1] && selectedYear == dateArray[2]) {
          prod.push(purchase.productId)
        }
      })
      // delete duplicate instances
      prod = delDup(prod)
      // get products names
      let names = []
      for(let i=0; i<prod.length; i++) {
        for(let j=0; j<products.length; j++) {
          if(prod[i] == products[j].id) {
            names.push(products[j].name)
            break
          }
        }
      }
      // find customer name
      let customerName = customers.find((prod) => prod.id == selectedCust)
      // create object and add it
      const obj = {customerName: [customerName.fname + "-" + customerName.lname], productName: names, dates: [selectedDay+"/"+selectedMonth+"/"+selectedYear]}
      setObjToDisplay([obj]);
    }
    // only date is selected -> display for each customer - his products that been bought in specific date
    else if(selectedCust == 0 && selectedProd == 0 && selectedYear != 0 && selectedMonth != 0 && selectedDay != 0) {
      // find all customers that bought on selected date
      purchases.map((purchase) => {
        // date from 'purchase' json
        const dateArray = purchase.date.split("/")
        if(selectedDay == dateArray[0] && selectedMonth == dateArray[1] && selectedYear == dateArray[2]) {
          // save customers and the product they bought in same index in the two arrays (customer: cust[i] bought product: prod[i])
          cust.push(purchase.customerId)
          prod.push(purchase.productId)
        }
      })
      // find customers names
      let customersNames = []
      cust.map((c) => {
        customers.map((cus) => {
          if(cus.id == c) {
            customersNames.push(cus.fname + "-" + cus.lname)
          }
        })
      })
      // find products names
      let productsNames = []
      prod.map((p) => {
        products.map((pro) => {
          if(p == pro.id) {
            productsNames.push(pro.name)
          }
        })
      })
      console.log(customersNames)
      console.log(productsNames)
      // create object to display on table
      const obj = {customerName: customersNames, productName: productsNames, dates: [selectedDay+"/"+selectedMonth+"/"+selectedYear]}
      setObjToDisplay([obj]);
    }
    // only customer selected -> display all products and dates for each product
    else if(selectedCust != 0 && selectedProd == 0 && (selectedYear == 0 || selectedMonth == 0 || selectedDay == 0) ) {
      // run on 'purchases' data and store all products and dates the were bought by selected customer
      purchases.map((purchase) => {
        if(purchase.customerId == selectedCust) {
          // save product and date in same index in the two arrays (selected customer bought - product: prod[i] in date: dates[i])
          prod.push(purchase.productId)
          dates.push(purchase.date)
        }
      })
      // get the name of the customer
      let custName = customers.find((c) => c.id == selectedCust)
      // get all names of the products
      let productsNames = []
      for(let i=0; i<prod.length; i++) {
        for(let j=0; j<products.length; j++) {
          if(prod[i] == products[j].id) {
            productsNames.push(products[j].name)
            break
          }
        }
      }
      // create object to display on table
      const obj = {customerName: [custName.fname + "-" + custName.lname], productName: productsNames, dates: dates}
      setObjToDisplay([obj]); 
    }
    // only product selected -> display all customers and date of purchase the chosen product
    else if(selectedCust == 0 && selectedProd != 0 && (selectedYear == 0 || selectedMonth == 0 || selectedDay == 0) ) {
      // run on 'purchases' data and store all customers and dates that selected product was bought
      purchases.map((purchase) => {
        if(purchase.productId == selectedProd) {
          // save customer and date in same index in the two arrays (selected product bought - customer: cust[i] in date: dates[i])
          cust.push(purchase.customerId)
          dates.push(purchase.date)
        }
      })
      // get the name of the selected product
      let productName = products.find((p) => p.id == selectedProd)
      // get all names of customers
      let customersNames = []
      for(let i=0; i<cust.length; i++) {
        for(let j=0; j<customers.length; j++) {
          if(cust[i] == customers[j].id) {
            customersNames.push(customers[j].fname + "-" + customers[j].lname)
            break
          }
        }
      }
      // create object to display on table
      const obj = {customerName: customersNames, productName: [productName.name], dates: dates}
      setObjToDisplay([obj]); 
    }
    else {
      console.log("handleSearch - else statement")
    }
  }

  return (
    <div>
      {/* left area of page : */}
      <div style={{width: "49%", float:"left"}} >
        {/* products combo box */}
        Products : 
        <select onChange={(e) => setSelectedProd(e.target.value)}>
          <option></option>
          {
            products.map((prod) => {
              return <option key={prod.id} value={prod.id}>{prod.name}</option>
            })
          }
        </select>   <br></br>
        {/* customers combo box */}
        Customers :
        <select onChange={(e) => setSelectedCust(e.target.value)}>
          <option value={0}></option>
          {
            customers.map((cust) => {
              return <option key={cust.id} value={cust.id}>{cust.fname} - {cust.lname}</option>
            })
          }
        </select>   <br></br>
        {/* inputs for year, month and day + search button */}
        Year: <input type='text' onChange={(e) => setSelectedYear(e.target.value)}></input>     <br></br>
        Month: <input type='text' onChange={(e) => setSelectedMonth(e.target.value)}></input>    <br></br>
        Day: <input type='text' onChange={(e) => setSelectedDay(e.target.value)}></input>      <br></br>
        <button onClick={() => handleSearch()}>Search</button>
        </div>
        {/* right area - display the data selected in the left area */}
        <div style={{width: "49%", float:"right"}} >
          {
            // 'displayTable' - table will be displayed only after user clicks on 'searc' button in the left area
            displayTable && <div>
                              <table border='1'>
                                <thead>
                                  <tr>
                                    <td>Customers:  </td>
                                    <td>Customer Products:  </td>
                                    <td>Purchase Date</td>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                  objToDisplay.map((obj, index) => {
                                    return <tr key={index}>
                                            <td>
                                              <ul>
                                              {
                                                obj?.customerName.map((cust, index) => {
                                                  return <li key={index}>{cust}</li>
                                                })
                                              }
                                              </ul>
                                            </td>
                                            <td>
                                              <ul>
                                              {
                                                obj?.productName.map((prod, index) => {
                                                  return <li key={index}>{prod}</li>
                                                })
                                              }
                                              </ul>
                                            </td>
                                            <td>
                                              <ul>
                                              {
                                                obj?.dates.map((date, index) => {
                                                  return <li key={index}>{date}</li>
                                                })
                                              }
                                              </ul>
                                            </td>
                                           </tr>
                                  })
                                }
                                </tbody>
                              </table>
                            </div>
          }

        </div>
      
    </div >
  )
}
