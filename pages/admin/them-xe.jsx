import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'
import Heading from '../../components/Heading'
import Head from 'next/head'
import { swtoast } from "../../mixins/swal.mixin";
import Cookie, { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import $ from 'jquery'
import CKeditor from '../../components/CKeditor'
const ADDPRODUCT_URL = `${homeAPI}/admin/add-product`
import { homeAPI } from "../../config"

const typeProducts = ['Xe du lịch', 'Xe thương mại']

const adminPage = () => {
  const nameRef = useRef();
  const priceRef = useRef();
  const srcRef = useRef();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [src, setSrc] = useState([]);
 
  const [srcs, setSrcs] = useState([]);

  const [imgOtherColor, setImgOtherColor] = useState([])
  var [type, setType] = useState('');
  const [newProduct, setNewProduct] = useState(true);
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [err, setErr] = useState('')

  // const [isLoading, setIsLoading] = useState(true)
  const [cookies, setCookie] = useCookies(['user']);
  const userCookie = cookies.user
  const [roles, setRoles] = useState(0)
  const router = useRouter()
  const [token, setToken] = useState('')

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  useEffect(() => {
    console.log(src);
  }, [src])

  const handleAddImg = () => {
    setSrcs((prev) => {
      const addImg = [...prev, job];
      updateSrcs(addImg);
      return addImg;
    });

    setJob("");
  };

  const handleDeleteImg = (index) => {
    setJobs((prev) => {
      const newJobs = jobs.filter((job, i) => i !== index);
      updateSrcs(newJobs);
      return newJobs;
    });
  };

  const updateSrcs = (imgList) => {
    JSON.stringify(localStorage.setItem("src", JSON.stringify(src)));
    return imgList;
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    if (userCookie.roles != 1) {
      $('.admin-page').hide()
    }
    console.log(roles);
    setToken(userCookie.accessToken)
    setRoles(userCookie.roles)

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, [])

  const handleSubmit = async (e) => {
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
      const typeCheck = type != '' ? type : typeProducts[0]
      type = typeCheck

      const token = userCookie.accessToken
      const body = { name, price, description, src, type, newProduct }
      console.log(body);
      const response = await axios.post(ADDPRODUCT_URL, body
        ,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
          withCredentials: true
        }
      )
      setName('')
      setPrice('')
      setDescription('')
      setSrc('')
      setErr('')
      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      console.log(JSON.stringify(response))
      swtoast.success({
        text: "Xe được thêm thành công!!",
      });
      window.location.assign('/admin/tat-ca-xe')
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
        setErr("Thêm xe thất bại!");
      }
      console.log(err);
    }
    console.log(err);
  }

  return (
    <div className="admin-page">
      <Head>
        <title>Thêm xe</title>
      </Head>
      <div className='addProduct'>
        <Heading title='Thêm xe' />
        <div className="add-infor-product">
          <form id='add-product-form' action="" onSubmit={handleSubmit}>
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
                  // value={src}
                  onChange={(e) => {
                    setSrc(src => [e.target.value])
                    // src.push(e.target.value)
                  }}
                />
              </div>
            </div>
            {/* <label className="d-block" htmlFor="src">Thêm ảnh:</label>
            <input
              type="text"
              value={imgOtherColor}
              onChange={(e) => {
                src.push(e.target.value)
                console.log(imgOtherColor);
                setImgOtherColor(imgOtherColor => [...imgOtherColor, e.target.value])
              }}
            /> */}
            <div className="line-3 d-flex w-100 flex-row flex-wrap justify-content-left">
              <div className="d-flex align-items-center">
                <label htmlFor="type">Loại xe:</label>
                <select name="" id="type" onChange={(e) => setType(e.target.value)} >
                  {
                    typeProducts.map((item, index) =>
                      <option defaultValue={item} value={item} key={index} name={item}>{item}</option>
                    )
                  }
                </select>
              </div>
              <div className="d-flex align-items-center">
                <label onClick={() => setNewProduct(!newProduct)} htmlFor="newProduct">Xe mới:</label>
                <input value={newProduct} onChange={(e) => setNewProduct(!newProduct)} id="newProduct" type="checkbox" defaultChecked={newProduct} />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="d-block w-100">Mô tả:</label>
              <CKeditor
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
            <div className="submit-wrapper w-100 text-center"><button onClick={(e) => handleSubmit(e)} type="submit" className="submit-btn">THÊM XE</button></div>
          </form>
        </div>
      </div>
      {/* <input value={src} onChange={(e) => setSrc(e.target.value)} />
      <button onClick={handleAddImg}>submit</button> */}

      {/* {srcs.map((src, index) => (
        <ul key={index}>
          <li>
            <img src={src} />
            <button
              style={{ marginLeft: 20 }}
              onClick={() => handleDeleteImg(index)}
            >
              x
            </button>
          </li>
        </ul>
      ))} */}
    </div>
  )
}

export default adminPage
