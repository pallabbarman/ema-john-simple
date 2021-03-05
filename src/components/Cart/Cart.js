import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const { cart } = props;
    const Price = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    let shipping = 0;
    if (Price > 99) {
        shipping = 0;
    } else if (Price > 45) {
        shipping = 12.99;
    } else if (Price > 15) {
        shipping = 4.99;
    }

    const tax = Price * 0.1;
    const totalPrice = Price + shipping + tax;

    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    };
    return (
        <div>
            <h4>Order Summary:</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {formatNumber(Price)}</p>
            <p>
                <small>Shipping Cost: {shipping}</small>
            </p>
            <p>
                <small>Tax: {formatNumber(tax)}</small>
            </p>
            <p>Total Price: {formatNumber(totalPrice)}</p>
            <br />
            <Link to="/review">
                <button type="button" className="cart-button">
                    Review Order
                </button>
            </Link>
        </div>
    );
};

export default Cart;
