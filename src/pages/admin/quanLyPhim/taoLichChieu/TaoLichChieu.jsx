import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { quanLyDatVeActions, taoLichChieu } from '../../../../stores/quanLyDatVeReducer/quanLyDatVeReducer'
import { layThongTinCumRapTheoHeThong, layThongTinHeThongRap, layThongTinLichChieuPhim, quanLyRapActions } from '../../../../stores/quanLyRapReducer/quanLyRapReducer'

export default function TaoLichChieu() {
   const dispatch = useDispatch()
   const param = useParams()
   const { lichChieuPhim } = useSelector(state => state.quanLyRapReducer)
   const { lichChieu, errLichChieu } = useSelector(state => state.quanLyDatVeReducer)
   const { thongTinHeThongRap, thongTinCumRapTheoHeThong } = useSelector(state => state.quanLyRapReducer)
   const [maHeThongRap, setMaHeThongRap] = useState()
   const { register, handleSubmit, reset } = useForm()

   useEffect(() => {
      dispatch(layThongTinLichChieuPhim(param.id))
      dispatch(quanLyDatVeActions.lichChieu())
      dispatch(layThongTinHeThongRap())
   }, [])
   useEffect(() => {
      if (maHeThongRap) {
         dispatch(layThongTinCumRapTheoHeThong(maHeThongRap))
      } else{
         dispatch(quanLyRapActions.thongTinCumRapTheoHeThong())
         reset({
            maRap:''
         })
      }
   }, [maHeThongRap])

   const handleSubmitForm = handleSubmit(data => {
      data.maPhim = lichChieuPhim.maPhim
      data.ngayChieuGioChieu = moment(data.ngayChieuGioChieu).format('DD/MM/YYYY hh:mm:ss')
      data.giaVe = Number(data.giaVe)

      dispatch(taoLichChieu(data))
   })

   return (
      <div className='TaoLichChieu p-3'>
         <p className='font-bold text-xl mb-10'>Tạo lịch chiếu phim: {lichChieuPhim.tenPhim}</p>
         <div className='flex'>
            <div>
               <img src={lichChieuPhim.hinhAnh} alt="" className='w-40' />
            </div>
            <form className='flex-1' onSubmit={handleSubmitForm}>
               {/* Hệ thống rạp */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Hệ thống rạp: </p>
                  <select onChange={(e) => setMaHeThongRap(e.target.value)} className="flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 ">
                     <option value=''>Chọn hệ thống rạp</option>
                     {thongTinHeThongRap.map((heThongRap, i) => (
                        <option key={i} value={heThongRap.maHeThongRap}>{heThongRap.tenHeThongRap}</option>
                     ))}
                  </select>
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Cụm rạp */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Cụm rạp: </p>
                  <select {...register('maRap')} className="flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 ">
                     {maHeThongRap?<option value=''>Chọn cụm rạp</option>:''}
                     {thongTinCumRapTheoHeThong.map((cumRap,i)=>(
                        <option key={i} value={cumRap.maCumRap}>{cumRap.tenCumRap}</option>
                     ))}
                  </select>
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Ngày chiếu giờ chiếu */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Ngày chiếu giờ chiếu: </p>
                  <input {...register('ngayChieuGioChieu')} type="datetime-local" className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Giá vé */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Giá vé: </p>
                  <input {...register('giaVe')} type="number" min={75000} max={200000} className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               <div className='flex items-center'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Chức năng: </p>                  
                  {lichChieu && !errLichChieu ? '' : <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300">Tạo lịch chiếu</button>}
                  <p className='m-0 text-red-500 pl-2'>{lichChieu && !errLichChieu ? <span className='text-green-500'>{lichChieu}</span> : errLichChieu}</p>
               </div>
            </form>
         </div>


      </div>
   )
}
