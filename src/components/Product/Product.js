import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    const { product, handleAddProduct } = props;
    const { img, name, seller, price, stock, key } = product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h4 className="product-name">
                    <Link to={`/product/${key}`}>{name}</Link>
                </h4>
                <br />
                <p>
                    <small>by: {seller}</small>
                </p>
                <p>${price}</p>
                <p>
                    <small>Only {stock} left in stock - order soon</small>
                </p>
                <button
                    className="cart-button"
                    onClick={() => {
                        handleAddProduct(product);
                    }}
                    type="button"
                >
                    <FontAwesomeIcon icon={faShoppingCart} />
                    Add to cart
                </button>
            </div>
        </div>
    );
};

export default Product;
