import { View, FlatList, Text } from "react-native";

import ProductItem from "./ProductItem";

function renderProducts(itemData) {
  return <ProductItem {...itemData.item} />;
}
const ProductList = ({ products }) => {
  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProducts}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ProductList;
