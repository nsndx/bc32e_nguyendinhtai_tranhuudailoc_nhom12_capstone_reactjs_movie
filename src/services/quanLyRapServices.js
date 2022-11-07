import { api, MaNhom } from "../constants/api"

export const quanLyRapServices = {
   layThongTinHeThongRap: () => {
      return api.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
   },
   layThongTinCumRapTheoHeThong: (maHeThongRap) => {
      return api.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
   },
   layThongTinLichChieuHeThongRap: () => {
      return api.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${MaNhom}`)
   },
   layThongTinLichChieuPhim: (maPhim) => {
      return api.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
   },

}