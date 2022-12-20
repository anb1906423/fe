import React from 'react'

const Heading = (props) => {
    const headingStyle = {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        padding: '8px 8px',
        color: 'var(--main-color)',
        margin: '0 auto',
    }
    return (
        <div className='heading' style={headingStyle}>
            <h2>{props.title}</h2>
        </div>
    )
}

export default Heading