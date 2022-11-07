import { api } from "../constants/api"

export const quanLyNguoiDungServices = {
   dangNhap: (taiKhoan) => {
      return api.post('/api/QuanLyNguoiDung/DangNhap', taiKhoan)
   },
   dangKy: (taiKhoan) => {
      return api.post('/api/QuanLyNguoiDung/DangKy', taiKhoan)
   },
   xoaNguoiDung: (taiKhoan) => {
      return api.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
   },
   thongTinTaiKhoan:()=>{
      return api.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
   },
   layDanhSachNguoiDung:(keyword)=>{
      return api.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=gp00&${keyword}`)
   },
   themNguoiDung:(nguoiDung)=>{
      return api.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, nguoiDung)
   },
   layThongTinNguoiDung:(taiKhoan)=>{
      return api.post(`/api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`)
   },
   capNhatThongTinNguoiDung: (taiKhoan)=>{
      return api.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, taiKhoan)
   }

}