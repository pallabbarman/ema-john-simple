import React from 'react';

const ReviewItem = (props) => {
    const { product, removeProduct } = props;
    const { name, quantity, key, price } = product;
    const reviewItemStyle = {
        borderBottom: '1px solid lightgray',
        marginBottom: '5px',
        paddingBottom: '5px',
        marginLeft: '200px',
    };
    return (
        <div style={reviewItemStyle}>
            <h4 className="product-name">{name}</h4>
            <p>Quantity: {quantity}</p>
            <p>
                <small>${price}</small>
            </p>
            <br />
            <button className="cart-button" onClick={() => removeProduct(key)} type="button">
                Remove Item
            </button>
        </div>
    );
};

export default ReviewItem;
