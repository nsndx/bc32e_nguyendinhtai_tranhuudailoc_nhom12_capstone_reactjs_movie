import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyDatVeServices } from '../../services/quanLyDatVeServices';

const initialState = {
   danhSachPhongVe: {}, isFetchDanhSachPhongVe: false, errDanhSachPhongVe: undefined,
   danhSachGheDangDat: [],
   ketQuaDatVe: null, isFetchKetQuaDatVe: false, errKetQuaDatVe: undefined,
   lichChieu: null, isFetchLichChieu: false, errLichChieu: undefined
}

export const { reducer: quanLyDatVeReducer, actions: quanLyDatVeActions } = createSlice({
   name: 'quanLyDatVe',
   initialState,
   reducers: {
      danhSachGheDangDat: (state, action) => {
         const index = state.danhSachGheDangDat.findIndex(ghe => ghe.maGhe === action.payload.maGhe)
         if (index !== -1) {
            state.danhSachGheDangDat.splice(index, 1)
         } else {
            state.danhSachGheDangDat = [...state.danhSachGheDangDat, action.payload]
         }
      },
      huyErrKetQuaDatVe: (state, action) => {
         state.danhSachGheDangDat = []
         state.errKetQuaDatVe = undefined
         state.ketQuaDatVe = null
      },
      lichChieu: (state, action) => {
         state.lichChieu = null
         state.errLichChieu = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         // Lấy danh sách phòng vé
         .addCase(layDanhSachPhongVe.pending, (state, action) => {
            state.isFetchDanhSachPhongVe = true
         }).addCase(layDanhSachPhongVe.fulfilled, (state, action) => {
            state.danhSachPhongVe = action.payload
            state.isFetchDanhSachPhongVe = false
         }).addCase(layDanhSachPhongVe.rejected, (state, action) => {
            state.errDanhSachPhongVe = action.payload
            state.isFetchDanhSachPhongVe = false
         })
         // Đặt vé
         .addCase(datVe.pending, (state, action) => {
            state.isFetchKetQuaDatVe = true
         }).addCase(datVe.fulfilled, (state, action) => {
            state.isFetchKetQuaDatVe = false
            state.errKetQuaDatVe = undefined
            state.ketQuaDatVe = action.payload
         }).addCase(datVe.rejected, (state, action) => {
            state.isFetchKetQuaDatVe = false
            state.ketQuaDatVe = null
            state.errKetQuaDatVe = action.payload
         })
         // tạo lịch chiếu
         .addCase(taoLichChieu.pending, (state, action) => {
            state.isFetchLichChieu = true
         }).addCase(taoLichChieu.fulfilled, (state, action) => {
            state.isFetchLichChieu = false
            state.lichChieu = action.payload
            state.errLichChieu = undefined
         }).addCase(taoLichChieu.rejected, (state, action) => {
            state.isFetchLichChieu = false
            state.errLichChieu = action.payload
            state.lichChieu = null
         })
   }
});

export const layDanhSachPhongVe = createAsyncThunk('quanLyDatVe/layDanhSachPhongVe',
   async (maLichChieu, { rejectWithValue }) => {
      try {
         const result = await quanLyDatVeServices.layDanhSachPhongVe(maLichChieu)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const datVe = createAsyncThunk('quanLyDatVe/datVe',
   async (danhSachVe, { rejectWithValue }) => {
      try {
         const result = await quanLyDatVeServices.datVe(danhSachVe)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data)
      }
   }
)
export const taoLichChieu = createAsyncThunk('quanLyDatVe/taoLichChieu',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyDatVeServices.taoLichChieu(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)