import React, { useState, useEffect } from 'react'
import ContactIconFixed from '../components/ContactIconFixed'
import {
  FaMapMarkerAlt, FaPhoneSquareAlt, FaMailBulk, FaFirefox, FaAngleRight,
  FaFacebookSquare, FaTiktok, FaYoutube, FaInstagramSquare, FaCopyright
} from 'react-icons/fa'
import $ from 'jquery'
const footerItems = [
  {
    heading: 'Đại lý ủy quyền của Ford tại Cần Thơ',
    children: [
      {
        icon: <FaMapMarkerAlt />,
        content: 'Lô 11C, Võ Nguyên Giáp, Quận Cái Răng, TP.Cần Thơ',
      },
      {
        icon: <FaPhoneSquareAlt />,
        content: '0918.941.966 Mr.Văn Tâm',
      },
      {
        icon: <FaMailBulk />,
        content: 'trantam.tmtn90@gmail.com',
      },
      {
        icon: <FaCopyright />,
        content: '2022 fordscantho.com',
      },
    ]
  },
  {
    heading: 'Liên kết mạng xã hội',
    children: [
      {
        icon: <a href="https://www.facebook.com/profile.php?id=100047842143889"><FaFacebookSquare className="icon-social-network" /></a>,
      },
      {
        icon: <a href="#"><FaTiktok className="icon-social-network" /></a>,
      },
      {
        icon: <a href="#"><FaYoutube className="icon-social-network" /></a>,
      },
      {
        icon: <a href="#"><FaInstagramSquare className="icon-social-network" /></a>
      }
    ]
  }
]
const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-list d-flex flex-wrap justify-content-around'>
        {
          footerItems.map((item, index) => {
            return (
              <div className='footer-item' key={index}>
                <div className="footer-item-content">
                  <h5 className="footer-heading">{item.heading}</h5>
                  {
                    item.children.map((childrenItem, i) => {
                      return (
                        <div className='children-item' key={i}>
                          <div className="footer-icon">
                            {childrenItem.icon}
                          </div>
                          <div className='content'>
                            {
                              childrenItem.content
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="contact-icon-group">
        <label className="contact-icon-fixed icon-messenger">
          <a target='_blank' href="https://m.me/100047842143889"><img src="https://cdn.iconscout.com/icon/free/png-256/messenger-14-498409.png" alt="" /></a>
        </label>
        <label className="contact-icon-fixed icon-zalo">
          <a target='_blank' href="https://zalo.me/0918941966"><img src="https://cdn.haitrieu.com/wp-content/uploads/2022/01/Logo-Zalo-Arc.png" alt="" /></a>
        </label>
        <div>
          <label className="contact-icon-fixed icon-call-phone">
            <a href="tel:0918941966"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Phone_icon.png?20210306055547" alt="" /></a>
          </label>
        </div>
      </div>
    </div>
  )
}

export default Footer