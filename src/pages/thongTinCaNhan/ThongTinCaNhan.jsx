import { Collapse } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thongTinTaiKhoan } from "../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer";

export default function ThongTinCaNhan() {
   const { Panel } = Collapse;
   const dispatch = useDispatch()
   const { ttTaiKhoan } = useSelector(state => state.quanLyNguoiDungReducer)
   useEffect(() => {
      dispatch(thongTinTaiKhoan())
   }, [])

   return (
      <div className='ThongTinCaNhan container py-20'> 
      <p className="text-xl text-center mb-10">Trang cá nhân</p>
         <div className='text-lg font-semibold border-b pb-3 flex'>
            <div>
               <img src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg" alt="" className="w-40" />
            </div>
            <div className="pl-5">
               <p><span>Tài khoản: </span><span className='text-amber-500 mr-2'>{ttTaiKhoan?.taiKhoan}</span><span className="text-blue-500 text-sm">( {ttTaiKhoan?.loaiNguoiDung.tenLoai} )</span></p>
               <p><span>Email: </span><span className='text-amber-500 mr-2'>{ttTaiKhoan?.email}</span></p>
               <p><span>Họ tên: </span><span className='text-amber-500 mr-2'>{ttTaiKhoan?.hoTen}</span></p>
               <p><span>Số điện thoại: </span><span className='text-amber-500'>{ttTaiKhoan?.soDT}</span></p>
            </div>
         </div>
         <Collapse accordion>
            <Panel header={<span className="text-lg font-semibold text-amber-500">Lịch sử đặt vé</span>}>
               <div>
                  {ttTaiKhoan?.thongTinDatVe.map((ve, i) => (
                     <div key={i} className='py-2 border-b grid grid-cols-12'>
                        <div className='col-span-4 md:col-span-2 lg:col-span-1'>
                           <img src={ve.hinhAnh} alt="" className='w-full' />
                        </div>
                        <div className='col-span-8 pl-3 md:col-span-3'>
                           <p className='m-0 text-xl font-bold text-amber-500'>{ve.tenPhim}</p>
                           <p className='m-0 text-green-500'>Thời lượng phim: {ve.thoiLuongPhim}p</p>
                           <p className='m-0 text-amber-500'>Ngày đặt: {moment(ve.ngayDat).format('HH:mm DD-MM-YYYY')}</p>
                        </div>
                        <div className='col-span-12 md:col-span-7 md:pl-3'>
                           <p className='m-0 font-semibold'>Danh sách ghế</p>
                           {ve.danhSachGhe.map((ghe, i) => (
                              <div key={i}>
                                 <span className='font-semibold'>Ghế: </span><span className='text-amber-500'>{ghe.tenGhe}</span><span>/</span>
                                 <span className='text-amber-500'>{ghe.tenRap}</span><span>/</span><span className='text-amber-500'>{ghe.tenHeThongRap}</span>
                              </div>
                           ))}
                        </div>
                        <div className='col-span-12 lg:col-span-1'>
                           <p><span className='font-semibold'>Tổng tiền:</span> <span className='text-amber-500 text-xl font-semibold'>{(ve.giaVe * ve.danhSachGhe.length).toLocaleString()}đ</span></p>
                        </div>
                     </div>
                  ))}
               </div>
            </Panel>
         </Collapse>         
      </div>

   )
};

