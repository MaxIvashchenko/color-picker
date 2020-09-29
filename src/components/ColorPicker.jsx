import React, { useState } from 'react'
import './ColorPicker.css'
import ColorsPopUp from './ColorsPopUp'
import RGBBPopUp from './RGBBPopUp'
import { rgbToHex, hexToRgb } from '../lib/converter'
import Errors from './Errors'

export default function ColorPicker() {
    const colors = [
        { name: "red", r: 255, g: 0, b: 0 },
        { name: "yellow", r: 255, g: 255, b: 0 },
        { name: "green", r: 0, g: 128, b: 0 },
        { name: "blue", r: 54, g: 127, b: 209 },
    ]

    const [activeColor, setActiveColor] = useState(0)
    const [showColorsList, setShowColorsList] = useState(false)
    const [showColorRGB, setShowColorRGB] = useState(false)
    const [numRcolor, setNumRcolor] = useState(colors[activeColor].r)
    const [numGcolor, setNumGcolor] = useState(colors[activeColor].g)
    const [numBcolor, setNumBcolor] = useState(colors[activeColor].b)
    const [showPrevColor, setShowPrevColor] = useState([numRcolor, numGcolor, numBcolor])

    const [errorLength, setErrorLength] = useState(false)
    const [errorValue, setErrorValue] = useState(false)

    const [value, setValue] = useState(rgbToHex(...showPrevColor)) // hexValue

    function handleInputChange(inputName, num) {
        switch (inputName) {
            case 'R':
                setNumRcolor(num)
                break;
            case 'G':
                setNumGcolor(num)
                break;
            case 'B':
                setNumBcolor(num)
                break;
            default:
                return null
        }
    }

    function getColor(i) {
        const { r, g, b } = colors[i]
        setNumRcolor(r)
        setNumGcolor(g)
        setNumBcolor(b)
        setActiveColor(i)
        setShowPrevColor([r, g, b])
        setValue(rgbToHex(r, g, b))
        setShowColorsList(false)
        setErrorValue(false)
        setErrorLength(false)
    }

    function setColor() {
        setShowPrevColor([numRcolor, numGcolor, numBcolor])
        setValue(rgbToHex(numRcolor, numGcolor, numBcolor))
        setShowColorRGB(false)
        setErrorLength(false)
        setErrorValue(false)
    }

    function showPopup(blockName) {
        switch (blockName) {
            case 'colorsPopUp':
                setShowColorsList(!showColorsList)
                setShowColorRGB(false)
                break;
            case 'RGBBPopUp':
                setShowColorRGB(!showColorRGB)
                setShowColorsList(false)
                setShowPrevColor([numRcolor, numGcolor, numBcolor])
                break;
            default:
                setShowColorsList(false)
                setShowColorRGB(false)
                getPrevColor(...showPrevColor)
        }
    }

    function getPrevColor(r, g, b) {
        setNumRcolor(r)
        setNumGcolor(g)
        setNumBcolor(b)
        setShowColorRGB(false)
    }

    const handleChange = e => {
        const value = e.target.value;
        setValue(value)
        const rgbValue = hexToRgb(value)

        if (value.length < 7) {
            setErrorLength(false)
            setErrorValue(false)
        }
        else if (value.length === 7) {
            if (rgbValue !== null) {
                setNumRcolor(rgbValue[0])
                setNumGcolor(rgbValue[1])
                setNumBcolor(rgbValue[2])
                setShowPrevColor([+rgbValue[0], +rgbValue[1], +rgbValue[2]])
            } else {
                setErrorValue(true)
            }
            setErrorLength(false)
            setErrorValue(false)

        } else {
            setErrorLength(true)
            setErrorValue(true)
        }
    }

    function getInstanceColorValue() {
        setValue(rgbToHex(...showPrevColor))
        setErrorLength(false)
        setErrorValue(false)
    }

    return (
        <div className='colorPicker'>

            <button onClick={() => showPopup()} className='wrapper'></button>

            <div className='form'>
                <input value={value} onChange={(e) => handleChange(e)} type='text' />

                <div className='activeColorBlock'>
                    <button onClick={() => showPopup('colorsPopUp')} className='activeColor' style={{ background: `${rgbToHex(numRcolor, numGcolor, numBcolor)}` }}></button>
                    {showColorsList &&
                        <ColorsPopUp
                            colors={colors}
                            setActiveColor={setActiveColor}
                            getColor={getColor}
                        />
                    }
                </div>
                <div className='RGBBlock'>
                    <button className={`RGBBtn ${showColorRGB && 'activeRGBBtn'}`} onClick={() => showPopup('RGBBPopUp')}></button>

                    <RGBBPopUp
                        showPrevColor={showPrevColor}
                        showColorRGB={showColorRGB}
                        numRcolor={numRcolor}
                        numGcolor={numGcolor}
                        numBcolor={numBcolor}
                        handleInputChange={handleInputChange}
                        getPrevColor={getPrevColor}
                        setColor={setColor}
                    />

                </div>
            </div>
            <Errors errorLength={errorLength} errorValue={errorValue} getInstanceColorValue={getInstanceColorValue} />
        </div>
    )
}
