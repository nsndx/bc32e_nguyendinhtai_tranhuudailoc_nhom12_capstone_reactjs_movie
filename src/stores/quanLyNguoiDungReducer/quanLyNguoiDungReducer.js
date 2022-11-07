import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AccessToken, UserLogin } from '../../constants/api';
import { quanLyNguoiDungServices } from '../../services/quanLyNguoiDungServices';

const initialState = {
   nguoiDung: null, isFetchNguoiDung: false, errNguoiDung: undefined,
   dangKy: null, isFetchDangKi: false, errDangKi: undefined,
   xoaUser: null, isFetchXoaUser: false, errXoaUser: undefined,
   ttTaiKhoan: null, isFetchTtTaiKhoan: false, errTtTaiKhoan: undefined,
   danhSachNguoiDung: null, isFetchDanhSachNguoiDung: false, errDanhSachNguoiDung: undefined,
   addNguoiDung: null, isFetchAddNguoiDung: false, errAddNguoiDung: undefined,
   ttNguoiDung: null, isFetchTtNguoiDung: false, errTtNguoiDung: undefined,
   capNhat: null, isCapNhat: false, errCapNhat: undefined
}

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungActions } = createSlice({
   name: 'quanLyNguoiDung',
   initialState,
   reducers: {
      dangXuat: (state, action) => {
         state.nguoiDung = null
         state.dangKy = null
         localStorage.removeItem(UserLogin)
         localStorage.removeItem(AccessToken)
      },
      dangKy: (state, action) => {
         state.errDangKi = undefined
      },
      dangNhap: (state, action) => {
         state.errNguoiDung = undefined
      },
      themNguoiDung: (state, action) => {
         state.errAddNguoiDung = undefined
         state.addNguoiDung = null
      },
      capNhat: (state, action) => {
         state.errCapNhat = undefined
         state.capNhat = null
      },
      xoaNguoiDung: (state, action) => {
         state.errXoaUser = undefined
         state.xoaUser = null
      }
   },
   extraReducers: (builder) => {
      builder
         // đăng nhập
         .addCase(dangNhap.pending, (state, action) => {
            state.isFetchNguoiDung = true
         }).addCase(dangNhap.fulfilled, (state, action) => {
            state.nguoiDung = action.payload
            state.isFetchNguoiDung = false
            state.errNguoiDung = undefined
            localStorage.setItem(UserLogin, JSON.stringify(action.payload))
            localStorage.setItem(AccessToken, JSON.stringify(action.payload.accessToken))
         }).addCase(dangNhap.rejected, (state, action) => {
            state.errNguoiDung = action.payload
            state.isFetchNguoiDung = false
         })
         // đăng ký người dùng
         .addCase(dangKyNguoiDung.pending, (state, action) => {
            state.isFetchDangKi = true
         }).addCase(dangKyNguoiDung.fulfilled, (state, action) => {
            state.dangKy = action.payload
            state.isFetchDangKi = false
            state.errDangKi = undefined
         }).addCase(dangKyNguoiDung.rejected, (state, action) => {
            state.errDangKi = action.payload
            state.isFetchDangKi = false
         })
         // xoá người dùng
         .addCase(xoaNguoiDung.pending, (state, action) => {
            state.isFetchXoaUser = true
         }).addCase(xoaNguoiDung.fulfilled, (state, action) => {
            state.isFetchXoaUser = false
            state.xoaUser = action.payload
            state.errXoaUser = undefined
         }).addCase(xoaNguoiDung.rejected, (state, action) => {
            state.isFetchXoaUser = false
            state.errXoaUser = action.payload
            state.xoaUser = null
         })
         // thông tin tài khoản
         .addCase(thongTinTaiKhoan.pending, (state, action) => {
            state.isFetchTtTaiKhoan = true
         }).addCase(thongTinTaiKhoan.fulfilled, (state, action) => {
            state.isFetchTtTaiKhoan = false
            state.ttTaiKhoan = action.payload
         }).addCase(thongTinTaiKhoan.rejected, (state, action) => {
            state.isFetchTtTaiKhoan = false
            state.errTtTaiKhoan = action.payload
         })
         // lấy danh sách người dùng
         .addCase(layDanhSachNguoiDung.pending, (state, action) => {
            state.isFetchDanhSachNguoiDung = true
         }).addCase(layDanhSachNguoiDung.fulfilled, (state, action) => {
            state.danhSachNguoiDung = action.payload
            state.isFetchDanhSachNguoiDung = false
         }).addCase(layDanhSachNguoiDung.rejected, (state, action) => {
            state.errDanhSachNguoiDung = action.payload
            state.isFetchDanhSachNguoiDung = false
         })
         // thêm người dùng
         .addCase(themNguoiDung.pending, (state, action) => {
            state.isFetchAddNguoiDung = true
         }).addCase(themNguoiDung.fulfilled, (state, action) => {
            state.isFetchAddNguoiDung = false
            state.addNguoiDung = action.payload            //trả về người dùng
            state.errAddNguoiDung = undefined
         }).addCase(themNguoiDung.rejected, (state, action) => {
            state.isFetchAddNguoiDung = false
            state.errAddNguoiDung = action.payload        // trả về lỗi form
         })
         // lấy thông tin người dùng
         .addCase(layThongTinNguoiDung.pending, (state, action) => {
            state.isFetchTtNguoiDung = true
         }).addCase(layThongTinNguoiDung.fulfilled, (state, action) => {
            state.isFetchTtNguoiDung = false
            state.ttNguoiDung = action.payload            //trả về tt người dùng
         }).addCase(layThongTinNguoiDung.rejected, (state, action) => {
            state.isFetchTtNguoiDung = false
            state.errTtNguoiDung = action.payload
         })
         // cập nhật thông tin người dùng
         .addCase(capNhatThongTinNguoiDung.pending, (state, action) => {
            state.isCapNhat = true
         }).addCase(capNhatThongTinNguoiDung.fulfilled, (state, action) => {
            state.isCapNhat = false
            state.capNhat = action.payload            //trả về tt người dùng
            state.errCapNhat = undefined
         }).addCase(capNhatThongTinNguoiDung.rejected, (state, action) => {
            state.isCapNhat = false
            state.errCapNhat = action.payload
         })
   }
});

