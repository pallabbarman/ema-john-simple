import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    addToDatabaseCart,
    getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("https://web-ema-john-server.herokuapp.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch("https://web-ema-john-server.herokuapp.com/productByKeys", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productKeys),
        })
            .then((res) => res.json())
            .then((data) => setCart(data));
    }, []);

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter((pd) => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        } else {
            const pdQuantity = product;
            pdQuantity.quantity = 1;
            newCart = [...cart, pdQuantity];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    };

    return (
        <div className="shop-container">
            <div className="product-container">
                {products.map((product) => (
                    <Product
                        showAddToCart
                        key={product.key}
                        handleAddProduct={handleAddProduct}
                        product={product}
                    />
                ))}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button type="button" className="cart-button">
                            Review Order
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
