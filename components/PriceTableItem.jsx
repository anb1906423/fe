import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import { swalert, swtoast } from "../mixins/swal.mixin";
import { useCookies } from 'react-cookie'
import { homeAPI } from "../config"

const PriceTableItem = (props) => {
  const [priceTable, setPriceTable] = useState([])
  const version = props.version
  const price = props.price

  const [cookies, setCookies] = useCookies(['user'])
  const [roles, setRoles] = useState('')
  useEffect(() => {
    if (cookies.user != undefined) {
      const userCookie = cookies.user
      setRoles(userCookie.roles)
    }
  }, [])

  const versionItem = version.map((item, index) => {
    if (item != '') {
      return (
        <div className="fw-bold" key={index}>{item}</div>
      )
    }
  })
  const priceItem = price.map((item, index) => {
    if (item != '') {
      return (
        <div className="fw-bold" key={index}>{item}</div>
      )
    }
  })
  const handleDeletePriceTable = async (id) => {
    const body = {
      id: id,
      isDeleteAll: false
    }
    swalert
      .fire({
        title: "Xác nhận xóa bảng giá",
        icon: "warning",
        text: "Chắc chắn muốn xóa bảng giá?",
        showCloseButton: true,
        showCancelButton: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(`${homeAPI}/admin/delete-price-table`, body);
            const priceTableList = priceTable.filter(priceTable => priceTable.id !== id)
            setPriceTable(priceTableList);
            swtoast.success({
              text: "Bảng giá đã được xóa!!",
            });
          } catch (err) {
            if (err.response.status === 400) {
              console.log("PriceTable id is required!")
            }
            console.log(`Error: ${err.message}`);
            swtoast.error({
              text: "Đã xảy ra lỗi khi xóa bảng giá. Vui lòng reload lại trang!",
            });
          }
        }
      })
  }
  return (
    <div className="price-table-item text-center position-relative">
      <div className="img-wrapper">
        <img src={props.srcCar} alt="" />
      </div>
      <div className="infor-price-table-group">
        <h4 className="name-car text-uppercase">{props.nameCar}</h4>
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td className="fw-bold bg-light"><div>Phiên bản</div></td>
                <td className="fw-bold bg-light"><div>Giá&nbsp;(VNĐ)</div></td>
              </tr>
              <tr>
                <td>
                  {versionItem}
                </td>
                <td>
                  {priceItem}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {
        roles == 1 ?
          <div onClick={() => handleDeletePriceTable(props.id)} className="icon-delete-wrapper position-absolute">
            <FaTimes />
          </div> : ''
      }
    </div>
  )
}

export default PriceTableItem