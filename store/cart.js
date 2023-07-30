import { createContext, useState } from "react";

export const FavouriteContext = createContext({
  id: "",
  addToCart: (id) => {},
  removeProduct: (id) => {},
});

function FavouriteContextProvider({ children }) {
  const [cartProductsId, setCartProductsId] = useState([]);

  function addToCart(id) {
    setCartProductsId((currProductId) => [...currProductId, id]);
  }

  function removeProduct(id) {
    setCartProductsId((currProductId) =>
      currProductId.filter((productId) => productId !== id)
    );
  }

  const value = {
    id: cartProductsId,
    addToCart: addToCart,
    removeProduct: removeProduct,
  };

  return (
    <FavouriteContext.Provider value={value}>
      {children}
    </FavouriteContext.Provider>
  );
}

export default FavouriteContextProvider;
