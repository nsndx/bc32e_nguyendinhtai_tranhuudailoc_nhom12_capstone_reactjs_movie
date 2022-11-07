import React, { memo } from 'react'
import { useSearchParams } from 'react-router-dom';
import Slider from 'react-slick';
import styled from 'styled-components';
import CardPhim from '../../../components/cardPhim/CardPhim';

function TrangChuListPhim(props) {
   const [search, setSearch] = useSearchParams({ phimdangchieu: true })
   const { listPhim } = props

   var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      rows: 2,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
               slidesToScroll: 3,
            }
         },
         {
            breakpoint: 768,
            settings: {
               slidesToShow: 2,
               slidesToScroll: 2,
            }
         },
         {
            breakpoint: 576,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1
            }
         }
      ]
   };

   return (
      <Container className='TrangChuListPhim container pb-10 pt-5 overflow-hidden'>
         <button onClick={() => setSearch({ phimdangchieu: true })} className={`text-lg transition duration-300 p-2 font-semibold rounded-lg shadow mr-2 hover:bg-amber-500 ${search.get('phimdangchieu') === 'true' ? 'bg-amber-500' : 'bg-gray-300'}`}>Phim đang chiếu</button>
         <button onClick={() => setSearch({ phimdangchieu: false })} className={`text-lg transition duration-300 font-semibold p-2 rounded-lg shadow hover:bg-amber-500 ${search.get('phimdangchieu') === 'false' ? 'bg-amber-500' : 'bg-gray-300'}`}>Phim sắp chiếu</button>
         <Slider {...settings} className='-mx-5'>
            {[...listPhim].reverse().filter(phim => phim.dangChieu.toString() === search.get('phimdangchieu')).map((phim, i) => (
               <div key={i}>
                  <div className='p-5'>
                     <CardPhim phim={phim} />
                  </div>
               </div>
            ))}
         </Slider>
      </Container>
   )
}
export default memo(TrangChuListPhim)

const Container = styled.div`
   &.TrangChuListPhim{
      .slick-prev{
         width:initial;
         height:initial;
         left:20px;
         bottom:-35px;
         top:auto;
         &::before{
            color:black;
            font-size:30px;
         }
      }
      .slick-next{
         width:initial;
         height:initial;
         bottom:-35px;
         right:20px;
         top:auto;
         &::before{
            color:black;
            font-size:30px;
         }
      }
   }

`