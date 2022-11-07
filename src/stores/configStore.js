import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { quanLyDatVeReducer } from "./quanLyDatVeReducer/quanLyDatVeReducer";
import { quanLyNguoiDungReducer } from "./quanLyNguoiDungReducer/quanLyNguoiDungReducer";
import { quanLyPhimReducer } from "./quanLyPhimReducer/quanLyPhimReducer";
import { quanLyRapReducer } from "./quanLyRapReducer/quanLyRapReducer";

const rootReducer = combineReducers({
   quanLyPhimReducer,
   quanLyRapReducer,
   quanLyNguoiDungReducer,
   quanLyDatVeReducer
})

export const store = configureStore({
   reducer: rootReducer,
   middleware: [thunk],
   devTools: true
})