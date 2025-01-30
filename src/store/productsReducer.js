const initialState = {
  items: [],
  status: "idle",
  currentProduct: null,
  currentProductStatus: "idle"
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
    case "FETCH_PRODUCT_DETAILS_SUCCESS":
      return {
        ...state,
        currentProductStatus: "succeeded",
        currentProduct: action.payload,
      };
    case "FETCH_PRODUCT_DETAILS_FAILURE":
      return {
        ...state,
        currentProductStatus: "failed",
      };
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

export const fetchProductDetailsSuccess = (product) => ({
  type: "FETCH_PRODUCT_DETAILS_SUCCESS",
  payload: product,
});

export const fetchProductDetailsFailure = () => ({
  type: "FETCH_PRODUCT_DETAILS_FAILURE",
});

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    dispatch(fetchProductsSuccess(data.products));
  } catch (error) {
    console.error("Error fetching products:", error);
    dispatch(fetchProductsFailure());
  }
};

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    dispatch(fetchProductDetailsSuccess(data));
  } catch (error) {
    console.error("Error fetching product details:", error);
    dispatch(fetchProductDetailsFailure());
  }
};

export default productsReducer;
