import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { quanLyPhimServices } from '../../services/quanLyPhimServices';

const initialState = {
   listBanner: [], isFetchListBanner: false, errListBanner: undefined,
   listPhim: [], isFetchListPhim: false, errListPhim: undefined,
   themPhim: null, isFetchThemPhim: false, errThemPhim: undefined,
   delPhim: null, isFetchDelPhim: false, errDelPhim: undefined,
   upDatePhim: null, isFetchUpdatePhim: false, errUpdatePhim: undefined
}

export const { reducer: quanLyPhimReducer, actions: quanLyPhimActions } = createSlice({
   name: 'quanLyPhim',
   initialState,
   reducers: {
      themPhim: (state, action) => {
         state.themPhim = null
         state.errThemPhim = undefined
      },
      suaPhim: (state, action) => {
         state.upDatePhim = null
         state.errUpdatePhim = undefined
      },
      xoaPhim: (state, action) => {
         state.delPhim = null
         state.errDelPhim = undefined
      }
   },
   extraReducers: (builder) => {
      builder
         //lấy danh sách banner
         .addCase(layDanhSachBanner.pending, (state, action) => {
            state.isFetchListBanner = true
         }).addCase(layDanhSachBanner.fulfilled, (state, action) => {
            state.listBanner = action.payload
            state.isFetchListBanner = false
         }).addCase(layDanhSachBanner.rejected, (state, action) => {
            state.errListBanner = action.payload
            state.isFetchListBanner = false
         })
         //lấy danh sách phim
         .addCase(layDanhSachPhim.pending, (state, action) => {
            state.isFetchListPhim = true
         }).addCase(layDanhSachPhim.fulfilled, (state, action) => {
            state.listPhim = action.payload
            state.isFetchListPhim = false
         }).addCase(layDanhSachPhim.rejected, (state, action) => {
            state.errListPhim = action.payload
            state.isFetchListPhim = false
         })
         //Thêm phim upload hình
         .addCase(themPhimUploadHinh.pending, (state, action) => {
            state.isFetchThemPhim = true
         }).addCase(themPhimUploadHinh.fulfilled, (state, action) => {
            state.isFetchThemPhim = false
            state.themPhim = action.payload
            state.errThemPhim = undefined
         }).addCase(themPhimUploadHinh.rejected, (state, action) => {
            state.isFetchThemPhim = false
            state.errThemPhim = action.payload
            state.themPhim = null
         })
         //Xoá phim
         .addCase(xoaPhim.pending, (state, action) => {
            state.isFetchDelPhim = true
         }).addCase(xoaPhim.fulfilled, (state, action) => {
            state.isFetchDelPhim = false
            state.delPhim = action.payload
            state.errDelPhim = undefined
         }).addCase(xoaPhim.rejected, (state, action) => {
            state.isFetchDelPhim = false
            state.errThemPhim = action.payload
            state.delPhim = null
         })
         // Cập nhật phim
         .addCase(capNhatPhimUpload.pending, (state, action) => {
            state.isFetchUpdatePhim = true
         }).addCase(capNhatPhimUpload.fulfilled, (state, action) => {
            state.isFetchUpdatePhim = false
            state.upDatePhim = action.payload
            state.errUpdatePhim = undefined
         }).addCase(capNhatPhimUpload.rejected, (state, action) => {
            state.isFetchUpdatePhim = false
            state.errUpdatePhim = action.payload
            state.upDatePhim = null
         })
   }
});

export const layDanhSachBanner = createAsyncThunk('quanLyPhim/layDanhSachBanner',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyPhimServices.layDanhSachBanner()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)
export const layDanhSachPhim = createAsyncThunk('quanLyPhim/layDanhSachPhim',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyPhimServices.layDanhSachPhim(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response)
      }
   }
)
export const themPhimUploadHinh = createAsyncThunk('quanLyPhim/themPhimUploadHinh',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyPhimServices.themPhimUploadHinh(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const xoaPhim = createAsyncThunk('quanLyPhim/xoaPhim',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyPhimServices.xoaPhim(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data)
      }
   }
)
export const capNhatPhimUpload = createAsyncThunk('quanLyPhim/capNhatPhimUpload',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyPhimServices.capNhatPhimUpload(data)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)