import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import happyImage from "../../images/giphy.gif";
import {
    getDatabaseCart,
    removeFromDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import ReviewItem from "../ReviewItem/ReviewItem";

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push("/shipment");
    };

    const removeProduct = (productKey) => {
        const newCart = cart.filter((pd) => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    };

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch("http://localhost:5000/productByKeys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => setCart(data));
    }, []);

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />;
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {cart.map((pd) => (
                    <ReviewItem
                        key={pd.key}
                        removeProduct={removeProduct}
                        product={pd}
                    />
                ))}
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button
                        onClick={handleProceedCheckout}
                        type="button"
                        className="cart-button"
                    >
                        Proceed Checkout
                    </button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
