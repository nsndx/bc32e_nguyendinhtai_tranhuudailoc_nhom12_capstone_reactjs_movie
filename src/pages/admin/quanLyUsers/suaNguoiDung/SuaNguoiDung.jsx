import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { capNhatThongTinNguoiDung, layThongTinNguoiDung, quanLyNguoiDungActions } from '../../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer'

export default function SuaNguoiDung() {
   const { register, handleSubmit, reset } = useForm();
   const dispatch = useDispatch()
   const param = useParams()
   const { ttNguoiDung, errCapNhat, capNhat } = useSelector((state) => state.quanLyNguoiDungReducer);

   useEffect(() => {
      dispatch(layThongTinNguoiDung(param.id))     
      dispatch(quanLyNguoiDungActions.capNhat())
   }, [])
   useEffect(() => {
      reset({
         taiKhoan: ttNguoiDung?.taiKhoan,
         matKhau: ttNguoiDung?.matKhau,
         email: ttNguoiDung?.email,
         hoTen: ttNguoiDung?.hoTen,
         soDt: ttNguoiDung?.soDT,
         maLoaiNguoiDung: ttNguoiDung?.maLoaiNguoiDung
      })      
   }, [ttNguoiDung])

  

   return (
      <div className='SuaNguoiDung p-3'>
         <p className='font-bold text-xl mb-3'> Sửa tài khoản: {param.id}</p>
         <form onSubmit={handleSubmit(data => dispatch(capNhatThongTinNguoiDung({ ...data, maNhom: 'GP00' })))}>
            {/* Tài khoản */}
            <div>
               <p className='m-0 font-bold'>Tài khoản</p>
               <input disabled {...register("taiKhoan")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
               <p className='m-0 text-red-500 h-5'>{errCapNhat === 'Tài khoản đã tồn tại!' ? errCapNhat : ''}</p>
            </div>
            {/* Mật khẩu */}
            <div>
               <p className='m-0 font-bold'>Mật khẩu</p>
               <input required {...register("matKhau")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
               <p className='m-0 text-red-500 h-5'></p>
            </div>
            {/* Email */}
            <div>
               <p className='m-0 font-bold'>Email</p>
               <input required {...register("email")} type="email" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
               <p className='m-0 text-red-500 h-5'>{errCapNhat === 'Email đã tồn tại!' ? errCapNhat : ''}</p>
            </div>
            {/* Họ tên */}
            <div>
               <p className='m-0 font-bold'>Họ Tên</p>
               <input required {...register("hoTen")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
               <p className='m-0 text-red-500 h-5'></p>
            </div>
            <div>
               <p className='m-0 font-bold'>Số điện thoại</p>
               <input required {...register("soDt")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
               <p className='m-0 text-red-500 h-5'></p>
            </div>
            <div>
               <p className='m-0 font-bold'>Loại người dùng</p>
               <select {...register("maLoaiNguoiDung")} className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 ">
                  <option value="KhachHang">Khách hàng</option>
                  <option value="QuanTri">Quản trị</option>
               </select>
               <p className='m-0 text-red-500 h-5'></p>
            </div>

            <div className="lg:text-right mt-3 flex justify-between">
               <span className='text-green-500 text-xl'>{capNhat && !errCapNhat ? 'Cập nhật tài khoản thành công!' : ''}</span>               
               {capNhat && !errCapNhat ? '' : <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300">
                  Cập nhật người dùng
               </button>}
            </div>
         </form>
      </div>
   )
}
