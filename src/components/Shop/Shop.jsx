import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
 
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);  

    useEffect(()=> {
        
        const loadData = async() => {
            const res = await fetch('products.json')
            const data = await res.json()
            setProducts(data);
        }
        loadData()

    }, [])

    useEffect(()=> {
        const storedCart = getShoppingCart();
        const savedCart = [];
        for(const id in storedCart){
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
            // console.log('added product', addedProduct);
        }
        setCart(savedCart);
    }, [products])


    const handleAddToCart = (product) => {
       const newCart = [...cart, product];
       setCart(newCart);
       addToDb(product.id)

    }

    return (
        <div className='shop__container'>
             <div className='product__container'>
                {
                    products.map(product => <Product
                         key={product.id}
                         product={product}
                         cartbutton = {handleAddToCart}
                         ></Product>)
                }
             </div>
             <div className='cart__container'>
                <Cart cart={cart}></Cart>
             </div>
        </div>
    );
};

export default Shop;