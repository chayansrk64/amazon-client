import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

 
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);  
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsperPage] = useState(10)

   /**
    * step 1: Determine the total number of items to be paginated
    * step 2: Determine the number of items to be displayed per page
    * step 3: Calculate the total number of pages needed to display all the items, based on the items per page.
    * step 4: Create a user interface element (such as a set of links or buttons) that allows the user to navigate between pages.
    * step 5: 
   */
    const {totalProduct} = useLoaderData();
    const totalPages = Math.ceil(totalProduct/itemsPerPage);
    // const pageNumbers = [];
    // for(let i= 1; i < totalPages; i++){
    //    pageNumbers.push(i)
        
    // }
    // console.log(pageNumbers);

    const pageNumbers = [...Array(totalPages).keys()]
    // console.log(pageNumbers);





    // useEffect(()=> {
        
    //     const loadData = async() => {
    //         const res = await fetch("http://localhost:5000/products")
    //         const data = await res.json()
    //         setProducts(data);
    //     }
    //     loadData()

    // }, [])


    useEffect(() => {
         async function fetchData(){
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const data = await response.json();
            setProducts(data)
         }
         fetchData();

      }, [currentPage, itemsPerPage]);


    useEffect(()=> {
        const storedCart = getShoppingCart();

        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsByIds`, {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(cartProducts => {
            const savedCart = [];
            for(const id in storedCart){
                const addedProduct = cartProducts.find(product => product._id === id);
                if(addedProduct){
                    const quantity = storedCart[id];
                    addedProduct.quantity = quantity;
                    savedCart.push(addedProduct);
                }
                // console.log('added product', addedProduct);
            }
            setCart(savedCart);
        })

   
    }, [])


    const handleAddToCart = (product) => {
       const newCart = [...cart, product];
       setCart(newCart);
       addToDb(product._id)

    }

    const handleDeleteCart = () => {
        setCart([]);
        deleteShoppingCart()
      }

    const options = [5,10,20];
    const handleSelectChange = (event) => {
        setItemsperPage(parseInt(event.target.value));
        setCurrentPage(0)
    }

    return (
       <>
         <div className='shop__container'>
             <div className='product__container'>
                {
                    products.map(product => <Product
                         key={product._id}
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

            {/* pagination */}

            <div className="pagination">
                <p>current Page: {currentPage} and items per Page: {itemsPerPage}</p>
                {
                    pageNumbers.map(number => <button className={currentPage === number ? "selected" : ''} onClick={()=> setCurrentPage(number)} key={number}>{number + 1}</button>)
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

       </>
    );
};

export default Shop;