'use client'

import React, { Fragment, useEffect, useRef, useState } from 'react'
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
        //   ctxRef.current.lineCap = "round"

          const rect = canvas.getBoundingClientRect()

          canvas.width = rect.width
          canvas.height = rect.height
        }

    },[])


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

    // const onConfirmationBtnClickHandler = ()=>{
    //     const canvas = canvasRef.current

    //     if(canvas) saveImage(canvas.toDataURL(),`${Math.random()}`);
    // }

    const eraseAllBtnClickHandler = ()=>{
        const canvas = canvasRef.current
        const ctx = ctxRef.current

       if(canvas) ctx?.clearRect(0,0,canvas.width,canvas.height);
       imgURLHandler("") 
    }


    return(
        <Fragment>
            <ToolBar>
                <input type="color" name="colorPicker" id="colorPicker" onChange={onColorChangeHandler} />
                <input type="radio" name="toolSelection" id="pencil" onChange={()=>{setPencil(true)}} checked={pencil}/>
                <input type="radio" name="toolSelection" id="eraser" onChange={()=>{setPencil(false)}} checked={!pencil}/>
                <button onClick={eraseAllBtnClickHandler}>Apagar Tudo</button>
            </ToolBar>
                <input type="range" name="rangeChanger" id="rangeChanger"  max={50} min={0.5} value={lineWidth} onChange={onLineWidthChange}/>
           
            {/* <button onClick={onConfirmationBtnClickHandler}>Confirmar</button> */}
            <canvas style={{touchAction: 'none'}} className="drawningCanvas" ref={canvasRef} onPointerDown={onMouseDownHandler} onPointerMove={onMouseMoveHandler} onPointerUp={onMouseUpHandler}></canvas>
        </Fragment>
    )
    
}

export default DrawningCanvas