import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products] = useState(first10);
    return (
        <div className="shop-container">
            <div className="product-container">
                <ul>
                    {products.map((product) => (
                        <li>{product.name}</li>
                    ))}
                </ul>
            </div>
            <div className="cart-container">
                <h3>This is cart</h3>
            </div>
        </div>
    );
};

export default Shop;
