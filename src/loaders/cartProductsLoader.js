import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async()=> {

    const storedCart = getShoppingCart();
    console.log(storedCart);
    const ids = Object.keys(storedCart);
    console.log(ids);
  
    const loadedProducts = await fetch(`http://localhost:5000/productsByIds`, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ids)
    });
    const products = await loadedProducts.json();
    console.log("products by id", products);
   
    const savedCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd._id === id);
        if(addedProduct){
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            savedCart.push(addedProduct);
        }
    }

    // if you need to return two things from a function
    /*
        1. return [products, savedCart];
        2. return {products, savedCart};

    */

    return savedCart;
    
}

export default cartProductsLoader;