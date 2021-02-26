import React from 'react';

const Product = (props) => {
    const { product } = props;
    return (
        <div>
            <h4>{product.name}</h4>
        </div>
    );
};

export default Product;
