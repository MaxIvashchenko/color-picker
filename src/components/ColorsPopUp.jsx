import React from 'react'

export default function ColorsPopUp({ colors,  getColor,activeColor }) {

  

    return (
        <div className='colorsPopUp'>

            {colors.map((color, i) => {
                return (
                    <button key={'popUp-' + color.name} onClick={() => getColor(i)} className={`color ${i === activeColor ? 'isActiveColor' : ''}`}>
                        <p className='colorName'>{color.name}</p>
                        <span style={{ background: `rgb(${color.r},${color.g},${color.b})` }} className='colorView'></span>
                    </button>
                )
            })}
        </div>
    )
}
