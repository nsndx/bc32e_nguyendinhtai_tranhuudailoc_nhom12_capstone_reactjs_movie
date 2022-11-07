import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyRapServices } from '../../services/quanLyRapServices'

const initialState = {
   thongTinHeThongRap: [], isFetchThongTinHeThongRap: false, errThongTinHeThongRap: undefined,
   thongTinCumRapTheoHeThong: [], isFetchThongTinCumRapTheoHeThong: false, errThongTinCumRapTheoHeThong: undefined,
   lichChieuHeThongRap: [], isFetchlichChieuHeThongRap: false, errlichChieuHeThongRap: undefined,
   lichChieuPhim: {}, isFetchLichChieuPhim: false, errLichChieuPhim: undefined
}

export const { reducer: quanLyRapReducer, actions: quanLyRapActions } = createSlice({
   name: 'quanLyRap',
   initialState,
   reducers: {
      thongTinCumRapTheoHeThong: (state, action) => {
         state.thongTinCumRapTheoHeThong = []
      }
   },
   extraReducers: (builder) => {
      builder
         // lấy thông tin hệ thống rạp
         .addCase(layThongTinHeThongRap.pending, (state, action) => {
            state.isFetchThongTinHeThongRap = true
         }).addCase(layThongTinHeThongRap.fulfilled, (state, action) => {
            state.thongTinHeThongRap = action.payload
            state.isFetchThongTinHeThongRap = false
         }).addCase(layThongTinHeThongRap.rejected, (state, action) => {
            state.errThongTinHeThongRap = action.payload
            state.isFetchThongTinHeThongRap = false
         })
         // lấy thông tin cụm rạp theo hệ thống rạp
         .addCase(layThongTinCumRapTheoHeThong.pending, (state, action) => {
            state.isFetchThongTinCumRapTheoHeThong = true
         }).addCase(layThongTinCumRapTheoHeThong.fulfilled, (state, action) => {
            state.isFetchThongTinCumRapTheoHeThong = false
            state.thongTinCumRapTheoHeThong = action.payload
         }).addCase(layThongTinCumRapTheoHeThong.rejected, (state, action) => {
            state.isFetchThongTinCumRapTheoHeThong = false
            state.errThongTinCumRapTheoHeThong = action.payload
         })
         // lấy thông tin lịch chiếu hệ thống rạp
         .addCase(layThongTinLichChieuHeThongRap.pending, (state, action) => {
            state.isFetchlichChieuHeThongRap = true
         }).addCase(layThongTinLichChieuHeThongRap.fulfilled, (state, action) => {
            state.lichChieuHeThongRap = action.payload
            state.isFetchlichChieuHeThongRap = false
         }).addCase(layThongTinLichChieuHeThongRap.rejected, (state, action) => {
            state.errlichChieuHeThongRap = action.payload
            state.isFetchlichChieuHeThongRap = false
         })
         // lấy thông tin lịch chiếu phim
         .addCase(layThongTinLichChieuPhim.pending, (state, action) => {
            state.isFetchLichChieuPhim = true
         }).addCase(layThongTinLichChieuPhim.fulfilled, (state, action) => {
            state.lichChieuPhim = action.payload
            state.isFetchLichChieuPhim = false
         }).addCase(layThongTinLichChieuPhim.rejected, (state, action) => {
            state.errLichChieuPhim = action.payload
            state.isFetchLichChieuPhim = false
         })

   }
})
export const layThongTinHeThongRap = createAsyncThunk('quanLyRap/layThongTinHeThongRap',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyRapServices.layThongTinHeThongRap()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)
export const layThongTinCumRapTheoHeThong = createAsyncThunk('quanLyRap/layThongTinCumRapTheoHeThong',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyRapServices.layThongTinCumRapTheoHeThong(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)

export const layThongTinLichChieuHeThongRap = createAsyncThunk('quanLyRap/layThongTinLichChieuHeThongRap',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyRapServices.layThongTinLichChieuHeThongRap()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)
export const layThongTinLichChieuPhim = createAsyncThunk('quanLyRap/layThongTinLichChieuPhim',
   async (maPhim, { rejectWithValue }) => {
      try {
         const result = await quanLyRapServices.layThongTinLichChieuPhim(maPhim)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)

