import React from 'react';
import './Product.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {id, img, price, name, ratings, seller, category} = props.product;
    // console.log(props);

    const handleAddToCart = props.cartbutton;
        return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product__info'>
                <h3 className='product__name'>{name}</h3>
                <h3 className='product__price'><b>Price: ${price}</b></h3>
                <p>Manufacture: {seller}</p>
                <p>Ratings: {ratings}</p>
            </div>
            <button onClick={()=> handleAddToCart(props.product)} className='product-btn'>
                Add To Cart
                <FontAwesomeIcon icon={faShoppingCart} />

                </button>
        </div>
    );
};

export default Product;