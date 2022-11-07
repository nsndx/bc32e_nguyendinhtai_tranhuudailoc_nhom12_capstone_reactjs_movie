import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { layDanhSachPhim, quanLyPhimActions, xoaPhim } from '../../../stores/quanLyPhimReducer/quanLyPhimReducer'

export default function QuanLyPhim() {
   const { register, handleSubmit } = useForm()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { listPhim, delPhim, errDelPhim } = useSelector(state => state.quanLyPhimReducer)
   const [searchParam, setSearchParam] = useSearchParams()
   const [tenPhim, setTenPhim] = useState()

   
   useEffect(() => {
      dispatch(layDanhSachPhim(`${tenPhim}${searchParam.get('tenPhim')}`))
   }, [delPhim, searchParam])

   return (
      <div className='QuanLyPhim p-3'>
         <p className='font-bold text-xl mb-3'>Quản lý phim</p>
         <button onClick={() => navigate('addnew')} className='py-1 px-3 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white'>Thêm phim</button>
         <form onSubmit={handleSubmit(data => {
            setSearchParam({ tenPhim: `${data.paramSearch.trim()}` })
            setTenPhim('tenPhim=')
         })} className='flex mt-2'>
            <input onInput={(e) => {
               if (e.target.value === '') {
                  setTenPhim()
                  setSearchParam()
               }
            }} {...register('paramSearch')} type="text" placeholder='Nhập tên phim' className='border w-full p-1 outline-none' />
            <button className=' bg-sky-500 text-white p-1 hover:bg-sky-800'>search</button>
         </form>
         <table className='w-full mt-3'>
            <thead>
               <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                  <th className='w-10'>STT</th>
                  <th className='w-20'>Mã phim</th>
                  <th className='w-20'>Hình ảnh</th>
                  <th className='w-40'>Tên phim</th>
                  <th className='flex-1'>Mô tả</th>
                  <th className='w-40'>Hành động</th>
               </tr>
            </thead>
            <tbody className='block h-[500px] overflow-auto'>
               {[...listPhim].reverse().map((phim, i) => (
                  <tr key={i} className='border-b text-left flex pl-3 py-2'>
                     <td className='w-10'>{i + 1}</td>
                     <td className='w-20'>{phim.maPhim}</td>
                     <td className='w-20'><img src={phim.hinhAnh} alt='' className='w-12' /></td>
                     <td className='w-40'>{phim.tenPhim}</td>
                     <td className='flex-1'>{phim.moTa}</td>
                     <td className='w-40 space-x-2'>
                        <button onClick={() => dispatch(xoaPhim(phim.maPhim))} className='bg-red-500 p-1 rounded-md shadow text-white hover:bg-red-800'>Xoá</button>
                        <button onClick={() => navigate(`edit/${phim.maPhim}`)} className='bg-green-500 p-1 rounded-md shadow text-white hover:bg-green-800'>Sửa</button>
                        <button onClick={() => navigate(`showtime/${phim.maPhim}`)} className='bg-blue-500 p-1 rounded-md shadow text-white hover:bg-blue-800'>Tạo LC</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {delPhim || errDelPhim ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-green-500 text-center'>{delPhim || errDelPhim}</p>
                  <button onClick={() => dispatch(quanLyPhimActions.xoaPhim())} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }
      </div>
   )
}
