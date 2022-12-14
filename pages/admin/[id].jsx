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
            setErr("T??n xe kh??ng ???????c ????? tr???ng!");
            nameRef.current.focus();
            return
        }
        if (!price) {
            setErr("Gi?? xe kh??ng ???????c ????? tr???ng!");
            priceRef.current.focus();
            return
        }
        if (!src) {
            setErr("Link ???nh kh??ng ???????c ????? tr???ng!");
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
                text: "C???p nh???t th??ng tin xe th??nh c??ng!!",
            });
            window.location.assign(feAPI + '/admin/tat-ca-xe')
        } catch (err) {
            if (!err?.response) {
                setErr("No server response")
            } else if (err.response.status === 400) {
                setErr("T??n xe, gi??, link ???nh, m?? t??? kh??ng ???????c ????? tr???ng!")
            } else if (err.response.status === 401) {
                setErr('Unauthorized')
            } else if (err.response.status === 422) {
                setErr("Xe ???? t???n t???i!")
                swtoast.error({
                    text: "Xe n??y ???? t???n t???i!!",
                });
                nameRef.current.focus();
            } else {
                setErr("C???p nh???t th??ng tin xe th???t b???i!");
            }
            console.log(err);
        }
        console.log(err);
    }
    return (
        <div className="admin-page">
            <Head>
                <title>C???p nh???t th??ng tin xe</title>
            </Head>
            <div className='addProduct editProduct'>
                <Heading title='C???p nh???t th??ng tin xe' />
                <div className="add-infor-product">
                    <form id='add-product-form' action="" onSubmit={handleEditProduct}>
                        <label htmlFor="name">T??n xe:</label>
                        <input
                            id="name"
                            placeholder="Nh???p t??n xe"
                            type="text"
                            className="w-100"
                            ref={nameRef}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className="line-2 d-flex w-100 flex-row flex-wrap justify-content-around">
                            <div>
                                <label className="d-block" htmlFor="price">Gi??:</label>
                                <input
                                    id="price"
                                    type="text"
                                    className=''
                                    placeholder="V?? d???: 1.200.000.000, 560.000.000"
                                    ref={priceRef}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="d-block" htmlFor="src">Link ???nh:</label>
                                <input
                                    id="src"
                                    type="text"
                                    placeholder="D??n link ???nh"
                                    ref={srcRef}
                                    value={src}
                                    onChange={(e) => setSrc(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="line-3 d-flex w-100 flex-row flex-wrap justify-content-left" onClick={() => {
                            setErr('Hi???n t???i ch??a th??? thay ?????i th??ng tin n??y!')
                        }}>
                            <div className="d-flex align-items-center">
                                <label htmlFor="type">Lo???i xe:</label>
                                <select disabled name="" id="type" onChange={(e) => setType(e.target.value)} >
                                    <option value={type}>{type}</option>
                                    <option value={type == 'Xe du l???ch' ? 'Xe t???i' : 'Xe du l???ch'}>{type == 'Xe du l???ch' ? 'Xe t???i' : 'Xe du l???ch'}</option>
                                </select>
                            </div>
                            {/* Hi???n t???i thay ?????i ???????c t??? true -> false, kh??ng thay ?????i ???????c ng?????c l???i */}
                            <div className="d-flex align-items-center">
                                <label htmlFor="newProduct">Xe m???i:</label>
                                <input disabled value={newProduct} onChange={(e) => setNewProduct(!newProduct)} id="newProduct" type="checkbox" defaultChecked={newProduct} />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="description" className="d-block w-100">M?? t???:</label>
                            <CKeditor
                                init="Hello"
                                Placeholder={{ placeholder: "M?? t??? th??ng tin xe ..." }}
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
                        <div className="submit-wrapper w-100 text-center"><button onClick={(e) => handleEditProduct(e)} type="submit" className="submit-btn">L??u</button></div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProduct