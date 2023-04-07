import React from 'react';
import './Cart.css'
const Cart = ({cart}) => {
    // console.log(cart);
    // const cart = props.cart --------->[option 1]
    // const {cart} = props  ---------> [option 2]
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    for(const product of cart){
        if(product.quantity === 0){
            product.quantity = 1;
        }
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }
    const tax = totalPrice*7/100;
    const grandTotal = totalPrice+totalShipping+tax;
    
    return (
        <div className='cart'>
             <h2>Order Summary</h2>
             <p>Selected Items: {quantity}</p>
             <p>Price: {totalPrice}</p>
             {/* <p>Ratings: {cart.ratings}</p> */}
             <p>Shiping: {totalShipping}</p>
             <p>TAX: {tax.toFixed(2)}</p>
             <h6>grandTotal: {grandTotal.toFixed(2)}</h6>
                
        </div>
    );
};

export default Cart;