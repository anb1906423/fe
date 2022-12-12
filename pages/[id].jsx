import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Heading from '../components/Heading'
import ProductItem from '../components/ProductItem'
import Head from 'next/head'
import {homeAPI} from "../config"

const ProductDetail = () => {
    const router = useRouter();
    const productId = router.query.id;

    console.log(productId);
    console.log(router);
    const [products, setProducts] = useState([])
    const [otherProducts, setOtherProducts] = useState([])
    console.log(otherProducts);
    console.log(products);
    useEffect(() => {
        fetch(`${homeAPI}/admin`)
            .then((res) => res.json())
            .then((products) => {
                setProducts(products)
                setOtherProducts(products.sort(() => Math.random() - Math.random()))
            })
    }, [])

    return (
        <div className='product-detail-wrapper'>
            {
                products.map((item, index) => {
                    if (item.id === productId) {
                        return (
                            <div className='product-detail' key={index}>
                                <Head>
                                    <title>{item.name}</title>
                                    <meta name="title" content={item.name} />
                                    <meta name="description" content={item.description} />
                                    <meta name='robots' content='index, follow' />
                                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                                    <meta name='revisit-after' content='1 days' />
                                    <meta http-equiv="content-language" content="vi" />
                                    <meta name='city' content='Cần Thơ'/>
                                    <meta name='keywords' content='Chi tiết xe Suzuki, chi tiết XL7, Ciaz, chi tiết các dòng xe suzuki'/>
                                </Head>
                                <div className="product-infor d-flex flex-row flex-wrap justify-content-start">
                                    <div className="product-imgs">
                                        <img src={item.src} alt="" />
                                    </div>
                                    <div className="product-content">
                                        <div className="product-name">
                                            <h3>{item.name}</h3>
                                            <div className="price-group d-flex justify-content-between">
                                                <b>Giá bán:</b><h4 className="text-danger">{item.price}&nbsp;VNĐ</h4>
                                            </div>
                                            <p dangerouslySetInnerHTML={{ __html: item.description }}></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
            <Heading title="Một vài mẫu xe khác" />
            <div className="other-products w-100 d-flex flex-row flex-wrap justify-content-around">
                {
                    otherProducts.map((item, index) => {
                        if (index <= 2) {
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

export default ProductDetail
