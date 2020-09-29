import React from 'react'

export default function RGBBPopUp(props) {


    const { showPrevColor, showColorRGB, numRcolor, numGcolor, numBcolor, handleInputChange, getPrevColor,setColor } = props
    const RGB = [
        { name: 'R', value: numRcolor },
        { name: 'G', value: numGcolor },
        { name: 'B', value: numBcolor },
    ]

    return (

        <div className={showColorRGB ? 'RGBBPopUp' : 'RGBBPopUphide'}>

            {RGB.map((item, i) => {
                return (
                    <div key={`${item.name}-colorBox-key`} className={`${item.name}-colorBox inputs`}  >
                        <label htmlFor={`${item.name}-colorBox`}>{item.name}</label>
                        <input onChange={(e) => handleInputChange(item.name, +e.target.value)} type="range" value={item.value} min={0} max={250} />
                    </div>
                )
            })}

            <div className="buttons">
                <button onClick={() => getPrevColor(...showPrevColor)} className="buttonCancel">Cancel</button>
                <button onClick={() => setColor()} className="buttonSubmit">Ok</button>
            </div>

        </div>
    )
}
