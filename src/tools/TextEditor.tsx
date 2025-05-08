'use client'

import { SetStateAction, useRef, useState } from "react"
import "./TextEditor.scss"

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
    const alignOptions = useRef<string[]>(['left','right','center','justify'])      
    

    const textAreaOnChangeHandler = (evt : React.ChangeEvent<HTMLTextAreaElement>)=>{
        setText(evt.target.value)
        
    }


    const sizeChangeHandler = (op : (a:number)=>SetStateAction<number>) =>{
        setSize(op(size))
    }

    const colorChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        setColor(evt.target.value)
    }

    const fontChangeHandler = (evt: React.ChangeEvent<HTMLSelectElement>) =>{
        setFont(evt.target.value)
    }

    const selectItalicHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        // console.log(evt)
        setItalic(evt.target.checked ? 'italic' : 'normal')

    }

    const selectBoldHandler = (evt: React.ChangeEvent<HTMLInputElement>) =>{
        setWeight(evt.target.checked ? 'bold' : 'normal')
    }

    const selectShadowHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        const shadowSize = size/4
        setShadow(evt.target.checked ? `${shadowSize}px ${shadowSize}px 4px ${color}` : 'none')
    }

    const selectBorderHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        const borderSize = size/30
        setBorder(evt.target.checked ? `${borderSize}` : '0')
    } 

    const changeAlignHandler = ()=>{
        const newAligment:string = alignOptions.current.shift()
       alignOptions.current.push(newAligment)

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