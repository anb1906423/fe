import React from 'react'

const UndertakeItem = ( props ) => {
    return (
        <div className="undertake-item">
            <div className="icon-undertake">
                {props.icon}
            </div>
            <div className="title-undertake">
                <h5 className="text-uppercase">{props.title}</h5>
            </div>
            <div className="des-undertake">
                <p className="">{props.des}</p>
            </div>
        </div>
    )
}

export default UndertakeItem