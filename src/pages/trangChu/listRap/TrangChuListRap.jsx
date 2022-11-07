import { Tabs } from 'antd';
import moment from 'moment';
import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserLogin } from '../../../constants/api';

function TrangChuListRap(props) {
   const navigate = useNavigate()
   const [position, setPosition] = useState('left')
   const { lichChieuHeThongRap } = props
   window.onresize = () => {
      if (window.innerWidth <= 1024) {
         setPosition('top')
      } else {
         setPosition('left')
      }
   }
   return (
      <Container className='TrangChuListRap container overflow-hidden py-5 border-t'>
         <Tabs tabPosition={position}
            items={lichChieuHeThongRap.map((heThongRap, i) => {
               return {
                  key: i,
                  label: <img src={heThongRap.logo} alt='' className='w-20 border' />,
                  children: <Tabs tabPosition={position}
                     items={heThongRap.lstCumRap.map((cumRap, i) => {
                        return {
                           key: i,
                           label: <div className='w-40'>
                              <img src={cumRap.hinhAnh} alt='' className='w-20' />
                              <p className='whitespace-normal m-0 text-left'>{cumRap.diaChi}</p>
                           </div>,
                           children: <div>
                              {cumRap.danhSachPhim.map((phim, i) => (
                                 <div key={i} className='border-b py-3 sm:flex'>
                                    <div>
                                       <img src={phim.hinhAnh} alt="" className='w-32' />
                                    </div>
                                    <div className='sm:pl-5 flex-1'>
                                       <p className='text-2xl font-semibold m-0'>{phim.tenPhim}</p>
                                       <div className='grid sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-3'>
                                          {phim.lstLichChieuTheoPhim.slice(0, 12).map((lichChieu, i) => (
                                             <button onClick={() => {
                                                localStorage.getItem(UserLogin) ? navigate(`/datve/${lichChieu.maLichChieu}`) : navigate('/user/dangnhap')
                                             }} key={i} className='bg-amber-500 text-white md:text-lg rounded-lg py-2 font-semibold hover:bg-amber-700 transition duration-300'>{moment(lichChieu.ngayChieuGioChieu).format('dd DD-MM-YYYY')}</button>
                                          ))}
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        };
                     })}
                  />
               };
            })}
         />
      </Container>
   )
}
export default memo(TrangChuListRap)

const Container = styled.div`
   &.TrangChuListRap{
      .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn{
         color:#f59e0b;
      }
      .ant-tabs-tab:hover{
         color:#f59e0b;
      }
      .ant-tabs-ink-bar{
         background-color:#f59e0b;
      }
   }
`
