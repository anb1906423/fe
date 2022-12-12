import styles from '../styles/Home.module.css'
import Carousel from '../components/Carousel'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import AccessItem from '../components/AccessItem'
import { FaCarAlt, FaCommentDollar, FaPhoneSquareAlt, FaFacebookSquare } from 'react-icons/fa'
import {homeAPI} from "../config"


export default function Home() {
  const [products, setProducts] = useState([])
  console.log(homeAPI);
  useEffect(() => {
    fetch(homeAPI+'/admin')
      .then((res) => res.json())
      .then((products) => {
        setProducts(products)
        console.log(products);
      })
  }, [])

  const listAccess = [
    {
      icon: <FaCarAlt />,
      content: 'Tất cả xe',
      href: '/san-pham'
    },
    {
      icon: <FaCommentDollar />,
      content: 'Nhận báo giá',
      href: '/nhan-bao-gia'
    },
    {
      icon: <FaPhoneSquareAlt />,
      content: 'Tư vấn trực tiếp 0918.941.966',
      href: '/lien-he'
    },
    {
      icon: <FaFacebookSquare />,
      content: 'Tư vấn qua facebook',
      href: 'https://www.facebook.com/profile.php?id=100047842143889'
    },
  ]
  return (
    <div className={styles.main}>
      <Head>
        <title>Trang chủ</title>
        <meta name="title" content="Suzuki Cần Thơ - Đại lý ô tô Suzuki chính hãng, giá rẻ và uy tín"/>
        <meta name='revisit-after' content='1 days' />
        <meta name='city' content='Cần Thơ'/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="content-language" content="vi" />
        <meta name="description" content="Website trưng bày, tham khảo, chi tiết thông số cũng như giá bán các dòng xe Suzuki chính hãng. Tư vấn tận tình, giá cả hợp lý, đáng tin cậy, được nhiều khách hàng tin tưởng lựa chọn."/>
      </Head>
      <div className={styles.container}>
        <Carousel />
        <div className="access-group d-flex flex-row flex-wrap align-items-center justify-content-around">
          {
            listAccess.map((item, index) => {
              return (
                <AccessItem href={item.href} key={index} icon={item.icon} content={item.content} />
              )
            })
          }
        </div>
        <div className="outstanding">
          <Heading title="Sản phẩm nổi bật" />
          <div className="product-container d-flex flex-row flex-wrap justify-content-start">
            {
              products.map((item, index) => {
                if (index < 4) {
                  return (
                    <ProductItem className="" key={index} name={item.name} src={item.src} href={item.id} price={item.price} />
                  )
                }
              })
            }
          </div>
        </div>
      </div>

    </div>
  )
}
