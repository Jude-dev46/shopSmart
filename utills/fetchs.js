const url = "https://fakestoreapi.com/products/";

export async function fetchProducts() {
  const response = await fetch(url);
  const products = await response.json();

  return products;
}

export async function fetchProductDetails(id) {
  const response = await fetch(url + `${id}`);
  const product = await response.json();

  return product;
}
