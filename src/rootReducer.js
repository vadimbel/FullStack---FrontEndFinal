// my store data
const storeData = {
    products: [
        {id: 111, name: "prod1", price: 5, quantity: 10},
        {id: 222, name: "prod2", price: 10, quantity: 5},
        {id: 333, name: "prod3", price: 15, quantity: 15},
    ],
    customers: [
        {id: 123123, fname: "vadim", lname: "bel", city: "haifa"},
        {id: 456456, fname: "david", lname: "goldberg", city: "tel-aviv"},
        {id: 777888, fname: "gadi", lname: "dahan", city: "Jerusalem"},
    ],
    purchases: [
        {id: 1, customerId: 123123, productId: 111, date: "05/04/22"},
        {id: 2, customerId: 456456, productId: 111, date: "05/04/22"},
        {id: 3, customerId: 123123, productId: 222, date: "06/04/22"},
        {id: 4, customerId: 123123, productId: 222, date: "05/04/22"},
        {id: 5, customerId: 777888, productId: 333, date: "05/04/22"},
        {id: 6, customerId: 123123, productId: 333, date: "08/04/22"},
    ]
  };

  // function that updates my store data
  const dataChanger = (state = storeData, action) => {
    switch (action.type) {
        // add new purhase to store
        case 'ADD':
            return { ...state, purchases: [...state.purchases, action.payload] };

        case 'UPDATE PRODUCT':
            const updatedProduct = action.payload;
            return { ...state, products: state.products.map((product) => {
                if (product.id == updatedProduct.id) {
                    return { ...product, ...updatedProduct };
                } 
                else {
                    return product;
                }}),
            };

        case 'UPDATE CUSTOMER':
            const updatedCustomer = action.payload;
            return { ...state, customers: state.customers.map((customer) => {
                if (customer.id == updatedCustomer.id) {
                    return { ...customer, ...updatedCustomer}
                } else {
                    return customer;
                }
            })}

        case 'DELETE PRODUCT':
            const productIdToDelete = action.payload;
            let newProducts = state.products.filter(prod => prod.id != productIdToDelete)
            return {...state, products: newProducts, };

        case 'DELETE CUSTOMER':
            const customerIdToDelete = action.payload;
            let newCustomers = state.customers.filter(cust => cust.id != customerIdToDelete)
            return { ...state, customers: newCustomers}
                
        default:
            return state;
    }
};

export default dataChanger;
