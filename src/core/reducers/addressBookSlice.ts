import { Address } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Define a type for the slice state
interface CounterState {
  addresses: Address[];
}

// Define the initial state using that type
const initialState: CounterState = {
  addresses: [],
};

export const addressBookSlice = createSlice({
  name: "address",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      /** zh: 防止重复地址；en: Prevent duplicate addresses */
      const exists = state.addresses.some((addr) => addr.id === action.payload.id);
      if (!exists) {
        state.addresses.push(action.payload);
      }
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      /** zh: 根据 id 从列表移除地址；en: Remove an address by id from addresses */
      state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
    },
    updateAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
  },
});

export const { addAddress, removeAddress, updateAddresses } =
  addressBookSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
export const selectAddress = (state: RootState) => state.addressBook.addresses;

export default addressBookSlice.reducer;
