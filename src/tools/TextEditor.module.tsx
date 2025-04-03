'use client'

import { Fragment, useRef, useState } from "react"
import styles from "./TextEditor.module.css"

const TextEditor : React.FC = ()=>{
    const [text,setText] = useState("")
    const [size,setSize] = useState(14)
    const [color,setColor] = useState('black')
    const [font,setFont] = useState('serif')
    const [italic,setItalic] = useState('normal')
    const [weight,setWeight] = useState('normal')
    // const [underline,setUnderline] = useState(false)
    const [shadow,setShadow] = useState("none")
    const [border,setBorder] = useState('0')
    const [borderColor,setBorderColor] = useState('black')
    const [align,setAlign] = useState('left')

    const fontOptions = ['serif','sans-serif','monospace','cursive','fantasy']
    const alignOptions = useRef(['left','right','center','justify'])      
    

    const textAreaOnChangeHandler = (evt)=>{
        setText(evt.target.value)
        
    }


    const sizeChangeHandler = (op) =>{
        setSize(op(size))
    }

    const colorChangeHandler = (evt)=>{
        setColor(evt.target.value)
    }

    const fontChangeHandler = (evt) =>{
        setFont(evt.target.value)
    }

    const selectItalicHandler = (evt)=>{
        // console.log(evt)
        setItalic(evt.target.checked ? 'italic' : 'normal')

    }

    const selectBoldHandler = (evt) =>{
        setWeight(evt.target.checked ? 'bold' : 'normal')
    }

    const selectShadowHandler = (evt)=>{
        const shadowSize = size/4
        setShadow(evt.target.checked ? `${shadowSize}px ${shadowSize}px 4px ${color}` : 'none')
    }

    const selectBorderHandler = (evt)=>{
        const borderSize = size/30
        setBorder(evt.target.checked ? `${borderSize}` : '0')
    } 

    const changeAlignHandler = ()=>{
        alignOptions.current.push(alignOptions.current.shift())

        // console.log(alignOptions.current)

        setAlign(alignOptions.current[0])

       
    }


    return(

        <div>
            <textarea style={{color: color,fontSize:`${size}px`,fontFamily: font, fontStyle:italic, fontWeight: weight, textShadow: shadow, WebkitTextStroke: `${border}px`,WebkitTextStrokeColor:borderColor,textAlign:align}}/*onSelect={(e)=>console.log(e)}*/ onChange={textAreaOnChangeHandler} name="" id=""></textarea> 

            <input onChange={colorChangeHandler} type="color" name="textColor" id="textColor" />
            <button onClick={()=>sizeChangeHandler(size=>size+1)}>A+</button>
            <button onClick={()=>sizeChangeHandler(size=>size-1)}>A-</button>
            <select onChange={fontChangeHandler} name="fonts" id="fonts" value={font}>
                {
                    fontOptions.map((font,index)=>(
                                               
                            <option value={font} key={index}>{font}</option>
                        

                    ))
                }
            </select>

            <input onChange={selectItalicHandler} type="checkbox" name="italic" id="italic" />
            <input onChange={selectBoldHandler} type="checkbox" name="weight" id="weight" />
            <input onChange={selectShadowHandler} type="checkbox" name="shadow" id="shadow" />
            <input onChange={selectBorderHandler} type="checkbox" name="border" id="border" />

            {border != '0' &&
                <input onChange={(evt)=>{setBorderColor(evt.target.value)}} type="color" name="borderColor" id="borderColor" />
            }

            <button onClick={changeAlignHandler}>{align}</button>



            <section style={{color: color,fontSize:`${size}px`,fontFamily: font, fontStyle:italic, fontWeight: weight, textShadow: shadow, WebkitTextStroke: `${border}px`,WebkitTextStrokeColor:borderColor,textAlign: align}}>
                {
                text.split('\n').map((line,index)=>(
                <p  /*onMouseUp={(evt)=>{console.log(evt);console.log(window.getSelection()?.toString())}}*/  key={index}>
                    {line} <br/>
                </p>
                ))
            }</section>
        </div>
    )
}


export default TextEditor