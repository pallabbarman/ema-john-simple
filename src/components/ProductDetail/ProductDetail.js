import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        fetch("http://localhost:5000/product/" + productKey)
            .then((res) => res.json())
            .then((data) => setProduct(data));
    }, [productKey]);

    return (
        <div>
            <h1>Your Products Details.</h1>
            <Product showAddToCart={false} product={product} />
        </div>
    );
};

export default ProductDetail;
