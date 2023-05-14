import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import ReviewItem from "../ReviewItems/ReviewItem";
import './Orders.css'
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedCart = useLoaderData()
    const [cart, setCart] = useState(savedCart)

    const handleRemoveFromCart = (id) => {
       const remaining = cart.filter(product => product.id !== id);
       setCart(remaining)
       removeFromDb(id)
    }

    const handleDeleteCart = () => {
      setCart([]);
      deleteShoppingCart();
    }

  return (
    <div className="shop__container">

      <div className="review__container">
            {
              cart.map(product => <ReviewItem
              key = {product.id}
              product = {product}
              handleRemoveFromCart = {handleRemoveFromCart}
              ></ReviewItem>)
            }
      </div>

      <div className="cart__container">
        <Cart 
        cart={cart}
        handleDeleteCart = {handleDeleteCart}
        >
         <Link to='/checkout'><button className="review-checkout-btn">
          Proceed CheckOut
          <FontAwesomeIcon icon={faArrowRight} />
          </button></Link>
        </Cart>
      </div>

    </div>
  );
};

export default Orders;
