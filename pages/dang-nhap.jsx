import React, { useRef, useState, useEffect } from 'react'
import Heading from '../components/Heading'
import Link from 'next/link'
import Head from 'next/head'
import axios from './api/axios'
import Cookie, { useCookies } from 'react-cookie'
import { homeAPI } from "../config"

import { swtoast } from "../mixins/swal.mixin";
// import useAuth from '../hooks/useAuth'
const LOGIN_URL = `${homeAPI}/login`

const login = () => {
    // const { setAuth } = useAuth();
    const [cookies, setCookie] = useCookies(['user']);
    const emailRef = useRef();
    const pwdRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    useEffect(() => {
        setErr('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );
            swtoast.success({
                text: "Đăng nhập tài khoản thành công!",
            });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles
            console.log(accessToken);
            // console.log(roles);
            setCookie('user', response.data)

            console.log(response.data);
            window.location.assign('/admin/tat-ca-xe')
            // setAuth({ email, pwd, roles, accessToken });
            setEmail('')
            setPwd('')
            setErr('')
            setSuccess(true)
        } catch (err) {
            console.log(err);
            if (!err?.response) {
                setErr("No server response!")
            } else if (err.response.status === 400) {
                setErr("Missing email or password!")
            } else if (err.response.status === 401) {
                setErr("Email or password is incorrect!")
            } else {
                setErr("Login falled")
            }
            setSuccess(false)
            emailRef.current.focus()
        }
    }

    return (
        <div className="account-page login">
            <Head>
                <title>Đại lý ủy quyền chính thức của Ford tại Cần Thơ</title>
                <meta property="og:image" content="https://www.ford.com.vn/content/ford/vn/vi_vn/site-wide-content/billboard-carousels/explorer-overview-carousel/jcr:content/par/billboard_1441502915/imageComponent/image.imgs.full.high.jpg" />
                <meta name="title" content="Đăng nhập" />
                <meta name="description" content="Trang đăng nhập dành cho admin Ford chi nhánh Cần Thơ - fordscantho.com" />
                <meta name='revisit-after' content='1 days' />
                <meta name='city' content='Cần Thơ' />
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <meta http-equiv="content-language" content="vi" />
            </Head>
            <Heading title="Đăng nhập" />
            <div className="login-wrapper">
                <div className="main-form">
                    <form onSubmit={handleSubmit} action="" className="form-log-in">
                        <label htmlFor="email" className="d-block">Email:</label>
                        <input
                            className="w-100"
                            type="text"
                            id="email"
                            placeholder="Địa chỉ email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            ref={emailRef}
                            required
                        />
                        <label htmlFor="pwd" className="d-block">Mật khẩu:</label>
                        <input
                            className="w-100"
                            type="password"
                            id="pwd"
                            placeholder="Mật khẩu"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            ref={pwdRef}
                            required
                        />
                        <p className="text-danger">{err}</p>
                        <button className="btn submit-btn log-up-btn w-100 text-white" type="submit">Đăng nhập</button>
                        <p className="have-account text-center">Chưa có tài khoản? Đăng ký.</p>
                        <Link href="/nhan-bao-gia">
                            <button className="btn sub-btn w-100">Đăng ký</button>
                        </Link>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default login