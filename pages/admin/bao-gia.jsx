import React, { useState, useEffect } from 'react'
import HeaderAdmin from '../../components/HeaderAdmin'
import Heading from '../../components/Heading'
import { FaRegCopy } from 'react-icons/fa'
import { swtoast, swalert } from "../../mixins/swal.mixin";
import Head from 'next/head'
import axios from 'axios'
import Cookie, { useCookies } from 'react-cookie'
import { FaTrash } from 'react-icons/fa'
import $ from 'jquery'
import { homeAPI } from "../../config"

const inforCustomer = () => {
    const [users, setUsers] = useState([])
    const [cookies, setCookie] = useCookies(['user']);
    var userCookie
    const [roles, setRoles] = useState(0)
    const [isConsulted, setIsConsulted] = useState(false)
    var isConsultedLenght = 0

    useEffect(() => {
        if (cookies.user != '') {
            userCookie = cookies.user
            setRoles(userCookie.roles)
        }
    })

    useEffect(() => {
        let isMounted = true;
        const token = userCookie.accessToken
        setRoles(userCookie.roles)
        const controller = new AbortController();
        if (userCookie.roles != 1) {
            $('.infor-customer').hide()
        }

        const getAllUsers = async () => {
            fetch(`${homeAPI}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((res) => res.json())
                .then((users) => {
                    setUsers(users);
                })
        }
        getAllUsers();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const deleteUser = async (id) => {
        const body = {
            id: id,
            isDeleteAll: false
        }
        swalert
            .fire({
                title: "Xác nhận đã tư vấn",
                icon: "warning",
                text: "Bạn chắc chắn đã tư vấn?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(`${homeAPI}/delete-user`, body);
                        const userList = users.filter(user => user.id !== id)
                        setUsers(userList);
                    } catch (err) {
                        if (err.response.status === 400) {
                            console.log("User id is required!")
                        }
                        console.log(`Error: ${err.message}`);
                        swtoast.error({
                            text: "Đã xảy ra lỗi khi xóa yêu cầu báo giá. Vui lòng reload lại trang!",
                        });
                    }
                }
            })
    }

    function copy(text) {
        navigator.clipboard.writeText(text)
        swtoast.success({
            text: "Đã copy thành công!",
        });
    }
    function converTime(text) {
        const time = new Date(text)
        const createAt = time.toLocaleDateString()
        return createAt
    }
    function sliceEmail(email) {
        return email.slice(0, 10)
    }
    return (
        <div className="infor-customer w-100">
            <Head>
                <title>Khách hàng chưa báo giá</title>
            </Head>
            <HeaderAdmin />
            <Heading title='Khách hàng chờ báo giá' />
            <table className='table customer-table w-100'>
                <thead className="w-100 text-center">
                    <tr className="fs-6 w-100 align-items-center d-flex justify-content-around">
                        <th className="">Họ và tên</th>
                        <th className="">TT Liên hệ</th>
                        <th className="date-register">Dòng xe</th>
                        <th className="payment">Hình thức</th>
                        <th className="consulted-box">Đã báo giá</th>
                    </tr>
                </thead>
                <tbody className="w-100 text-center">
                    {
                        users.map((item, index) => {
                            if (item.roles !== 1) {
                                return (
                                    <tr title={converTime(item.created)} key={index} className="w-100 consult-tr d-flex align-items-center justify-content-around">
                                        <td className="">{item.fullName}</td>
                                        <td className="">
                                            {item.phoneNumber}<FaRegCopy className="copy-icon" onClick={() => copy(item.phoneNumber)} />
                                            {sliceEmail(item.email)}<FaRegCopy className="copy-icon" onClick={() => copy(item.email)} />
                                        </td>
                                        <td className="text-center date-register">{item.modelInterest}</td>
                                        <td className="payment">
                                            {
                                                item.isCash == true ? 'Tiền mặt' : 'Trả góp'
                                            }
                                        </td>
                                        <td className='consulted-box consulted-group'>
                                            <FaTrash onClick={() => deleteUser(item.id)} />
                                        </td>
                                    </tr>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
            <table className='table product-admin w-100'>
                <tbody className="w-100 text-center">
                    <tr className="fs-6 w-100">
                        <th className="">Tổng cộng:</th>
                        <th className="">{users.length - 2}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default inforCustomer