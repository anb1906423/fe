// import React, { useState, useEffect, useRef } from 'react'
// import { FaTimes } from 'react-icons/fa'
// const Modal = (props) => {
//     return (
//         <div onClick={(e) => e.stopPropagation()} className="window">
//             <div className="header-window position-relative">
//                 <div className="box-icon-window position-absolute">
//                     <FaTimes />
//                 </div>
//                 <h2 className='text-uppercase'>Đăng ký lái thử</h2>
//             </div>
//             <div className="container-window">
//                 <form action="" onSubmit={props.handleSubmit}>
//                     <div>
//                         <input
//                             name='name'
//                             className='w-100'
//                             placeholder="Họ và tên"
//                             type="text"
//                             ref={props.fullNameRef}
//                             value={props.fullName}
//                             onChange={(e) => {
//                                 props.setFullnameRequired('')
//                                 props.setFullname(e.target.value)
//                             }
//                             }
//                         />
//                         <span className='text-danger'>{props.fullNameRequired}</span>
//                     </div>
//                     <div>
//                         <input
//                             name='phone-number'
//                             className='w-100'
//                             placeholder="Số điện thoại"
//                             type="text"
//                             ref={props.phoneNumberRef}
//                             value={props.phoneNumber}
//                             onChange={(e) => {
//                                 props.setPhoneNumberRequired('')
//                                 props.setPhoneNumber(e.target.value)
//                             }}
//                         />
//                         <span className='text-danger'>{props.phoneNumberRequired}</span>
//                     </div>
//                     <div>
//                         <input
//                             className='w-100'
//                             placeholder='Dòng xe'
//                             type="text"
//                             ref={props.modelRef}
//                             value={props.model}
//                             onChange={(e) => props.setModel(e.target.value)}
//                         />
//                         <span className=''>Ví dụ: Ranger, Territory, Raptor, Everest, Explorer...</span>
//                     </div>
//                     <button type='submit' className='w-100'>Đăng ký</button>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Modal