import { createSlice } from "@reduxjs/toolkit";

interface InitialStateProps {
  text: string;
  bgScreen: string;
  bgCard: string;
  dark: boolean;
}

const initialState: InitialStateProps = {
  text: "text-gray-900",
  bgScreen: "bg-white",
  bgCard: "bg-gray-100",
  dark: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    blackTheme: (state) => {
      state.text = "text-white";
      state.bgScreen = "bg-gray-800";
      state.bgCard = "bg-gray-600";
      state.dark = true;
    },
    whiteTheme: (state) => {
      state.text = "text-gray-900";
      state.bgScreen = "bg-white";
      state.bgCard = "bg-gray-100";
      state.dark = false;
    },
  },
});

export const { blackTheme, whiteTheme } = themeSlice.actions;

export default themeSlice;
