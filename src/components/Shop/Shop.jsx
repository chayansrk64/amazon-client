import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

 
import './Shop.css'
import { Link } from 'react-router-dom';
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

    const handleDeleteCart = () => {
        setCart([]);
        deleteShoppingCart()
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
                <Cart
                 cart={cart}
                 handleDeleteCart = {handleDeleteCart}
                 >
                    <Link to="/orders"><button className="review-checkout-btn">
                        Review Order
                        <FontAwesomeIcon icon={faArrowRight} />
                        </button></Link>
                 </Cart>
             </div>
        </div>
    );
};

export default Shop;