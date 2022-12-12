import React, { useRef, useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Head from 'next/head'
import Link from 'next/link'
import axios from './api/axios'
import {homeAPI} from "../config"

import { swtoast } from "../mixins/swal.mixin";

const PHONENUMBER_REGEX = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PWD_REGEX = /^[a-zA-Z0-9]+$/
const REGISTER_URL = `${homeAPI}/register`

const register = () => {
  const fullNameRef = useRef();
  const phoneNumberRef = useRef();
  const emailRef = useRef();
  const pwdRef = useRef();

  const [fullName, setFullname] = useState('')
  const [fullnameFocus, setFullnameFocus] = useState(false)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [validPhoneNumber, setValidPhoneNumber] = useState(false)
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

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

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  }, [pwd]);

  useEffect(() => {
    setErr('')
  }, [fullName, email, phoneNumber, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PHONENUMBER_REGEX.test(phoneNumber);
    const v3 = PWD_REGEX.test(pwd);
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
    if (!v3) {
      pwdRef.current.focus();
      setErr('Mật khẩu không hợp lệ!');
      return
    }

    if (pwd.length < 8) {
      pwdRef.current.focus();
      setErr('Mật khẩu phải ít nhất 8 ký tự!');
      return
    }
    try {
      var response = await axios.post(REGISTER_URL,
        JSON.stringify({ fullName, phoneNumber, email, pwd }),
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
      setSuccess("Đăng ký nhận báo giá thành công, chúng tôi sẽ liên hệ sớm nhất có thể!")
    } catch (err) {
      if (!err?.response) {
        setErr('No Server Response!')
      } else if (err.response.status === 400) {
        setErr('Missing Fullname, Phonenumber or Password!')
      } else if (err.response.status === 401) {
        setErr('Unauthorized')
      } else if (err.response.status === 422) {
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
        <meta name="title" content="Báo giá xe Suzuki thành phố Cần Thơ hôm nay" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='city' content='Cần Thơ'/>
        <meta name='keywords' content='giá xe suzuki, giá XL7, giá Ciaz, bảng giá xe suzuki, suzuki cần thơ giá rẻ'/>
        <meta name="description" content="Đăng ký để nhận báo giá xe Suzuki Cần Thơ hôm nay nhanh, chính xác và ưu đãi nhất."/>
      </Head>
      <Heading title="Đăng ký" />
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
            <label htmlFor="pwd" className="d-block">Mật khẩu:</label>
            <input
              className="w-100"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="Mật khẩu"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              ref={pwdRef}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              required
            />
            <p className="text-danger">{err}</p>
            <p className="text-success">{success}</p>
            <button className="btn submit-btn log-up-btn w-100 text-white" type="submit">Đăng ký nhận báo giá</button>
            <p className="have-account text-center">Bạn là admin?</p>
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