export const dangNhap = createAsyncThunk('quanLyNguoiDung/dangNhap',
   async (taiKhoan, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.dangNhap(taiKhoan)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const dangKyNguoiDung = createAsyncThunk('quanLyNguoiDung/dangKyNguoiDung',
   async (taiKhoan, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.dangKy(taiKhoan)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const xoaNguoiDung = createAsyncThunk('quanLyNguoiDung/xoaNguoiDung',
   async (taiKhoan, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.xoaNguoiDung(taiKhoan)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const thongTinTaiKhoan = createAsyncThunk('quanLyNguoiDung/thongTinTaiKhoan',
   async (data, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.thongTinTaiKhoan()
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const layDanhSachNguoiDung = createAsyncThunk('quanLyNguoiDung/layDanhSachNguoiDung',
   async (keyword, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.layDanhSachNguoiDung(keyword)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const themNguoiDung = createAsyncThunk('quanLyNguoiDung/themNguoiDung',
   async (nguoiDung, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.themNguoiDung(nguoiDung)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const layThongTinNguoiDung = createAsyncThunk('quanLyNguoiDung/layThongTinNguoiDung',
   async (taiKhoan, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.layThongTinNguoiDung(taiKhoan)
         return result.data.content
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
export const capNhatThongTinNguoiDung = createAsyncThunk('quanLyNguoiDung/capNhatThongTinNguoiDung',
   async (taiKhoan, { rejectWithValue }) => {
      try {
         const result = await quanLyNguoiDungServices.capNhatThongTinNguoiDung(taiKhoan)
         return result.data
      } catch (err) {
         return rejectWithValue(err.response.data.content)
      }
   }
)
