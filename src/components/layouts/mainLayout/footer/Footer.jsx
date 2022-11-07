import React, { useEffect } from 'react'
import { AiFillFacebook, AiFillGithub, AiFillTwitterSquare } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { layThongTinHeThongRap } from '../../../../stores/quanLyRapReducer/quanLyRapReducer'

export default function Footer() {
   const dispatch = useDispatch()
   const { thongTinHeThongRap } = useSelector(state => state.quanLyRapReducer)

   useEffect(() => {
      dispatch(layThongTinHeThongRap())
   }, [])

   return (
      <footer className="Footer py-3 bg-gray-800">
         <div className="container text-white">
            <div className="grid grid-cols-12 border-b border-gray-500 pb-3">
               <div className="pb-6 col-span-full md:pb-0 md:col-span-4">
                  <img className='w-40' src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
               </div>
               <div className="pb-6 col-span-full md:pb-0 sm:col-span-6 text-center md:col-span-4">
                  <p className="pb-1 text-lg font-medium">Danh sách rạp</p>
                  <div className='grid grid-cols-3 gap-5'>
                     {thongTinHeThongRap.map((rap, i) => (
                        <div key={i}>
                           <img src={rap.logo} alt="" className='w-10 m-auto'/>
                        </div>
                     ))}
                  </div>
               </div>
               <div className="col-span-full sm:col-span-6 text-center sm:text-right md:text-right md:col-span-4">
                  <p className="pb-1 text-lg font-medium">Chính sách</p>
                  <p>Term of user</p>
                  <p>Privacy Policy</p>
                  <p>Securyty</p>
               </div>
            </div>
            <div className="flex flex-wrap justify-center items-center sm:justify-between">
               <div>
                  <span>©2022 All rights reserved</span>                  
               </div>
               <div className="flex justify-center space-x-4">
                  <a href="https://www.facebook.com/" className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-gray-900">
                     <AiFillFacebook className='inline-block text-2xl' />
                  </a>
                  <a href="https://twitter.com/" className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-gray-900">
                     <AiFillTwitterSquare className='inline-block text-2xl' />
                  </a>
                  <a href="https://github.com/" className="flex items-center justify-center w-10 h-10 rounded-full dark:bg-violet-400 dark:text-gray-900">
                     <AiFillGithub className='inline-block text-2xl' />
                  </a>
               </div>
            </div>
         </div>
      </footer>
   )
}
