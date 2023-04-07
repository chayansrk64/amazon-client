import { getShoppingCart } from "../utilities/fakedb";

const cartProductsLoader = async()=> {
    const loadedProducts = await fetch('products.json');
    const products = await loadedProducts.json();

    const storedCart = getShoppingCart();
    const savedCart = [];

    for(const id in storedCart){
        const addedProduct = products.find(pd => pd.id === id);
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