import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../../constants/style";

const ProductDetail = ({ id, title, price, category, image }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.text}>{title}</Text>
      </View>
      <View style={styles.productContent}>
        <View style={styles.item}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.category}>{category}</Text>
        </View>
        <View>
          <Text style={styles.text}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: Colors.primary900,
  },
  innerContainer: {},
  image: {
    width: "100%",
    height: 500,
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    marginLeft: 16,
    color: Colors.primary50,
  },
  productContent: {
    alignItems: "flex-start",
    marginLeft: 16,
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
});
