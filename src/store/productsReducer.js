const initialState = {
  items: [],
  likedProducts: {},
  status: "idle",
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        status: "succeeded",
        items: action.payload,
      };
    case "FETCH_PRODUCTS_FAILURE":
      return {
        ...state,
        status: "failed",
      };
    case "LIKE_PRODUCT":
      const productId = action.payload;
      if (!state.likedProducts[productId]) {
        const updatedItems = state.items.map((item) =>
          item.id === productId ? { ...item, likes: item.likes + 1 } : item
        );
        return {
          ...state,
          likedProducts: {
            ...state.likedProducts,
            [productId]: true,
          },
          items: updatedItems,
        };
      }
      return state;
    default:
      return state;
  }
};

export const fetchProductsSuccess = (products) => ({
  type: "FETCH_PRODUCTS_SUCCESS",
  payload: products,
});

export const fetchProductsFailure = () => ({
  type: "FETCH_PRODUCTS_FAILURE",
});

export const likeProduct = (productId) => ({
  type: "LIKE_PRODUCT",
  payload: productId,
});

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("https://30bec7c9810f5909.mokky.dev/products");
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure());
  }
};

export default productsReducer;
