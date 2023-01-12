import React from 'react'

const CounterItem = (props) => {
    return (
        <div className="counter-item text-center position-relative">
            <div className="d-flex justify-content-center align-items-center counter-icon position-absolute">
                {props.icon}
            </div>
            <div className="counter-value text-center">
                <h2 className='fw-bold'>{props.value}</h2>
            </div>
            <div className="counter-text">
                <strong>{props.text}</strong>
            </div>
        </div>
    )
}

export default CounterItem