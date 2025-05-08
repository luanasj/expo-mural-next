'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'
import { FaPaintBrush, FaEraser } from 'react-icons/fa';
import saveImage from '../services/saveImage'
import ImageUploader from '@/components/contributionsInterfaces/ImageUploader'
import ToolBar from '@/components/cointainers/ToolBar'
import './DrawningCanvas.scss'

interface iCanvasPos {
    x:number
    y:number
}

const DrawningCanvas = ({imgURLHandler}: {imgURLHandler : (url:string)=> void})=>{
    const [previousPos,setPreviousPos] = useState({x:0,y:0})
    const [mouseDown,setMouseDown] = useState(false)
    const [drawningColor,setDrawningColor] = useState("")
    const [lineWidth,setLineWidth] = useState(1)
    const [pencil,setPencil] = useState(true)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D>(null)

    useEffect(()=>{
        const canvas = canvasRef.current
        if(canvas){
          ctxRef.current = canvas.getContext('2d')
          const rect = canvas.getBoundingClientRect()

          canvas.width = rect.width
          canvas.height = rect.height
        }

    },[])

    // useEffect(() => {
    //     const updateCanvasSize = () => {
    //       const canvas = canvasRef.current;
    //       if (canvas) {
    //         const ctx = canvas.getContext('2d');
    //         // Salva o desenho atual. Note: isso captura apenas a área original.
    //         if(ctx){
    //             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //             // Atualiza as dimensões do canvas
    //             const rect = canvas.getBoundingClientRect();
    //             canvas.width = rect.width;
    //             canvas.height = rect.height;
        
    //             // Restaura o conteúdo salvo
    //             ctx?.putImageData(imageData, 0, 0);
    //             }
      
            
    //       }
    //     };
      
    //     updateCanvasSize();
    //     window.addEventListener('resize', updateCanvasSize);
      
    //     return () => {
    //       window.removeEventListener('resize', updateCanvasSize);
    //     };
    //   }, []);
      


    const draw = (beginPos : iCanvasPos , endPos: iCanvasPos)=>{
        const ctx = ctxRef.current
        if(ctx){
            if(lineWidth){
                ctx.lineWidth = lineWidth
            }
            ctx.lineCap = "round"
            ctx.beginPath()
            ctx.moveTo(beginPos.x,beginPos.y)
            ctx.lineTo(endPos.x,endPos.y)
            if(drawningColor){
                ctx.strokeStyle = drawningColor
            }
            ctx.stroke()
        }

    }

    const erase = (pos : iCanvasPos,size : {width:number,height:number})=>{
        const ctx = ctxRef.current
        const {width,height} = size
        if(ctx) ctx.clearRect(pos.x,pos.y,width,height);
    }

    const onMouseDownHandler = (evt: React.PointerEvent<HTMLCanvasElement>)=>{
        evt.preventDefault()
        evt.stopPropagation()
        setMouseDown(true)
    }

    const onMouseUpHandler = (evt: React.PointerEvent<HTMLCanvasElement>)=>{
        evt.preventDefault()
        evt.stopPropagation()
        const canvas = canvasRef.current
        if(canvas) imgURLHandler(canvas.toDataURL());

        setMouseDown(false)
        setPreviousPos({ x: 0, y: 0 }); // Reseta posição anterior
    }

    const onMouseMoveHandler= (evt: React.PointerEvent<HTMLCanvasElement>)=>{
        evt.preventDefault()
        evt.stopPropagation()
        const currentPos = {x:evt.nativeEvent.offsetX,y:evt.nativeEvent.offsetY}
        if(mouseDown){
            if(pencil && previousPos.x && previousPos.y){   
                draw(previousPos,currentPos)
            } else {
                erase(currentPos,{width: lineWidth,height:lineWidth})
            }
        } 
        setPreviousPos({... currentPos})
        
        
    }

    

    const onColorChangeHandler = (evt: React.ChangeEvent)=>{
        const evt_target = evt.target as HTMLInputElement
        setDrawningColor(evt_target.value)
    }

    const onLineWidthChange = (evt: React.ChangeEvent)=>{
        const evt_target = evt.target as HTMLInputElement
        setLineWidth(evt_target.valueAsNumber)
    }

    const selectPencilHandler = ()=>{
        setPencil(true)
    }

    const selectEraserHandler = ()=>{
        setPencil(false)
    }

    const eraseAllBtnClickHandler = ()=>{
        const canvas = canvasRef.current
        const ctx = ctxRef.current

       if(canvas) ctx?.clearRect(0,0,canvas.width,canvas.height);
       imgURLHandler("") 
    }


    return(
        <section className='canvasContainer'>
            <ToolBar>
                <input type="color" name="colorPicker" id="colorPicker" onChange={onColorChangeHandler} />
                {/* <input type="radio" name="toolSelection" id="pencil" onChange={selectPencilHandler} checked={pencil}/>
                <input type="radio" name="toolSelection" id="eraser" onChange={selectEraserHandler} checked={!pencil}/> */}
                {/* Input de Pincel, escondido */}
                <input
                    type="radio"
                    name="toolSelection"
                    id="pencil"
                    onChange={selectPencilHandler}
                    checked={pencil}
                    style={{ display: 'none' }}
                />
                <label htmlFor="pencil" className={`icon-label ${pencil ? 'selected' : ''}`}>
                    <FaPaintBrush size={15} />
                </label>

                {/* Input de Borracha, escondido */}
                <input
                    type="radio"
                    name="toolSelection"
                    id="eraser"
                    onChange={selectEraserHandler}
                    checked={!pencil}
                    style={{ display: 'none' }}
                />
                <label htmlFor="eraser" className={`icon-label ${!pencil ? 'selected' : ''}`}>
                    <FaEraser size={15} />
                </label>

                <input type="range" name="rangeChanger" id="rangeChanger"  max={50} min={0.5} value={lineWidth} onChange={onLineWidthChange}/>
                
                <button onClick={eraseAllBtnClickHandler}>Limpar</button>
            </ToolBar>
           <div className="canvasWrapper">
                <canvas className="drawningCanvas" ref={canvasRef} onPointerDown={onMouseDownHandler} onPointerMove={onMouseMoveHandler} onPointerUp={onMouseUpHandler}></canvas>
           </div>
        </section>
    )
    
}

export default DrawningCanvas