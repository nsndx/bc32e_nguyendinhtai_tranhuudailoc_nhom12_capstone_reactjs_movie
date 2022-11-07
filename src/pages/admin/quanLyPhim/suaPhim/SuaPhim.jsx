import React, { useEffect, useState } from 'react'
import { Switch } from 'antd';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { layThongTinLichChieuPhim } from '../../../../stores/quanLyRapReducer/quanLyRapReducer';
import { capNhatPhimUpload, quanLyPhimActions } from '../../../../stores/quanLyPhimReducer/quanLyPhimReducer';


export default function SuaPhim() {
   const { upDatePhim, errUpdatePhim } = useSelector(state => state.quanLyPhimReducer)
   const { lichChieuPhim } = useSelector(state => state.quanLyRapReducer)
   const { register, handleSubmit, setValue, reset } = useForm()
   const dispatch = useDispatch()
   const param = useParams()
   const [urlHinhAnh, setUrlHinhAnh] = useState()

   useEffect(() => {
      dispatch(layThongTinLichChieuPhim(param.id))
      dispatch(quanLyPhimActions.suaPhim())
   }, [])
   useEffect(() => {      
      reset({
         tenPhim: lichChieuPhim.tenPhim,
         trailer: lichChieuPhim.trailer,
         moTa: lichChieuPhim.moTa,
         dangChieu: lichChieuPhim.dangChieu,
         sapChieu: lichChieuPhim.sapChieu,
         hot: lichChieuPhim.hot,
         danhGia: lichChieuPhim.danhGia,
         ngayKhoiChieu: moment(lichChieuPhim.ngayKhoiChieu).format('YYYY-MM-DD')
      })
   }, [lichChieuPhim])

   const handleSubmitForm = handleSubmit(data => {
      data.maNhom = lichChieuPhim.maNhom
      data.maPhim = lichChieuPhim.maPhim
      data.ngayKhoiChieu = moment(data.ngayKhoiChieu).format('DD/MM/YYYY')
      data.danhGia = Number(data.danhGia)
      // tạo biến formdata
      let formData = new FormData()
      formData.append('maPhim', data.maPhim)
      formData.append('maNhom', data.maNhom)
      formData.append('tenPhim', data.tenPhim)
      formData.append('trailer', data.trailer)
      formData.append('moTa', data.moTa)
      formData.append('ngayKhoiChieu', data.ngayKhoiChieu)
      formData.append('dangChieu', data.dangChieu)
      formData.append('sapChieu', data.sapChieu)
      formData.append('hot', data.hot)
      formData.append('danhGia', data.danhGia)
      if (data.hinhAnh) {
         formData.append('File', data.hinhAnh, data.hinhAnh.name)
      }

      dispatch(capNhatPhimUpload(formData))
   })

   return (
      <div className='SuaPhim p-3'>
         <p className='font-bold text-xl mb-3'>Sửa phim: {lichChieuPhim.tenPhim}</p>
         <div className='flex'>
            <div>
               <img src={lichChieuPhim.hinhAnh} alt="" width={150} />
            </div>
            <form onSubmit={handleSubmitForm} className='flex-1'>
               {/* tên phim */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Tên phim: </p>
                  <input required {...register('tenPhim')} type="text" className="flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Trailer */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Trailer: </p>
                  <input required {...register('trailer')} type="text" className="flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Mô tả */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Mô tả: </p>
                  <textarea required rows={3} {...register('moTa')} type="text" className="resize-none flex-1 border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Ngày khởi chiếu */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Ngày khởi chiếu: </p>
                  <input required {...register('ngayKhoiChieu')} type="date" className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Đang chiếu */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Đang chiếu: </p>
                  {lichChieuPhim.dangChieu === undefined ? '' : <Switch defaultChecked={lichChieuPhim.dangChieu} onChange={checked => setValue('dangChieu', checked)} />}
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Sắp chiếu */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Sắp chiếu: </p>
                  {lichChieuPhim.sapChieu === undefined ? '' : <Switch defaultChecked={lichChieuPhim.sapChieu} onChange={checked => setValue('sapChieu', checked)} />}
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Hot */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Hot: </p>
                  {lichChieuPhim.hot === undefined ? '' : <Switch defaultChecked={lichChieuPhim.hot} onChange={checked => setValue('hot', checked)} />}
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Số sao */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Số sao: </p>
                  <input required {...register('danhGia')} type="number" min={1} max={10} className="border border-gray-500 focus:outline-none px-2 py-[2px] focus:border-blue-600 " />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               {/* Hình ảnh */}
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Hình ảnh: </p>
                  <input type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="p-0" onChange={(e) => {
                     // lấy file đã chọn
                     const file = e.target.files[0]
                     // tạo đối tượng đọc file         
                     const reader = new FileReader()
                     reader.readAsDataURL(file)
                     reader.onload = (e) => { setUrlHinhAnh(e.target.result) }
                     setValue('hinhAnh', file)
                  }} />
                  <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
               </div>
               <div className='flex mb-2'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'></p>
                  <img src={urlHinhAnh || lichChieuPhim.hinhAnh} alt="..." className='w-40 h-40 bg-gray-200' />
               </div>
               {/* Nút thêm phim */}
               <div className='flex mb-2 items-center'>
                  <p className='m-0 font-semibold w-40 text-right pr-2'>Tác vụ: </p>
                  {upDatePhim && !errUpdatePhim ? '' : <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300">
                     Cập nhật
                  </button>}                  
                  <p className=' m-0 text-red-500 text-xl pl-2'>{upDatePhim && !errUpdatePhim ? <span className='text-green-500'>Cập nhật phim thành công!</span> : errUpdatePhim}</p>
               </div>
            </form>
         </div>

      </div>
   )
}
