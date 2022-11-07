import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { layDanhSachNguoiDung, quanLyNguoiDungActions, xoaNguoiDung } from '../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer'

export default function QuanLyUsers() {
   const { register, handleSubmit } = useForm()
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const { xoaUser, errXoaUser, danhSachNguoiDung } = useSelector(state => state.quanLyNguoiDungReducer)
   const [searchParam, setSearchParam] = useSearchParams()
   const [tuKhoa, setTuKhoa] = useState()
   const [pass, setPass] = useState()

    useEffect(() => {
      dispatch(layDanhSachNguoiDung(`${tuKhoa}${searchParam.get('tuKhoa')}`)) 
   }, [xoaUser, searchParam])

   return (
      <div className='QuanLyUsers p-3'>
         <p className='font-bold text-xl mb-3'>Quản lý người dùng</p>
         <button onClick={() => navigate('themnguoidung')} className='py-1 px-3 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white'>Thêm người dùng</button> 
         <form onSubmit={handleSubmit(data => {
            setSearchParam({ tuKhoa: `${data.paramSearch.trim()}` })
            setTuKhoa('tuKhoa=')
         })} className='flex mt-2'>
            <input onInput={(e) => {
               if (e.target.value === '') {
                  setTuKhoa()
                  setSearchParam()
               }
            }} {...register('paramSearch')} type="text" placeholder='Nhập tên tài khoản' className='border w-full p-1 outline-none' />
            <button className=' bg-sky-500 text-white p-1 hover:bg-sky-800'>search</button>
         </form>
         <table className='mt-3 w-full'>
            <thead className='block'>
               <tr className='text-left border-b bg-gray-300 pr-5 pl-3 flex py-1'>
                  <th className='w-10'>STT</th>
                  <th className='w-36'>Tài khoản</th>
                  <th className='w-36'>Mật khẩu</th>
                  <th className='w-36'>Họ tên</th>
                  <th className='w-36'>Email</th>
                  <th className='w-36'>Điện thoại</th>
                  <th className='w-36'>Người dùng</th>
                  <th className='flex-1'>Hành động</th>
               </tr>
            </thead>
            <tbody className='block h-[500px] overflow-auto'>
               {danhSachNguoiDung?.map((nguoiDung, i) => (
                  <tr key={i} className='border-b text-left flex pl-3 py-2'>
                     <td className='w-10'>{i + 1}</td>
                     <td className='w-36 break-words'>{nguoiDung.taiKhoan}</td>
                     <td className='w-36 break-words cursor-pointer' onClick={() => {
                        if (pass === i) {
                           setPass()
                        } else {
                           setPass(i)
                        }
                     }}>{pass === i ? nguoiDung.matKhau : '*****'}</td>
                     <td className='w-36 break-words'>{nguoiDung.hoTen}</td>
                     <td className='w-36 break-words'>{nguoiDung.email}</td>
                     <td className='w-36 break-words'>{nguoiDung.soDT}</td>
                     <td className='w-36 break-words'>{nguoiDung.maLoaiNguoiDung === 'KhachHang' ? 'Khách Hàng' : 'Quản trị'}</td>
                     <td className='flex-1 space-x-2'>
                        <button onClick={() => navigate(`suanguoidung/${nguoiDung.taiKhoan}`)} className='bg-green-500 p-1 rounded-md shadow text-white hover:bg-green-800'>sửa</button>
                        <button onClick={() => { dispatch(xoaNguoiDung(nguoiDung.taiKhoan)) }} className='bg-red-500 p-1 rounded-md shadow text-white hover:bg-red-800'>Xoá</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         {xoaUser || errXoaUser ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-40 shadow flex flex-col justify-center items-center'>
                  <p className='text-xl text-green-500 text-center'>{xoaUser || errXoaUser}</p>
                  <button onClick={() => dispatch(quanLyNguoiDungActions.xoaNguoiDung())} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }
      </div>
   )
}
