import React from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'

import {
  FaMapMarkerAlt,
  FaPhoneSquareAlt,
  FaFirefox,
  FaFacebookSquare
} from 'react-icons/fa'

const Contact = () => {
  const contactInfor = [
    {
      icon: <FaMapMarkerAlt />,
      content: 'Lô 11C, Võ Nguyên Giáp, Quận Cái Răng, TP.Cần Thơ',
      href: '#'
    },
    {
      icon: <FaPhoneSquareAlt />,
      content: '0918.941.966 Mr.Văn Tâm',
      href: '#'
    },
    {
      icon: <FaFacebookSquare />,
      content: 'Nguyễn Văn Tâm',
      href: 'https://www.facebook.com/profile.php?id=100047842143889'
    },
    {
      icon: <FaFirefox />,
      content: 'fordscantho.com',
      href: '#'
    },
  ]
  return (
    <div className="contact">
      <Head>
        <title>Đại lý ủy quyền chính thức của Ford tại Cần Thơ</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Liên hệ đại lý ô tô Ford thành phố Cần Thơ" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ'/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='keywords' content='ford ranger xls, fordscantho.com, ford cần thơ, liên hệ ford cần thơ, đại lý ford, ô tô ford'/>
        <meta name="description" content="Liên hệ nhận báo giá và tư vấn"/>
      </Head>
      <Heading title="Liên hệ" />
      <div className="contact-content d-flex w-100 flex-row flex-wrap justify-content-around">
        {
          contactInfor.map((item, index) =>
            <div className='contact-content-item text-center' key={index}>
              <a href={item.href}>
                <div className="icon-wrapper">
                  {item.icon}
                </div>
              </a>
              <a href={item.href}>
                <div className="content-wrapper">
                  {item.content}
                </div>
              </a>
            </div>
          )
        }
      </div>
      <div className="map">
        <img className="w-100 h-auto" src="./img/map.png" alt="" />
      </div>
    </div>
  )
}

export default Contact