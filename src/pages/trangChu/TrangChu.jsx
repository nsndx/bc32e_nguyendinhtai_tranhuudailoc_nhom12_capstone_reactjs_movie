import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachBanner, layDanhSachPhim } from '../../stores/quanLyPhimReducer/quanLyPhimReducer'
import { layThongTinLichChieuHeThongRap } from '../../stores/quanLyRapReducer/quanLyRapReducer'
import TrangChuBanner from './banner/TrangChuBanner'
import TrangChuListPhim from './listPhim/TrangChuListPhim'
import TrangChuListRap from './listRap/TrangChuListRap'

export default function TrangChu() {
   const dispatch = useDispatch()
   const { listBanner, listPhim, } = useSelector(state => state.quanLyPhimReducer)
   const { lichChieuHeThongRap } = useSelector(state => state.quanLyRapReducer)
   useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(layDanhSachBanner())
      dispatch(layDanhSachPhim())
      dispatch(layThongTinLichChieuHeThongRap())
   }, [])

   return (
      <div>
         <TrangChuBanner listBanner={listBanner} />
         <TrangChuListPhim listPhim={listPhim} />
         <TrangChuListRap lichChieuHeThongRap={lichChieuHeThongRap} />
      </div>
   )
}
