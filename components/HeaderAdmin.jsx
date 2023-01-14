import React from 'react'
import Link from 'next/link'

const HeaderAdmin = () => {
  const headerAdmins = [
    {
      name: 'Tất cả xe',
      href: '/admin/tat-ca-xe',
    },
    {
      name: 'Báo giá',
      href: '/admin/bao-gia',
    },
    {
      name: 'Quản lý bảng giá',
      href: '/admin/ql-bang-gia',
    },
    {
      name: 'ĐK lái thử',
      href: '/admin/dk-lai-thu',
    },
  ]
  return (
    <div className='header-admin text-center'>
      {
        headerAdmins.map((item, index) => {
          return (
            <div key={index} className="header-admin-item">
              <Link className={item.href} href={item.href}>
                {item.name}
              </Link>
            </div>
          )
        })
      }
    </div>
  )
}

export default HeaderAdmin