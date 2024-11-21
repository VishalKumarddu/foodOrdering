// import { createContext, useEffect, useState } from "react";
// import axios from "axios";
// import {Dishes} from '../shared/dishes'


// // Create the StoreContext
// export const StoreContext = createContext(null);

// const StoreContextProvider = ({ children }) => {
//   const url = "http://localhost:9000";

//   // State variables
//   const [food_list, setFoodList] = useState([]);
//   const [cartItems, setCartItems] = useState({});
//   const currency = "₹";

//   // Add item to cart
//   const addToCart = (itemId) => {
//     setCartItems((prev) => ({
//       ...prev,
//       [itemId]: (prev[itemId] || 0) + 1,
//     }));
//   };

//   // Remove item from cart
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const updatedCart = { ...prev };
//       if (updatedCart[itemId] > 1) {
//         updatedCart[itemId] -= 1;
//       } else {
//         delete updatedCart[itemId];
//       }
//       return updatedCart;
//     });
//   };

//   // Get total amount
//   const getTotalCartAmount = () => {
//     return Object.keys(cartItems).reduce((total, itemId) => {
//       const item = food_list.find((dish) => dish.id === parseInt(itemId));
//       return item ? total + item.price * cartItems[itemId] : total;
//     }, 0);
//   };

//   // Load dishes 
//   useEffect(() => {
//     setFoodList(Dishes)
//     // Mock API call for food_list
//   }, []);

//   // Context value
//   const contextValue = {
//     food_list,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getTotalCartAmount,
//     currency,
//   };

//   return (
//     <StoreContext.Provider value={contextValue}>
//       {children}
//     </StoreContext.Provider>
//   );
// };

// export default StoreContextProvider;






import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Dishes } from '../shared/dishes';  // Assuming you still need the dishes mock data for initialization

// Create the StoreContext
export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:9000"; // Your backend URL

  // State variables
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const currency = "₹";

  // Add item to cart
  const addToCart = async (itemId) => {
    // Update local cart state
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // If token exists, send the updated cart data to the backend
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    // Update local cart state
    setCartItems((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[itemId] > 1) {
        updatedCart[itemId] -= 1;
      } else {
        delete updatedCart[itemId];
      }
      return updatedCart;
    });

    // If token exists, send the updated cart data to the backend
    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/remove`,
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  // Get total amount in cart
  const getTotalCartAmount = () => {
    return Object.keys(cartItems).reduce((total, itemId) => {
      const item = food_list.find((dish) => dish.id === parseInt(itemId));
      return item ? total + item.price * cartItems[itemId] : total;
    }, 0);
  };

  // Load food list (mock or API)
  useEffect(() => {
    setFoodList(Dishes); // Use mock Dishes, or fetch from the backend
    // If you want to fetch food list from the backend, uncomment below:
    // const fetchFoodList = async () => {
    //   const response = await axios.get(`${url}/api/food/list`);
    //   setFoodList(response.data.data);
    // };
    // fetchFoodList();
  }, []);

  // Load cart data from the backend when the component mounts (for logged-in users)
  const loadCartData = async () => {
    if (token) {
      try {
        const response = await axios.post(
          `${url}/api/cart/get`,
          {},
          { headers: { token } }
        );
        setCartItems(response.data.cartData); // Set the cart data from backend to state
      } catch (error) {
        console.error("Error loading cart data:", error);
      }
    }
  };

  // On token change (login/logout), reload the cart data
  useEffect(() => {
    loadCartData();
  }, [token]);

  // Context value to pass to children
  const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    currency,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

