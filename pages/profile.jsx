import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Heading from '../components/Heading'
import { useCookies } from 'react-cookie'
import { swalert } from "../mixins/swal.mixin";
import {homeAPI} from "../config"

const profile = () => {
  const [users, setUsers] = useState([])
  const [cookies, setCookie] = useCookies(['user']);
  var userCookie

  const [userFullName, setUserFullName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCreated, setUserCreated] = useState('')
  useEffect(() => {
    if (cookies.user != '') {
      userCookie = cookies.user
    }
  })

  const logOutHandler = () => {
    swalert
      .fire({
        title: "Đăng xuất",
        icon: "warning",
        text: "Bạn muốn đăng xuất?",
        showCloseButton: true,
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setCookie('user', '')
          window.location.assign('/')
        }
      })
  }

  useEffect(() => {
    fetch(`${homeAPI}`)
      .then((res) => res.json())
      .then((users) => {
        setUsers(users)
      })
    if (cookies.user != '') {
      setUserEmail(userCookie.email)
    }
  }, [])
  useEffect(() => {
    for (const user of users) {
      if (user.email === userEmail) {
        setUserFullName(user.fullName)
        setUserCreated(user.created)
        console.log(userFullName);
        console.log(userEmail);
      }
    }
  })

  function converTime(text) {
    const time = new Date(text)
    const createAt = time.toLocaleDateString()
    return createAt
  }

  return (
    <div className='account-page profile-container'>
      <Head>
        <title>Đại lý ủy quyền chính thức của Ford tại Cần Thơ</title>
        <meta name='revisit-after' content='1 days' />
        <meta http-equiv="content-language" content="vi" />
        <meta name='city' content='Cần Thơ' />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>
      <Heading title="Profile" />
      <table className="profile table text-left">
        <tbody>
          <tr className="full-name-box">
            <td>Họ và tên:</td>
            <td className="fw-bold">{userFullName}</td>
          </tr>
          <tr className="email-box">
            <td>Địa chỉ email:</td>
            <td className="fw-bold">{userEmail}</td>
          </tr>
          <tr className="created-box">
            <td>Ngày đăng ký:</td>
            <td className="fw-bold">{converTime(userCreated)}</td>
          </tr>
        </tbody>
      </table>
      <button onClick={logOutHandler} className="btn submit-btn text-white" type="submit">Đăng xuất</button>

    </div>
  )
}

export default profile