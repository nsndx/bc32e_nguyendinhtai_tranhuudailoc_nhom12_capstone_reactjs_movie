import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MaNhom } from '../../constants/api';
import { dangKyNguoiDung, quanLyNguoiDungActions } from '../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer';

export default function DangKi() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { register, handleSubmit } = useForm();
   const { errDangKi, dangKy } = useSelector((state) => state.quanLyNguoiDungReducer);
   useEffect(() => {
      if (!errDangKi && dangKy) {
         navigate('/user/dangnhap');
      }
   })
   useEffect(() => {
      dispatch(quanLyNguoiDungActions.dangKy())
   }, []);
   
   return (
      <section className="h-screen">
         <div className="px-6 h-full text-gray-800">
            <div className="flex xl:justify-center lg:justify-between justify-center flex-wrap h-full g-6">
               <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0 mt-10">
                  <p className="text-xl mb-5 font-bold">Đăng kí tài khoản</p>
                  <form onSubmit={handleSubmit(data => dispatch(dangKyNguoiDung({ ...data, maNhom: MaNhom })))}>
                     {/* Tài khoản */}
                     <div>
                        <p className='m-0 font-bold'>Tài khoản</p>
                        <input required {...register("taiKhoan")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                        <p className='m-0 text-red-500 h-7'>{errDangKi === 'Tài khoản đã tồn tại!' ? errDangKi : ''}</p>
                     </div>
                     {/* Mật khẩu */}
                     <div>
                        <p className='m-0 font-bold'>Mật khẩu</p>
                        <input required {...register("matKhau")} type="password" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                        <p className='m-0 text-red-500 h-7'></p>
                     </div>
                     {/* Email */}
                     <div>
                        <p className='m-0 font-bold'>Email</p>
                        <input required {...register("email")} type="email" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                        <p className='m-0 text-red-500 h-7'>{errDangKi === 'Email đã tồn tại!' ? errDangKi : ''}</p>
                     </div>
                     {/* Họ tên */}
                     <div>
                        <p className='m-0 font-bold'>Họ Tên</p>
                        <input required {...register("hoTen")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                        <p className='m-0 text-red-500 h-7'></p>
                     </div>
                     <div>
                        <p className='m-0 font-bold'>Số điện thoại</p>
                        <input required {...register("soDt")} type="text" className="text-lg border border-gray-500 w-full focus:outline-none px-2 py-1 rounded-lg focus:border-blue-600 " />
                        <p className='m-0 text-red-500 h-7'></p>
                     </div>


                     <div className="text-center lg:text-left mt-3">
                        <button className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-800 transition duration-300">
                           Đăng kí
                        </button>
                     </div>
                  </form>
               </div>
               <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 md:mb-0">
                  <img
                     src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                     className="w-full"
                     alt="..."
                  />
               </div>
            </div>
         </div>
      </section>
   )
}
