import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Heading from '../../components/Heading'
import Head from 'next/head'
import { swalert, swtoast } from "../../mixins/swal.mixin";
import Cookie, { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import CKeditor from '../../components/CKeditor'
import $ from 'jquery'
const EDITPRODUCT_URL = `${homeAPI}/admin/`
import { homeAPI, feAPI } from "../../config"

const EditProduct = () => {
    const router = useRouter()
    const productId = router.query.id;

    const nameRef = useRef();
    const priceRef = useRef();
    const srcRef = useRef();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [src, setSrc] = useState('');
    var [type, setType] = useState('');
    const [products, setProducts] = useState([])
    const [newProduct, setNewProduct] = useState(() => {
        if (products.id == productId) return products.newProduct
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    const [err, setErr] = useState('')

    const [cookies, setCookie] = useCookies(['user']);
    const userCookie = cookies.user
    const [roles, setRoles] = useState(0)
    const [token, setToken] = useState('')

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (userCookie.roles != 1) {
            $('.admin-page').hide()
        }
        setToken(userCookie.accessToken)
        setRoles(userCookie.roles)

        const getProducts = async () => {
            fetch(`${homeAPI}/admin`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((res) => res.json())
                .then((products) => {
                    setProducts(products)
                    console.log(products);
                    products.map((item, index) => {
                        if (item.id === productId) {
                            setName(item.name);
                            setPrice(item.price);
                            setDescription(item.description)
                            setSrc(item.src);
                            setType(item.type);
                            setNewProduct(item.newProduct)

                            console.log(description);
                            console.log(newProduct);
                            console.log(type);
                        }
                    })
                })
        }
        getProducts();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleEditProduct = async (e) => {
        e.preventDefault();
        if (!name) {
            setErr("Tên xe không được để trống!");
            nameRef.current.focus();
            return
        }
        if (!price) {
            setErr("Giá xe không được để trống!");
            priceRef.current.focus();
            return
        }
        if (!src) {
            setErr("Link ảnh không được để trống!");
            srcRef.current.focus();
            return
        }
        try {

            const token = userCookie.accessToken
            const body = { name, price, description, src, type, newProduct }
            console.log(body);
            const response = await axios.put(EDITPRODUCT_URL + `${productId}`, body
                ,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                    },
                    withCredentials: true
                }
            )
            console.log(JSON.stringify(response?.data));
            console.log(response?.data);
            console.log(JSON.stringify(response))
            swtoast.success({
                text: "Cập nhật thông tin xe thành công!!",
            });
            window.location.assign(feAPI + '/admin/tat-ca-xe')
        } catch (err) {
            if (!err?.response) {
                setErr("No server response")
            } else if (err.response.status === 400) {
                setErr("Tên xe, giá, link ảnh, mô tả không được để trống!")
            } else if (err.response.status === 401) {
                setErr('Unauthorized')
            } else if (err.response.status === 422) {
                setErr("Xe đã tồn tại!")
                swtoast.error({
                    text: "Xe này đã tồn tại!!",
                });
                nameRef.current.focus();
            } else {
                setErr("Cập nhật thông tin xe thất bại!");
            }
            console.log(err);
        }
        console.log(err);
    }
    return (
        <div className="admin-page">
            <Head>
                <title>Cập nhật thông tin xe</title>
            </Head>
            <div className='addProduct editProduct'>
                <Heading title='Cập nhật thông tin xe' />
                <div className="add-infor-product">
                    <form id='add-product-form' action="" onSubmit={handleEditProduct}>
                        <label htmlFor="name">Tên xe:</label>
                        <input
                            id="name"
                            placeholder="Nhập tên xe"
                            type="text"
                            className="w-100"
                            ref={nameRef}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="line-2 d-flex w-100 flex-row flex-wrap justify-content-around">
                            <div>
                                <label className="d-block" htmlFor="price">Giá:</label>
                                <input
                                    id="price"
                                    type="text"
                                    className=''
                                    placeholder="Ví dụ: 1.200.000.000, 560.000.000"
                                    ref={priceRef}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="d-block" htmlFor="src">Link ảnh:</label>
                                <input
                                    id="src"
                                    type="text"
                                    placeholder="Dán link ảnh"
                                    ref={srcRef}
                                    value={src}
                                    onChange={(e) => setSrc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="line-3 d-flex w-100 flex-row flex-wrap justify-content-left" onClick={() => {
                            setErr('Hiện tại chưa thể thay đổi thông tin này!')
                        }}>
                            <div className="d-flex align-items-center">
                                <label htmlFor="type">Loại xe:</label>
                                <select disabled name="" id="type" onChange={(e) => setType(e.target.value)} >
                                    <option value={type}>{type}</option>
                                    <option value={type == 'Xe du lịch' ? 'Xe tải' : 'Xe du lịch'}>{type == 'Xe du lịch' ? 'Xe tải' : 'Xe du lịch'}</option>
                                </select>
                            </div>
                            {/* Hiện tại thay đổi được từ true -> false, không thay đổi được ngược lại */}
                            <div className="d-flex align-items-center">
                                <label htmlFor="newProduct">Xe mới:</label>
                                <input disabled value={newProduct} onChange={(e) => setNewProduct(!newProduct)} id="newProduct" type="checkbox" defaultChecked={newProduct} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="d-block w-100">Mô tả:</label>
                            <CKeditor
                                init="Hello"
                                Placeholder={{ placeholder: "Mô tả thông tin xe ..." }}
                                name="description"
                                id="description"
                                form="add-product-form"
                                data={description}
                                onChange={(data) => {
                                    setDescription(data);
                                }}
                                editorLoaded={editorLoaded}
                            />
                        </div>
                        <p className="text-danger">{err}</p>
                        <div className="submit-wrapper w-100 text-center"><button onClick={(e) => handleEditProduct(e)} type="submit" className="submit-btn">Lưu</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct