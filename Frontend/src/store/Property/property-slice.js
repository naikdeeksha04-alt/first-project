import { createSlice } from "@reduxjs/toolkit";

const propertyslice = createSlice({
  name: "property",

  initialState: {
    properties: [],
    totalProperties: 0,
    searchParams: {},
    error: null,
    loding: false,
  },

  reducers: {
    getRequest(state) {
      state.loding = true;
      state.error = null;
    },

    getProperties(state, action) {
      state.properties = action.payload.data;
      state.totalProperties =  action.payload.totalProperties;
      state.loding = false;
    },

    updateSearchParams: (state, action) => {
      state.searchParams =
        Object.keys(action.payload).length === 0
          ? {}
          : {
              ...state.searchParams,
              ...action.payload,
            };
    },

    getErrors(state, action) {
      state.error = action.payload;
      state.loding = false;
    },
  },
});

export const propertyAction = propertyslice.actions;

export default propertyslice;