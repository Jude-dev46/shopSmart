import { useLayoutEffect, useState, useContext } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { fetchProductDetails } from "../utills/fetchs";
import { FavouriteContext } from "../store/cart";
import ProductItem from "../components/products/ProductItem";

const ProductDetails = ({ navigation, route }) => {
  const [product, setProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);

  const prodId = route.params.productId;

  const cartCtx = useContext(FavouriteContext);

  const cartProducts = cartCtx.id.includes(prodId);

  function addToCartHandler() {
    if (cartProducts) {
      cartCtx.removeProduct(prodId);
      Alert.alert("Removed!", "Product removed from cart");
    } else {
      cartCtx.addToCart(prodId);
      Alert.alert("Added!", "Product succefully added to cart");
      navigation.navigate("Cart");
    }
  }

  useLayoutEffect(() => {
    setIsLoading(true);
    async function getDetails() {
      try {
        const detail = await fetchProductDetails(prodId);
        setProduct(detail);

        navigation.setOptions({
          title: detail.title,
          headerRight: () => (
            <Ionicons
              name={cartProducts ? "cart" : "cart-outline"}
              color="white"
              size={24}
              onPress={addToCartHandler}
            />
          ),
        });

        setIsLoading(false);
      } catch (error) {
        Alert.alert("Error!!!", "Could not get Details.");
      }
    }

    getDetails();
  }, [navigation]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <ProductItem
        {...product}
        style={styles.style}
        style1={styles.image}
        show
      />
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  style: {
    marginHorizontal: 0,
    marginTop: 0,
  },
  image: {
    height: 450,
  },
});
