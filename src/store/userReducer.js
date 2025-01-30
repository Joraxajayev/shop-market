const initialState = {
  name: "",
  email: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      const newState = {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
      };
      return newState;
    default:
      return state;
  }
};

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user
});

export default userReducer;
