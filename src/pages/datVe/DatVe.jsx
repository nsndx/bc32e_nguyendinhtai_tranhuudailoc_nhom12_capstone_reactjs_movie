import { Tabs } from 'antd';
import moment from 'moment';
import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { datVe, layDanhSachPhongVe, quanLyDatVeActions } from '../../stores/quanLyDatVeReducer/quanLyDatVeReducer'
import { thongTinTaiKhoan } from '../../stores/quanLyNguoiDungReducer/quanLyNguoiDungReducer';

export default function DatVe() {
   return (
      <Container className='DatVe pt-20 pb-10 container'>
         <Tabs items={[
            { label: <span className='font-bold uppercase sm:text-lg'>01-Chọn ghế & thanh toán</span>, key: 1, children: <ChonGhe /> },
            { label: <span className='font-bold uppercase sm:text-lg'>02-Kết quả đặt vé</span>, key: 2, children: <KetQuaDatVe /> },
         ]} />
      </Container>
   )
}

function ChonGhe() {
   const param = useParams()
   const dispatch = useDispatch()
   const { danhSachPhongVe, danhSachGheDangDat, ketQuaDatVe, errKetQuaDatVe } = useSelector(state => state.quanLyDatVeReducer)
   const { danhSachGhe, thongTinPhim } = danhSachPhongVe
   const danhSachVe = danhSachGheDangDat?.map(ghe => { return { maGhe: ghe.maGhe, giaVe: ghe.giaVe } })
   useEffect(() => {
      dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
   }, [])
   useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(layDanhSachPhongVe(param.malichchieu))
   }, [ketQuaDatVe])

   return (
      <div className='ChonGhe pt-3'>
         <div className='grid grid-cols-12'>
            <div className='col-span-12 lg:col-span-8 pb-5 lg:pr-5'>
               <div>
                  <div className='bg-amber-500 h-3'></div>
                  <div className='w-11/12 h-0 m-auto text-center text-white text-xl border-b-[40px] border-gray-600 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent drop-shadow-[0_12px_10px_#757373]'>Màn hình</div>
               </div>
               <div className='pt-10 pb-3 text-center'>
                  {danhSachGhe?.map((ghe, i) => {
                     let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : ''
                     let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : ''
                     let classGheDangDat = danhSachGheDangDat.find(gheDangDat => gheDangDat.maGhe === ghe.maGhe) ? 'gheDangDat' : ''
                     return <Fragment key={i}>
                        <button onClick={() => {
                           dispatch(quanLyDatVeActions.danhSachGheDangDat(ghe))
                        }} disabled={ghe.daDat} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} w-4 h-4 m-[1px] text-[10px] sm:w-6 sm:h-6 sm:text-xs sm:m-1 md:w-8 md:h-8 md:m-[6px] md:text-base lg:w-7 lg:h-7 lg:m-[5px] xl:w-9 xl:h-9 shadow`} >{ghe.daDat === true ? 'X' : ghe.stt}</button>
                        {(i + 1) % 16 === 0 ? <br /> : ''}
                     </Fragment>
                  })}
               </div>
               <div className='border-t pt-3 space-x-3 text-center'>
                  <span className='whitespace-nowrap'><button className='ghe w-6 h-6' style={{ cursor: 'default' }}></button> <span>Ghế thường</span></span>
                  <span className='whitespace-nowrap'><button className='ghe gheVip w-6 h-6' style={{ cursor: 'default' }}></button> <span>Ghế VIP</span></span>
                  <span className='whitespace-nowrap'><button className='ghe gheDangDat w-6 h-6' style={{ cursor: 'default' }}></button> <span>Ghế đang chọn</span></span>
                  <span className='whitespace-nowrap'><button className='ghe gheDaDat w-6 h-6' style={{ cursor: 'default' }}></button> <span>Ghế đã đặt</span></span>
                  <span className='whitespace-nowrap'><button className='bg-blue-500 w-6 h-6 inline-block rounded-md shadow' style={{ cursor: 'default' }}></button> <span>Ghế đang có người chọn</span></span>
               </div>
            </div>
            <div className='col-span-12 lg:col-span-4 border p-3 shadow-lg text-base'>
               <div className='border-b text-center flex pb-3 items-center'>
                  <img src={thongTinPhim?.hinhAnh} alt="" className='w-1/4' />
                  <p className='text-amber-500 font-bold text-4xl m-0 text-center flex-1'>{thongTinPhim?.tenPhim}</p>
               </div>
               <div className='border-b py-3 flex justify-between'>
                  <p className='m-0 font-semibold'>Ngày chiếu giờ chiếu</p>
                  <p className='m-0 text-right'><span>{thongTinPhim?.ngayChieu}</span>-<span className='text-amber-500'>{thongTinPhim?.gioChieu}</span></p>
               </div>
               <div className='border-b py-3 flex justify-between'>
                  <p className='m-0 font-semibold w-20'>Cụm rạp</p>
                  <p className='m-0 text-right'>{thongTinPhim?.tenCumRap}</p>
               </div>
               <div className='border-b py-3 flex justify-between'>
                  <p className='m-0 font-semibold w-28'>Địa chỉ</p>
                  <p className='m-0 text-right'>{thongTinPhim?.diaChi}</p>
               </div>
               <div className='border-b py-3 flex justify-between'>
                  <p className='m-0 font-semibold'>Rạp</p>
                  <p className='m-0'>{thongTinPhim?.tenRap}</p>
               </div>
               <div className='border-b py-3 flex justify-between'>
                  <p className='m-0 font-semibold w-20 text-amber-500'>Ghế chọn</p>
                  <div className='space-x-2 flex-1 text-right'>
                     {danhSachGheDangDat.map((ghe, i) => (
                        <p className='m-0 font-semibold' key={i}>
                           {ghe.loaiGhe === 'Thuong' ? <span className='text-gray-500'>Thường</span> : <span className='text-amber-500'>{ghe.loaiGhe}</span>}<span>/</span>
                           <span className='text-green-600'>số-{ghe.stt}</span><span>/</span>
                           <span className='text-amber-500'>Giá:{ghe.giaVe.toLocaleString()}đ</span>
                        </p>
                     ))}
                  </div>
               </div>
               <div className='border-b py-3 flex justify-between'>
                  <p className='m-0 font-semibold'>Ưu đãi</p>
                  <p className='m-0'>0%</p>
               </div>
               <div className='border-b py-3 flex justify-between items-center'>
                  <p className='m-0 font-semibold'>Tổng tiền</p>
                  <p className='m-0 text-amber-500 text-3xl font-bold'>{danhSachGheDangDat.reduce((tongTien, ghe) => tongTien += ghe.giaVe, 0).toLocaleString()}đ</p>
               </div>
               <div className='pt-3'>
                  <button onClick={() => {
                     dispatch(datVe({ maLichChieu: param.malichchieu, danhSachVe: (danhSachGheDangDat[0] === undefined ? 'chưa chọn ghế' : danhSachVe) }))
                  }} className='bg-amber-500 w-full font-bold text-xl py-2 rounded-xl text-white hover:bg-amber-700 transition duration-300'>Đặt vé</button>
               </div>
            </div>
         </div>
         {ketQuaDatVe || errKetQuaDatVe ?
            <div className='fixed top-0 bottom-0 left-0 right-0 bg-black/40'>
               <div className='w-80 h-40 bg-white mx-auto mt-60 shadow flex flex-col justify-center items-center'>
                  {ketQuaDatVe ? <p className='text-xl text-green-500 text-center'>{ketQuaDatVe}</p>:''}
                  {errKetQuaDatVe ? <p className='text-xl text-red-500 text-center'>Bạn chưa chọn ghế</p>:''}
                  <button onClick={() => {
                     dispatch(quanLyDatVeActions.huyErrKetQuaDatVe())
                  }} className=' py-3 px-7 rounded-lg bg-amber-800 text-white hover:bg-amber-500'>OK</button>
               </div>
            </div> : ''
         }
      </div >
   )
}

function KetQuaDatVe() {
   const dispatch = useDispatch()
   const { ttTaiKhoan } = useSelector(state => state.quanLyNguoiDungReducer)
   const { ketQuaDatVe } = useSelector(state => state.quanLyDatVeReducer)

   useEffect(() => {
      dispatch(thongTinTaiKhoan())
   }, [ketQuaDatVe])

   return (
      <div className='KetQuaDatVe'>
         <div className='text-lg font-semibold border-b pb-3'>
            <span>Tài khoản: </span><span className='text-amber-500 mr-2'>{ttTaiKhoan?.taiKhoan}</span>
            <span>Email: </span><span className='text-amber-500 mr-2'>{ttTaiKhoan?.email}</span>
            <span>Họ tên: </span><span className='text-amber-500 mr-2'>{ttTaiKhoan?.hoTen}</span>
            <span>Số điện thoại: </span><span className='text-amber-500'>{ttTaiKhoan?.soDT}</span>
         </div>
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
      </div>
   )
}

const Container = styled.div`
   &.DatVe{
      .ant-tabs-top > .ant-tabs-nav{
            box-shadow:0 3px 5px 0 #0000002e;
         padding:5px;
      }
         .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
            color:#f59e0b;
      }
         .ant-tabs-ink-bar{
            background-color:#f59e0b;
      }
         .ant-tabs-tab:hover{
            color:#f59e0b;
      }
         .ghe{
         border-radius:5px;
         cursor: pointer;
         color:#fff;
         background-color: #aaa;
      }
         .gheDaDat{
            background-color:red !important;
         cursor:no-drop
      }
         .gheDangDat{
            background-color:green !important;
      }
         .gheVip{
            background-color:orange;
      }
   }
`

