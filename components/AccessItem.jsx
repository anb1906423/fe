import React from 'react'

const accessItem = (props) => {
    return (
        <a href={props.href} className="access-item d-block w-100 text-center">
            <div className="box-icon">{props.icon}</div>
            <div className="box-content"><h5>{props.content}</h5></div>
        </a>
    )
}

export default accessItem