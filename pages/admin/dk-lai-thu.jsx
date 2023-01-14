import React, { useState, useEffect } from 'react'
import HeaderAdmin from '../../components/HeaderAdmin'
import { homeAPI } from "../../config"
import axios from 'axios'
import { FaTrash } from 'react-icons/fa'
import Cookie, { useCookies } from 'react-cookie'
import { swtoast, swalert } from "../../mixins/swal.mixin";
import { FaRegCopy } from 'react-icons/fa'
import Heading from '../../components/Heading'
import Head from 'next/head'

const testDrive = () => {
    const [request, setRequest] = useState([])
    const [cookies, setCookie] = useCookies(['user']);
    var userCookie
    const [roles, setRoles] = useState(0)

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
            $('.test-drive').hide()
        }

        const getAllRequests = async () => {
            fetch(`${homeAPI}/test-drive/find-all`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                }
            })
                .then((res) => res.json())
                .then((reqs) => {
                    setRequest(reqs);
                })
        }
        getAllRequests();
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    console.log(request);

    const deleteRequest = async (id) => {
        const body = {
            id: id,
        }
        swalert
            .fire({
                title: "Xác nhận xóa yêu cầu báo giá",
                icon: "warning",
                text: "Bạn chắc chắn xóa yêu cầu?",
                showCloseButton: true,
                showCancelButton: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const response = await axios.post(`${homeAPI}/test-drive`, body);
                        const requestList = request.filter(item => item.id !== id)
                        setRequest(requestList);
                    } catch (err) {
                        if (err.response.status === 400) {
                            console.log("Request id is required!")
                        }
                        console.log(`Error: ${err.message}`);
                        swtoast.error({
                            text: "Đã xảy ra lỗi khi xóa yêu cầu lái thử. Vui lòng reload lại trang!",
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

    return (
        <div className='test-drive'>
            <Head>
                <title>Khách hàng đăng ký lái thử</title>
            </Head>
            <HeaderAdmin />
            <Heading title="KH Đăng ký lái thử" />
            <table className='table customer-table w-100'>
                <thead className="w-100 text-center">
                    <tr className="fs-6 w-100 align-items-center d-flex justify-content-around">
                        <th className="">Họ và tên</th>
                        <th className="">Số điện thoại</th>
                        <th className="date-register">Dòng xe</th>
                        <th className="payment">Thời gian</th>
                        <th className="consulted-box">Xóa</th>
                    </tr>
                </thead>
                <tbody className="w-100 text-center">
                    {
                        request.map((item, index) => {
                            if (item.roles !== 1) {
                                return (
                                    <tr title={converTime(item.created)} key={index} className="w-100 consult-tr d-flex align-items-center justify-content-around">
                                        <td className="">{item.fullName}</td>
                                        <td className="">
                                            {item.phoneNumber}<FaRegCopy className="copy-icon" onClick={() => copy(item.phoneNumber)} />
                                        </td>
                                        <td className="text-center date-register">
                                            {item.modelInterest ? item.modelInterest :'None'}
                                        </td>
                                        <td className="payment">
                                            {converTime(item.created)}
                                        </td>
                                        <td className='consulted-box consulted-group'>
                                            <FaTrash onClick={() => deleteRequest(item.id)} />
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
                        <th className="">{request.length}</th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default testDrive