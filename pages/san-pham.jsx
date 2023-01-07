import React, { useState, useEffect } from 'react'
import ProductItem from '../components/ProductItem'
import Heading from '../components/Heading'
import Head from 'next/head'
import {homeAPI} from "../config"

const Product = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${homeAPI}/admin`)
      .then((res) => res.json())
      .then((products) => {
        setProducts(products)
      })
  }, [])

  return (
    <div className="product-page">
      <Head>
        <title>Đại lý ủy quyền chính thức của Ford tại Cần Thơ</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Đại lý ủy quyền chính thức của Ford tại Việt Nam" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta name='keywords' content='ford ranger xls, ô tô ford, ford territory, ford ranger, xe thương mại ford, xe du lịch ford, sản phẩm ô tô ford cần thơ'/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='description' content="Trang trưng bày, chi tiết thông số cũng như giá bán các dòng xe Ford chính hãng. Tư vấn tận tình, giá cả hợp lý, đáng tin cậy, tự hào được nhiều khách hàng tin tưởng lựa chọn. - Chi nhánh ủy quyền chính thức của Ford tại Cần Thơ" />
      </Head>
      <Heading title="Xe du lịch" />
      <div className="product-container d-flex flex-row flex-wrap justify-content-start">
        {
          products.map((item, index) => {
            if (item.type === 'Xe du lịch' && item.newProduct) {
              return (
                <ProductItem className="" key={index} name={item.name} src={item.src} href={item.id} price={item.price} />
              )
            }
          })
        }
      </div>

      <Heading title="Xe thương mại" />
      <div className="product-container d-flex flex-row flex-wrap justify-content-start ">
        {
          products.map((item, index) => {
            if (item.type === 'Xe thương mại' && item.newProduct) {
              return (
                <ProductItem className="" key={index} name={item.name} src={item.src} href={item.id} price={item.price} />
              )
            }
          })
        }
      </div>
    </div>
  )
}

export default Product