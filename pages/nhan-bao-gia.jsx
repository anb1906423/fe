import React, { useRef, useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'
import Link from 'next/link'
import axios from './api/axios'
import { homeAPI } from "../config"

import { swtoast } from "../mixins/swal.mixin";

const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PWD_REGEX = /^[a-zA-Z0-9]+$/
const REGISTER_URL = `${homeAPI}/register`

const register = () => {
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const paymentRef = useRef();
  const emailRef = useRef();
  const modelRef = useRef();
  const pwdRef = useRef();

  const [fullName, setFullname] = useState('')
  const [fullnameFocus, setFullnameFocus] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [validPhoneNumber, setValidPhoneNumber] = useState(false)
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false)

  const [isCash, setIsCash] = useState(true)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [model, setModel] = useState('')

  const [err, setErr] = useState()
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fullNameRef.current.focus()
  }, [])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber));
  }, [phoneNumber]);

  // useEffect(() => {
  //   setValidPwd(PWD_REGEX.test(pwd));
  // }, [pwd]);

  useEffect(() => {
    setErr('')
  }, [fullName, email, phoneNumber, isCash, pwd, model])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PHONENUMBER_REGEX.test(phoneNumber);
    // const v3 = PWD_REGEX.test(pwd);
    if (!v1) {
      emailRef.current.focus();
      setErr('Địa chỉ email không hợp lệ!');
      return
    }
    if (!v2) {
      phoneNumberRef.current.focus();
      setErr('Số điện thoại không hợp lệ hoặc đã được sử dụng!');
      return
    }
    // if (!v3) {
    //   pwdRef.current.focus();
    //   setErr('Mật khẩu không hợp lệ!');
    //   return
    // }

    // if (pwd.length < 8) {
    //   pwdRef.current.focus();
    //   setErr('Mật khẩu phải ít nhất 8 ký tự!');
    //   return
    // }
    try {
      var response = await axios.post(REGISTER_URL,
        JSON.stringify({ fullName, phoneNumber, isCash, email, pwd, model }),
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        },
      )
      swtoast.success({
        text: "Đăng ký nhận báo giá thành công.",
      });

      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      console.log(JSON.stringify(response))

      setFullname('')
      setPhoneNumber('')
      setEmail('')
      setPwd('')
      setModel('')
      setSuccess("Chúng tôi đã nhận được yêu cầu báo giá của quý khách!")
    } catch (err) {
      if (!err?.response) {
        setErr('No Server Response!')
      } else if (err.response?.status === 400) {
        setErr('Vui lòng nhập đủ họ tên và số điện thoại!')
      } else if (err.response?.status === 401) {
        setErr('Unauthorized')
      } else if (err.response?.status === 422) {
        setErr("Số điện thoại hoặc địa chỉ email đã được sử dụng!");
      } else {
        setErr('Register fail!')
      }
      setSuccess(false)
      console.log(err);
    }
  }

  return (
    <div className="account-page register">
      <Head>
        <title>Nhận báo giá</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Giá ô tô ford thành phố Cần Thơ hôm nay" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='city' content='Cần Thơ' />
        <meta name='keywords' content='giá xe ford, giá ô tô ford cần thơ, giá territory, ô tô ford, ford cần thơ' />
        <meta name="description" content="Nhận báo giá ô tô Ford chi nhánh Cần Thơ nhanh, chính xác và ưu đãi nhất." />
      </Head>
      <Heading title="Đăng ký nhận báo giá" />
      <div className="register-wrapper">
        <div className="main-form">
          <form action="" onSubmit={handleSubmit} className="form-log-up">
            <label htmlFor="fullname" className="d-block">Họ và tên:</label>
            <input
              className="w-100"
              name="fullname"
              type="text"
              id="fullname"
              placeholder="Họ và tên"
              onChange={(e) => setFullname(e.target.value)}
              onFocus={() => setFullnameFocus(true)}
              onBlur={() => setFullnameFocus(false)}
              value={fullName}
              ref={fullNameRef}
              required
            />
            <label htmlFor="phonenumber" className="d-block">Số điện thoại:</label>
            <input
              className="w-100"
              name="phonenumber"
              type="text"
              id="phonenumber"
              placeholder="Số điện thoại"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              ref={phoneNumberRef}
              onFocus={() => setPhoneNumberFocus(true)}
              onBlur={() => setPhoneNumberFocus(false)}
              required
            />
            <label htmlFor="email" className="d-block">Email:</label>
            <input
              className="w-100"
              name="email"
              type="text"
              id="email"
              placeholder="Địa chỉ email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <label htmlFor="model-car" className="d-block">Dòng xe:</label>
            <input
              className="w-100"
              type="text"
              name="model-car"
              id="model-car"
              placeholder="Dòng xe"
              onChange={(e) => setModel(e.target.value)}
              value={model}
              ref={modelRef}
              required
            />
            <label htmlFor="payment" className="d-block">Hình thức thanh toán bạn quan tâm:</label>
            <div className="form-check-payment d-flex align-items-center justify-content-around">
              <div className='cash'>
                <input
                  value='cash'
                  id='cash'
                  name="payment"
                  type="radio"
                  onClick={() => setIsCash(true)}
                  defaultChecked={isCash}
                />
                <label name="" htmlFor="cash">Tiền mặt</label>
              </div>
              <div className='installment'>
                <input
                  value='installment'
                  id='installment'
                  name="payment"
                  type="radio"
                  onClick={() => setIsCash(false)}
                  // checked={!isCash}
                />
                <label type="" htmlFor="installment">Trả góp</label>
              </div>
            </div>
            <label htmlFor="pwd" className="d-none">Mật khẩu:</label>
            <input
              className="w-100 d-none"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="Mật khẩu"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              ref={pwdRef}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            // required
            />
            <p className="text-danger">{err}</p>
            <p className="text-success">{success}</p>
            <button className="btn submit-btn log-up-btn w-100 text-white" type="submit">Đăng ký</button>
            <p className="have-account text-center">Bạn là quản trị viên?</p>
            <Link href="/dang-nhap">
              <button className="btn sub-btn w-100">Đăng nhập</button>
            </Link>
          </form>
        </div>
      </div>
    </div >
  )
}

export default register