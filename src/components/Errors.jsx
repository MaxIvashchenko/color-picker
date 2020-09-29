import React from 'react'

export default function Errors({errorLength, errorValue, getInstanceColorValue}) {
    return (
        <>
              {  errorLength && <div className='errorInput'>HEX value is not correct</div>}
            {  errorValue && <div className='errorInput'>This HEX value doesn't exist</div>}
            {  (errorValue || errorLength) && <button className="errorBtn" style={{ zIndex: 8 }} onClick={() => getInstanceColorValue()}>click here to get instance color value</button>}
        </>
    )
}
