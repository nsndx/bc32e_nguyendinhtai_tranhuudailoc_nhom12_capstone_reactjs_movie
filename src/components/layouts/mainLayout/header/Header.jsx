import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { quanLyNguoiDungActions } from "../../../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer";
import { UserLogin } from "../../../../constants/api";
import { quanLyDatVeActions } from "../../../../stores/quanLyDatVeReducer/quanLyDatVeReducer";

export default function Header() {
   const active = ({ isActive }) => isActive ? { color: "#f59e0b" } : undefined;
   const activeTK = ({ isActive }) => isActive ? { backgroundColor: "#f59e0b" } : undefined;
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const nguoiDung = JSON.parse(localStorage.getItem(UserLogin));
   const [navbar, setNavbar] = useState(false);

   return (
      <header className="Header py-2 bg-black/80 shadow-[0_0px_5px_5px_rgba(0,0,0,0.8)] fixed top-0 z-10 w-full">
         <div className="container">
            <div className="justify-between lg:items-center lg:flex">
               <div>
                  <div className="flex items-center justify-between lg:block">
                     <NavLink to="trangchu">
                        <img className="w-40" src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
                     </NavLink>
                     <div className="lg:hidden">
                        <button className="p-2 text-white rounded-md outline-none border" onClick={() => setNavbar(!navbar)}>
                           {navbar ? <AiOutlineClose /> : <AiOutlineMenu />}
                        </button>
                     </div>
                  </div>
               </div>
               <div>
                  <div className={`flex-1 justify-self-center py-3 lg:block lg:py-0 ${navbar ? "block" : "hidden"}`}>
                     <ul className="items-center justify-center space-y-2 lg:flex lg:space-x-6 lg:space-y-0 mb-0 font-bold text-xl">
                        <li>
                           <NavLink style={active} to='trangchu' className="text-white hover:text-amber-500">
                              Trang chủ
                           </NavLink>
                        </li>
                        <li>
                           <NavLink style={active} to="tintuc" className="text-white hover:text-amber-500">
                              Tin tức
                           </NavLink>
                        </li>
                        <li>
                           <NavLink style={active} to="lienhe" className="text-white hover:text-amber-500">
                              Liên hệ
                           </NavLink>
                        </li>
                     </ul>

                     <div className="mt-3 space-x-2 lg:hidden ">
                        {nguoiDung ? (
                           <div className="inline-block space-x-2">
                              <NavLink style={activeTK} to="thongtincanhan" className="inline-block text-lg rounded-lg px-6 py-2 text-white bg-amber-800 hover:bg-amber-500 hover:text-white transition duration-300">
                                 Chào! {nguoiDung.taiKhoan}
                              </NavLink>
                              <button onClick={() => {
                                 dispatch(quanLyNguoiDungActions.dangXuat());
                                 dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
                                 navigate("/trangchu");
                              }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Đăng xuất
                              </button>
                              {nguoiDung.maLoaiNguoiDung === 'QuanTri' ? <NavLink to="/admin/films" className="inline-block px-4 py-2 text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Page Admin
                              </NavLink> : ''}
                           </div>
                        ) : (
                           <div className="inline-block space-x-2">
                              <NavLink to="/user/dangnhap" className="inline-block px-4 py-2 text-center text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Đăng nhập
                              </NavLink>
                              <NavLink to="/user/dangky" className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                                 Đăng kí
                              </NavLink>
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="hidden lg:block">
                  {nguoiDung ? (
                     <div className="inline-block space-x-2">
                        <NavLink style={activeTK} to="thongtincanhan" className="inline-block text-lg rounded-lg px-6 py-2 text-white bg-amber-800 hover:bg-amber-500 hover:text-white transition duration-300">
                           Chào! {nguoiDung.taiKhoan}
                        </NavLink>
                        <button onClick={() => {
                           dispatch(quanLyNguoiDungActions.dangXuat());
                           dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
                           navigate("/trangchu");
                        }} className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Đăng xuất
                        </button>
                        {nguoiDung.maLoaiNguoiDung === 'QuanTri' ? <NavLink to="/admin/films" className="inline-block px-4 py-2 text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Page Admin
                        </NavLink> : ''}
                     </div>
                  ) : (
                     <div className="inline-block space-x-2">
                        <NavLink to="/user/dangnhap" className="inline-block px-4 py-2 text-center text-white bg-amber-800 rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Đăng nhập
                        </NavLink>
                        <NavLink to="/user/dangky" className="inline-block px-4 py-2 text-black bg-white rounded-md shadow hover:bg-amber-500 hover:text-white transition duration-300">
                           Đăng kí
                        </NavLink>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
}
