import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Colors } from "../../constants/style";

const ProductItem = ({
  id,
  title,
  price,
  category,
  description,
  image,
  style,
  style1,
  show,
}) => {
  const navigation = useNavigation();

  function goToProductDetails() {
    navigation.navigate("ProductDetails", { productId: id });
  }

  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={goToProductDetails}
    >
      <View style={[styles.productItem, style]}>
        <View style={styles.innerContainer}>
          <Image source={{ uri: image }} style={[styles.image, style1]} />
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={styles.productContent}>
          <View style={styles.item}>
            <Text style={styles.price}>${price}</Text>
            <Text style={styles.category}>{category}</Text>
          </View>
          {show && (
            <View>
              <Text style={styles.details}>{description}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  productItem: {
    margin: 16,
    marginHorizontal: 24,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: Colors.primary900,
  },
  innerContainer: {
    overflow: "hidden",
    borderRadius: 8,
  },
  image: {
    width: "100%",
    height: 300,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    textAlign: "left",
    marginLeft: 16,
    color: Colors.primary50,
  },
  productContent: {
    alignItems: "flex-start",
    marginLeft: 16,
  },
  item: {
    justifyContent: "center",
  },
  price: {
    fontSize: 24,
    color: Colors.primary50,
  },
  category: {
    fontSize: 18,
    color: Colors.primary50,
    marginBottom: 12,
  },
  pressed: {
    opacity: 0.5,
  },
  details: {
    fontSize: 18,
    color: Colors.primary50,
    marginBottom: 12,
  },
});
