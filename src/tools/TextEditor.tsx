'use client'


import { SetStateAction, useRef, useState } from "react"
import "./TextEditor.scss"
import ToolBar from "@/components/cointainers/ToolBar";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import { AiOutlineItalic, AiOutlineBold } from "react-icons/ai";
import { TbShadow } from "react-icons/tb";
import { FaBorderStyle } from "react-icons/fa";

import {
  AiOutlineAlignLeft,
  AiOutlineAlignCenter,
  AiOutlineAlignRight
} from "react-icons/ai";
import { MdFormatAlignJustify } from "react-icons/md";

type TextAlign = "left" | "right" | "center" | "justify"; // Declaração explícita

const TextEditor  = ({textHandler}: {textHandler: ({text , style}: {text:string,style:string})=>void})=>{
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
    const [align,setAlign] = useState<TextAlign>('left')

    const fontOptions = ['serif','sans-serif','monospace','cursive','fantasy']
    const alignOptions = useRef<string[]>(['left','right','center','justify'])      
    
    const useTextHandler = ()=>{
        const styleObj = {
            color,
            fontSize: `${size}%`,
            fontFamily: font,
            fontStyle: italic,
            fontWeight: weight,
            textShadow: shadow,
            WebkitTextStroke: `${border}px`,
            WebkitTextStrokeColor: borderColor,
            textAlign: align
        };
        const styles = JSON.stringify(styleObj);
        textHandler({
            text: text, 
            style: styles
        })
    }

    const textAreaOnChangeHandler = (evt : React.ChangeEvent<HTMLTextAreaElement>)=>{
        setText(evt.target.value)
        useTextHandler()
        
    }

    const sizeChangeHandler = (op : (a:number)=>SetStateAction<number>) =>{
        setSize(op(size))
        useTextHandler()

    }

    const colorChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        setColor(evt.target.value)
        useTextHandler()

    }

    const fontChangeHandler = (evt: React.ChangeEvent<HTMLSelectElement>) =>{
        setFont(evt.target.value)
        useTextHandler()

    }

    const selectItalicHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        // console.log(evt)
        setItalic(evt.target.checked ? 'italic' : 'normal')
        useTextHandler()

    }

    const selectBoldHandler = (evt: React.ChangeEvent<HTMLInputElement>) =>{
        setWeight(evt.target.checked ? 'bold' : 'normal')
        useTextHandler()

    }

    const selectShadowHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        const shadowSize = size/4
        setShadow(evt.target.checked ? `${shadowSize}px ${shadowSize}px 4px ${color}` : 'none')
        useTextHandler()

    }

    const selectBorderHandler = (evt: React.ChangeEvent<HTMLInputElement>)=>{
        const borderSize = size/30
        setBorder(evt.target.checked ? `${borderSize}` : '0')
        useTextHandler()

    } 

    const changeAlignHandler = ()=>{

       alignOptions.current.push(alignOptions.current.shift() ?? "");

       setAlign(alignOptions.current[0] as TextAlign)
        
    useTextHandler()

    }


    return(

        <div className="textEditor">
            <ToolBar>
                <input onChange={colorChangeHandler} type="color" name="textColor" id="textColor" />

                <button onClick={() => sizeChangeHandler(size => size + 1)} title="Aumentar tamanho">
                    <AiOutlinePlus size={20} />
                </button>

                <button onClick={() => sizeChangeHandler(size => size - 1)} title="Diminuir tamanho">
                    <AiOutlineMinus size={20} />
                </button> 

                <select onChange={fontChangeHandler} name="fonts" id="fonts" value={font}>
                    {
                        fontOptions.map((font,index)=>(              
                                <option value={font} key={index}>{font}</option>
                        ))
                    }
                </select>


                <div className="textTools">
                    <label htmlFor="italic" title="Itálico">
                        <AiOutlineItalic size={20} />
                        <input onChange={selectItalicHandler} type="checkbox" id="italic" hidden />
                    </label>

                    <label htmlFor="weight" title="Negrito">
                        <AiOutlineBold size={20} />
                        <input onChange={selectBoldHandler} type="checkbox" id="weight" hidden />
                    </label>

                    <label htmlFor="shadow" title="Sombra">
                        <TbShadow size={20} />
                        <input onChange={selectShadowHandler} type="checkbox" id="shadow" hidden />
                    </label>

                    <label htmlFor="border" title="Borda">
                        <FaBorderStyle size={18} />
                        <input onChange={selectBorderHandler} type="checkbox" id="border" hidden />
                    </label>

                    {border != '0' &&
                        <input onChange={(evt)=>{setBorderColor(evt.target.value)}} type="color" name="borderColor" id="borderColor" />
                    }

                    
                    <button onClick={changeAlignHandler} title={`Alinhamento: ${align}`}>
                        {{
                            left: <AiOutlineAlignLeft size={20} />,
                            center: <AiOutlineAlignCenter size={20} />,
                            right: <AiOutlineAlignRight size={20} />,
                            justify: <MdFormatAlignJustify size={20} />
                        }[align]}
                    </button>
                </div>    
            </ToolBar>

            <textarea  maxLength={180} style={{color: color,fontSize:`${10*size}%`,fontFamily: font, fontStyle:italic, fontWeight: weight, textShadow: shadow, WebkitTextStroke: `${border}px`,WebkitTextStrokeColor:borderColor,textAlign:align }}/*onSelect={(e)=>console.log(e)}*/ onChange={textAreaOnChangeHandler} name="" id=""></textarea> 

        </div>
    )
}


export default TextEditor