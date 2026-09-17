import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SidebarType = "dashboard" | "chat";

export interface IInitialState {
  states: Record<SidebarType, boolean>;
}

const initialState: IInitialState = {
  states: {
    dashboard: true,
    chat: true,
  },
};

const collapseSlice = createSlice({
  name: "collapse",
  initialState,
  reducers: {
    setToggle(state, action: PayloadAction<SidebarType>) {
      state.states[action.payload] = !state.states[action.payload];
    },
  },
});
export const { setToggle } = collapseSlice.actions;
export default collapseSlice.reducer;
