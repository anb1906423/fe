import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import PriceTableItem from '../components/PriceTableItem'
import Head from 'next/head'
import { homeAPI } from "../config"

export async function getServerSideProps(context) {
  // Lấy dữ liệu của sản phẩm từ API hoặc từ một nguồn dữ liệu khác
  try {
    const res = await fetch(`${homeAPI}/admin/find-all-price-table`);
    const priceTable = await res.json();

    // Trả về dữ liệu của sản phẩm dưới dạng props cho trang
    return {
      props: {
        priceTable: priceTable,
      },
    }
  } catch (error) {
    console.log(error);
  }
}

const PriceTable = (priceTable) => {

  return (
    <div className="price-table-group">
      <Head>
        <title>Bảng giá ô tô Ford Chi nhánh Cần Thơ</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Bảng giá ô tô tại chi nhánh ủy quyền chính thức của Ford tại thành phố Cần Thơ - fordscantho.com" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='keywords' content='ford ranger xls, Bảng giá, giá xe Territory, giá xe everest, bảng giá ô tô ford, giá ô tô ford tại cần thơ' />
        <meta name="description" content="Cập nhật giá ô tô Ford mới nhất. Ford Territory, Ford Everest, Ford Explorer, Ford Ranger, ..." />
      </Head>
      <Heading title="Bảng giá" />
      <div className="">
        {priceTable.priceTable?.length ? (
          priceTable.priceTable.map((item, index) => {
            return (
              <PriceTableItem
                key={index}
                id={item.id}
                nameCar={item.nameCar}
                srcCar={item.srcCar}
                version={item.version}
                price={item.price}
              />
            )
          })
        ) : <p className="text-center w-100">Bảng giá xe đang được cập nhật!</p>
        }
      </div>
    </div >
  )
}

export default PriceTable