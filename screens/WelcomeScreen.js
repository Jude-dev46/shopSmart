import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";

import { Colors } from "../constants/style";
import { fetchProducts } from "../utills/fetchs";
import ProductList from "../components/products/ProductList";

const WelcomeScreen = () => {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getProducts() {
      try {
        const res = await fetchProducts();
        setProducts(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        Alert.alert("Error!!!", "Could not load products. Try again");
      }
    }

    getProducts();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to shopSmart</Text>
      <ProductList products={products} />
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 24,
    marginLeft: 16,
    color: Colors.primary50,
  },
});
