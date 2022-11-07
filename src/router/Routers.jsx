import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import AdminLayout from '../components/layouts/adminLayout/AdminLayout'
import MainLayout from '../components/layouts/mainLayout/MainLayout'
import UserLayout from '../components/layouts/userLayout/UserLayout'
import QuanLyPhim from '../pages/admin/quanLyPhim/QuanLyPhim'
import SuaPhim from '../pages/admin/quanLyPhim/suaPhim/SuaPhim'
import TaoLichChieu from '../pages/admin/quanLyPhim/taoLichChieu/TaoLichChieu'
import ThemPhim from '../pages/admin/quanLyPhim/themPhim/ThemPhim'
import QuanLyUsers from '../pages/admin/quanLyUsers/QuanLyUsers'
import SuaNguoiDung from '../pages/admin/quanLyUsers/suaNguoiDung/SuaNguoiDung'
import ThemNguoiDung from '../pages/admin/quanLyUsers/themNguoiDung/ThemNguoiDung'
import DangKi from '../pages/dangKi/DangKi'
import DangNhap from '../pages/dangNhap/DangNhap'
import DatVe from '../pages/datVe/DatVe'
import PhimDetail from '../pages/phimDetail/PhimDetail'
import ThongTinCaNhan from '../pages/thongTinCaNhan/ThongTinCaNhan'
import TrangChu from '../pages/trangChu/TrangChu'

export default function Routers() {
   return useRoutes([
      {
         path: '',
         element: <MainLayout />,
         children: [
            {
               path: '',
               element: <Navigate to='trangchu' />
            },
            {
               path: 'trangchu',
               element: <TrangChu />
            },
            {
               path: 'phimdetail/:maphim',
               element: <PhimDetail />
            },
            {
               path: 'datve/:malichchieu',
               element: <DatVe />
            },
            {
               path: 'thongtincanhan',
               element: <ThongTinCaNhan />
            },
            {
               path: '/tintuc',
               element: 'NO PAGE'
            },
            {
               path: 'lienhe',
               element: 'NO PAGE'
            },
         ]
      },
      
      {
         path: 'user',
         element: <UserLayout />,
         children: [
            {
               path: 'dangnhap',
               element: <DangNhap />
            },
            {
               path: 'dangky',
               element: <DangKi />
            },                 
         ]
      },

      {
         path: 'admin',
         element: <AdminLayout />,
         children: [
            {
               path: 'films',
               element: <QuanLyPhim />
            },
            {
               path: 'films/addnew',
               element: <ThemPhim />
            },
            {
               path: 'films/edit/:id',
               element: <SuaPhim />
            },
            {
               path: 'films/showtime/:id',
               element: <TaoLichChieu />
            },
            {
               path: 'users',
               element: <QuanLyUsers/>
            },
            {
               path: 'users/themnguoidung',
               element: <ThemNguoiDung />
            }, 
            {
               path: 'users/suanguoidung/:id',
               element: <SuaNguoiDung />
            }, 
         ]
      },
   ])
}
