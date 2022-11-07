import React, { memo } from 'react'
import Slider from 'react-slick';
import styled from 'styled-components';

function TrangChuBanner(props) {
   const { listBanner } = props
   const settings = {
      autoplay: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
   };
   return (
      <Container className='TrangChuBanner'>
         <div>
            <Slider {...settings}>
               {listBanner.map((banner, i) => (
                  <div key={i}>
                     <div className='h-[600px] bg-bottom bg-cover bg-no-repeat' style={{ backgroundImage: `url(${banner.hinhAnh})` }}></div>
                  </div>
               ))}
            </Slider>
         </div>
      </Container>
   )
}

export default memo(TrangChuBanner)

export const Container = styled.div`
   &.TrangChuBanner{
      .slick-prev{
         left:10px;
         z-index:1;
         width:initial;
         height:initial;
         &::before{
            font-size:50px;
         }
      }
      .slick-next{
         right:10px;
         width:initial;
         height:initial;
         &::before{
            font-size:50px;
         }
      }
      .slick-dots{
         bottom:10px;
         text-align: left;
         left:10px;
         width:auto;
         button{
            &:before{
               color:white;
               font-size:20px;
            }
         }
      }
      .slick-active{
         button{
            &:before{
               opacity:1;
            }
         }
      }
   }
`