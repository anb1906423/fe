import React, { useState, useEffect } from 'react'
import Heading from '../components/Heading'
import PriceTableItem from '../components/PriceTableItem'
import Head from 'next/head'
import {homeAPI} from "../config"

const PriceTable = () => {
  const [priceTable, setPriceTable] = useState([])
  const [roles, setRoles] = useState(0)

  useEffect(() => {
    fetch(`${homeAPI}/admin/find-all-price-table`)
      .then((res) => res.json())
      .then((priceTable) => {
        setPriceTable(priceTable)
      })
  }, [])
  return (
    <div className="price-table-group">
      <Head>
        <title>Bảng giá</title>
        <meta name="title" content="Bảng giá xe Suzuki Cần Thơ - xesuzukicantho.com"/>
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ'/>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='keywords' content='Chi tiết giá xe Suzuki, giá xe XL7, giá xe Ciaz, bảng giá xe suzuki, giá xe suzuki cần thơ'/>
        <meta name="description" content="Cập nhật bảng giá mới nhất từng dòng xe Suzuki. XL7, New XL7 Sport Limited, Ciaz, Ertiga, Swift ..." />
      </Head>
      <Heading title="Bảng giá" />
      <div className="">
        {priceTable?.length ? (
          priceTable.map((item, index) => {
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