import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import './ReviewItem.css'
const ReviewItem = ({product, handleRemoveFromCart}) => {
    const {_id, img, name, price, quantity} = product;

    return (
        <div className='review__items'>
           <img src={img} alt="" />
           <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orange-text'>${price}</span></p>
                <p>Product Quantity: <span className='orange-text'>${quantity}</span></p>
           </div>
           <button onClick={() => handleRemoveFromCart(_id)} className='delete-btn'><FontAwesomeIcon className='font-icon' icon={faTrashAlt} /></button>
        </div>
    );
};

export default ReviewItem;