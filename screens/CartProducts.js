import { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

import { FavouriteContext } from "../store/cart";
import { fetchProductDetails } from "../utills/fetchs";
import ProductItem from "../components/products/ProductItem";

const Cart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const cartCtx = useContext(FavouriteContext);

  useEffect(() => {
    async function getProduct() {
      try {
        const response = await fetchProductDetails(cartCtx.id[0]);
        setCartProduct(response);
      } catch (error) {
        Alert.alert("Error!", "Couldn't get the cart products");
      }
    }

    getProduct();
  }, []);

  return <ProductItem {...cartProduct} />;
};

export default Cart;
