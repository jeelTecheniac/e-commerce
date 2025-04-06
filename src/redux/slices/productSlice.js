import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 2299,
    image: "https://m.media-amazon.com/images/I/41lArSiD5hL._SL1200_.jpg",
    isNew: true,
    rating: 4,
    reviews: 456,
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring",
    price: 1999,
    image: "https://m.media-amazon.com/images/I/61-vRq2ulOL._SL1500_.jpg",
    rating: 3,
    reviews: 10,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable speaker with 20h battery life",
    price: 1599,
    image: "https://m.media-amazon.com/images/I/81bNiiPk68L._SL1500_.jpg",
    reviews: 89,
  },
  {
    id: 4,
    name: "Coffee Machine",
    description:
      "Espresso Coffee Maker with up to 20 Bars pressure and 1100 Watts for rich flavour",
    price: 9299,
    image: "https://m.media-amazon.com/images/I/61p40vE34OL._SL1500_.jpg",
    reviews: 56,
  },
  {
    id: 5,
    name: "Air Condition",
    description: "Daikin 1.8 Ton 5 Star Inverter Split AC",
    price: 57590,
    image: "https://m.media-amazon.com/images/I/6179B4CYGTL._SL1500_.jpg",
    reviews: 98,
  },
  {
    id: 6,
    name: "Samsung Galaxy S25",
    description:
      "Samsung Galaxy S25 5G AI Smartphone (Silver Shadow, 12GB RAM, 256GB Storage), 50MP Camera with Galaxy AI",
    price: 79999,
    image: "https://m.media-amazon.com/images/I/61D3EdXKG5L._SL1500_.jpg",
    isNew: true,
    rating: 5,
    reviews: 78,
  },
  {
    id: 7,
    name: "Fashion T-Shirt",
    description:
      "Leriya Fashion T-Shirt | T-Shirt for Men | Polo T Shirt | Casual T Shirt for Men | Men T Shirt | Men T Shirts Stylish Latest | Half Sleeve T Shirt",
    price: 399,
    image: "https://m.media-amazon.com/images/I/71LLwVdmsfL._SY741_.jpg",
    category: "cloth",
    isNew: true,
    reviews: 23,
  },
];

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: dummyProducts,
        }),
      1000
    )
  );
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    searchTerm: "",
    status: "idle",
    error: null,
  },
  reducers: {
    searchProducts: (state, action) => {
      state.searchTerm = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.items.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { searchProducts, addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectProductStatus = (state) => state.products.status;
export const selectProductError = (state) => state.products.error;
export const selectFilteredProducts = (state) => {
  const { items, searchTerm } = state.products;
  return items.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export default productSlice.reducer;
