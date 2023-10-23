import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// reducer using rtk
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
const { createCustomer, updateName } = customerSlice.actions;

export { createCustomer, updateName };
export default customerSlice.reducer;
