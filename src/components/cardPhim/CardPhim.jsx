import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardPhim(props) {
   const { phim } = props
   const navigate = useNavigate()
   return (
      <div className='shadow-lg border'>
         <div className='overflow-hidden'>
            <img src={phim.hinhAnh} alt="" className='w-full h-[350px] hover:scale-110 transition duration-500 cursor-pointer' title={phim.moTa} />
         </div>
         <div className='h-[110px] flex flex-col justify-between'>
            <p className='text-lg font-semibold m-0 p-2'>{phim.tenPhim}</p>
            <button onClick={()=>navigate(`/phimdetail/${phim.maPhim}`)} className='w-full font-bold transition duration-300 mb-0 bg-amber-500 text-lg p-1  shadow hover:bg-amber-700 hover:text-white'>Chi tiết - Đặt vé</button>
         </div>
      </div>
   )
}
