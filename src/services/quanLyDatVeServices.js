import { api } from "../constants/api"

export const quanLyDatVeServices = {
   layDanhSachPhongVe: (maLichChieu) => {
      return api.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`)
   },
   datVe: (danhSachVe) => {
      return api.post(`/api/QuanLyDatVe/DatVe`, danhSachVe)
   },
   taoLichChieu: (data) => {
      return api.post(`/api/QuanLyDatVe/TaoLichChieu`, data)
   }
}