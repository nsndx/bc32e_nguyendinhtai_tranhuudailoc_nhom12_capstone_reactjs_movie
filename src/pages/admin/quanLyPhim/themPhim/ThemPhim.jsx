import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { MaNhom } from '../../../../constants/api';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyPhimActions, themPhimUploadHinh } from '../../../../stores/quanLyPhimReducer/quanLyPhimReducer';
import { Switch } from 'antd';

export default function ThemPhim(props) {
   const { register, handleSubmit, setValue } = useForm({
      defaultValues: {
         dangChieu: false,
         sapChieu: false,
         hot: false
      }
   })
   const dispatch = useDispatch()
   const [urlHinhAnh, setUrlHinhAnh] = useState()
   const { themPhim, errThemPhim } = useSelector(state => state.quanLyPhimReducer)

   useEffect(()=>{
      dispatch(quanLyPhimActions.themPhim())   
   },[])

   const handleSubmitFrom = handleSubmit(data => {
      data.ngayKhoiChieu = moment(data.ngayKhoiChieu).format('DD/MM/YYYY')
      data.danhGia = Number(data.danhGia)
      data.maNhom = MaNhom
      // tạo biến formdata
      let formData = new FormData()
      formData.append('tenPhim', data.tenPhim)
      formData.append('trailer', data.trailer)
      formData.append('moTa', data.moTa)
      formData.append('ngayKhoiChieu', data.ngayKhoiChieu)
      formData.append('dangChieu', data.dangChieu)
      formData.append('sapChieu', data.sapChieu)
      formData.append('hot', data.hot)
      formData.append('danhGia', data.danhGia)
      formData.append('maNhom', data.maNhom)
      if (data.hinhAnh) {
         formData.append('File', data.hinhAnh, data.hinhAnh.name)
      }

      dispatch(themPhimUploadHinh(formData))     
   })
   
   return (
      <div className='ThemPhim p-3'>
         <p className='font-bold text-xl mb-3'>Thêm mới phim</p>
         <form onSubmit={handleSubmitFrom}>
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
               <Switch onChange={checked => setValue('dangChieu', checked)} />
               <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
            </div>
            {/* Sắp chiếu */}
            <div className='flex mb-2'>
               <p className='m-0 font-semibold w-40 text-right pr-2'>Sắp chiếu: </p>
               <Switch onChange={checked => setValue('sapChieu', checked)} />
               <p className='m-0 text-red-500 h-5 pl-2 w-60'></p>
            </div>
            {/* Hot */}
            <div className='flex mb-2'>
               <p className='m-0 font-semibold w-40 text-right pr-2'>Hot: </p>
               <Switch onChange={checked => setValue('hot', checked)} />
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
               <input required type="file" accept="image/jpg, image/jpeg, image/png, image/gif" className="p-0" onChange={(e) => {
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
               <img src={urlHinhAnh} alt="..." className='w-40 h-40 bg-gray-200' />
            </div>
            {/* Nút thêm phim */}
            <div className='flex mb-2 items-center'>
               <p className='m-0 font-semibold w-40 text-right pr-2'>Tác vụ: </p>
               {themPhim && !errThemPhim ? '' : <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300">
                  Thêm phim
               </button>}
               <p className='m-0 text-red-500 text-xl pl-2 '>{themPhim && !errThemPhim ? <span className='text-green-500'>Thêm phim thành công!</span> : errThemPhim}</p>
            </div>
         </form>
      </div>
   )
}
