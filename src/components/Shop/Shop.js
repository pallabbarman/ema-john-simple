import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    addToDatabaseCart,
    getDatabaseCart,
} from "../../utilities/databaseManager";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import GridLoader from "react-spinners/GridLoader";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(
            "https://web-ema-john-server.herokuapp.com/products?search=" +
                search
        )
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, [search]);

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

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

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
                <input
                    style={{
                        margin: "20px",
                        padding: "10px",
                        width: "30%",
                    }}
                    type="text"
                    onBlur={handleSearch}
                    className="form-control"
                    placeholder="Search somethings"
                />
                {products.length === 0 && <GridLoader></GridLoader>}
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
