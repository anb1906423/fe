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
      setErr('?????a ch??? email kh??ng h???p l???!');
      return
    }
    if (!v2) {
      phoneNumberRef.current.focus();
      setErr('S??? ??i???n tho???i kh??ng h???p l??? ho???c ???? ???????c s??? d???ng!');
      return
    }
    // if (!v3) {
    //   pwdRef.current.focus();
    //   setErr('M???t kh???u kh??ng h???p l???!');
    //   return
    // }

    // if (pwd.length < 8) {
    //   pwdRef.current.focus();
    //   setErr('M???t kh???u ph???i ??t nh???t 8 k?? t???!');
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
        text: "????ng k?? nh???n b??o gi?? th??nh c??ng.",
      });

      console.log(JSON.stringify(response?.data));
      console.log(response?.data);
      console.log(JSON.stringify(response))

      setFullname('')
      setPhoneNumber('')
      setEmail('')
      setPwd('')
      setModel('')
      setSuccess("Ch??ng t??i ???? nh???n ???????c y??u c???u b??o gi?? c???a qu?? kh??ch!")
    } catch (err) {
      if (!err?.response) {
        setErr('No Server Response!')
      } else if (err.response?.status === 400) {
        setErr('Vui l??ng nh???p ????? h??? t??n v?? s??? ??i???n tho???i!')
      } else if (err.response?.status === 401) {
        setErr('Unauthorized')
      } else if (err.response?.status === 422) {
        setErr("S??? ??i???n tho???i ho???c ?????a ch??? email ???? ???????c s??? d???ng!");
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
        <title>?????i l?? ???y quy???n ch??nh th???c c???a Ford t???i C???n Th??</title>
        <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
        <meta name="title" content="Gi?? ?? t?? ford th??nh ph??? C???n Th?? h??m nay" />
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name='city' content='C???n Th??' />
        <meta name='keywords' content='ford ranger xls, gi?? xe ford, gi?? ?? t?? ford c???n th??, gi?? territory, ?? t?? ford, ford c???n th??' />
        <meta name="description" content="Nh???n b??o gi?? ?? t?? Ford chi nh??nh C???n Th?? nhanh, ch??nh x??c v?? ??u ????i nh???t." />
      </Head>
      <Heading title="????ng k?? nh???n b??o gi??" />
      <div className="register-wrapper">
        <div className="main-form">
          <form action="" onSubmit={handleSubmit} className="form-log-up">
            <label htmlFor="fullname" className="d-block">H??? v?? t??n:</label>
            <input
              className="w-100"
              name="fullname"
              type="text"
              id="fullname"
              placeholder="H??? v?? t??n"
              onChange={(e) => setFullname(e.target.value)}
              onFocus={() => setFullnameFocus(true)}
              onBlur={() => setFullnameFocus(false)}
              value={fullName}
              ref={fullNameRef}
              required
            />
            <label htmlFor="phonenumber" className="d-block">S??? ??i???n tho???i:</label>
            <input
              className="w-100"
              name="phonenumber"
              type="text"
              id="phonenumber"
              placeholder="S??? ??i???n tho???i"
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
              placeholder="?????a ch??? email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              ref={emailRef}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              required
            />
            <label htmlFor="model-car" className="d-block">D??ng xe:</label>
            <input
              className="w-100"
              type="text"
              name="model-car"
              id="model-car"
              placeholder="D??ng xe"
              onChange={(e) => setModel(e.target.value)}
              value={model}
              ref={modelRef}
              required
            />
            <label htmlFor="payment" className="d-block">H??nh th???c thanh to??n b???n quan t??m:</label>
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
                <label name="" htmlFor="cash">Ti???n m???t</label>
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
                <label type="" htmlFor="installment">Tr??? g??p</label>
              </div>
            </div>
            <label htmlFor="pwd" className=" d-none">M???t kh???u:</label>
            <input
              className="w-100 d-none"
              type="password"
              name="pwd"
              id="pwd"
              placeholder="M???t kh???u"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              ref={pwdRef}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            // required
            />
            <p className="text-danger">{err}</p>
            <p className="text-success">{success}</p>
            <button className="btn submit-btn log-up-btn w-100 text-white" type="submit">????ng k??</button>
            <p className="have-account text-center">B???n l?? qu???n tr??? vi??n?</p>
            <Link href="/dang-nhap">
              <button className="btn sub-btn w-100">????ng nh???p</button>
            </Link>
          </form>
        </div>
      </div>
    </div >
  )
}

export default register