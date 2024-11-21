import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, currency } =
    useContext(StoreContext);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {Object.keys(cartItems).length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {Object.keys(cartItems).map((itemId) => {
            const item = food_list.find(
              (dish) => dish.id === parseInt(itemId)
            );
            return item ? (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>{currency}{item.price} x {cartItems[itemId]}</p>
                  <button
                    className="remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : null;
          })}
          <div className="cart-total">
            <h3>Total: {currency}{getTotalCartAmount()}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

