
/**
 * Method finds all 'products' that bought by customer with 'id'.
 * @param {*} id 
 * @param {*} purchases 
 * @param {*} products 
 * @returns 
 */
const getProducts = (id, purchases, products) => {

  // new array to save all neccery data
  let dataObj = [];

  for (let i=0; i<purchases.length; i++) {
    if (purchases[i].customerId == id) {
      for (let j=0; j<products.length; j++) {
        if (purchases[i].productId == products[j].id) {
          dataObj.push({id: products[j].id, name: products[j].name, price: products[j].price, quantity: products[j].quantity})
          break
        }
      }
    }
  }
  return dataObj
};


const getData = (id, purchases, products, customers, type) => {
  
  let data = []

  if(type == 'customer') {
    for (let i=0; i<purchases.length; i++) {
      if (purchases[i].customerId == id) {
        for (let j=0; j<products.length; j++) {
          if (purchases[i].productId == products[j].id) {
            data.push({id: products[j].id, name: products[j].name, price: products[j].price, quantity: products[j].quantity})
            break
          }
        }
      }
    }
  }
  else {
    // find all customers that bought product with 'id'
    for (let i = 0; i < purchases.length; i++) {
      // loop on 'purchases' and find all purchases of product with 'id'
      if (purchases[i].productId == id) {
        // when finds purchase of product with 'id'
        for (let j = 0; j < customers.length; j++) {
          // serach the 'customers' and find all data of the customer that bought the product with 'id'
          if (purchases[i].customerId == customers[j].id) {
            // push all the data to the array created at the beggining of the fucntion 
            data.push({id: customers[j].id, fname: customers[j].fname, lname: customers[j].lname, date: purchases[i].date})
            break
          }
        }
      }
    }
  }
  
  return data
}

const delDuplicate = (items) => {
  const noDup = items.reduce((acc, curr) => {
    
    if (!acc.find((item) => item.id === curr.id)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  
  return noDup
}

const delDup = (items) => {
  return Array.from(new Set(items));
}

/**
 * Function finds product/customer with id, and return all data
 * @param {*} id 
 * @param {*} type 
 * @param {*} products 
 * @param {*} customers 
 * @returns 
 */
const getCurrentData = (id, type, products, customers) => {
  console.log("getCurrebtData runs")
  let data
  if(type === 'product') {
    data = products.find(prod => prod.id == id)
  }
  else {
    data = customers.find(cust => cust.id == id)
  }
  return data
}

/**
 * Gets all dates of purchased product with id: 'prodId' by a customer with id: 'custId'
 * @param {} prodId 
 * @param {*} custId 
 * @param {*} purchases 
 * @returns 
 */
const getAllPurchaseDates = (prodId, custId, purchases) => {
  let dates = []
  purchases.map((purchase) => {
    if(purchase.productId == prodId && purchase.customerId == custId) {
      dates.push(purchase.date)
    }
  })
  return dates
}

export { getProducts, getData, delDuplicate, getCurrentData, getAllPurchaseDates, delDup}
