'use client'

import styles from './DrawningCanvas.module.css'
import { Fragment, useEffect, useRef, useState } from 'react'
import saveImage from './saveImage'

const DrawningCanvas : React.FC = ()=>{
    // const [currentPos,setCurrentPos] = useState({x:null,y:null})
    const [previousPos,setPreviousPos] = useState({x:null,y:null})
    const [mouseDown,setMouseDown] = useState(false)
    const [drawningColor,setDrawningColor] = useState("")
    const [lineWidth,setLineWidth] = useState(1)
    const [pencil,setPencil] = useState(true)
    const canvasRef = useRef(null)
    const ctxRef = useRef(null)

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




    const draw = (beginPos,endPos)=>{
        const ctx = ctxRef.current
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

    const erase = (pos,size)=>{
        const ctx = ctxRef.current
        const {width,height} = size

        ctx.clearRect(pos.x,pos.y,width,height)
    }



    const onMouseDownHandler = (evt)=>{
        setMouseDown(true)
    }

    const onMouseUpHandler = ()=>{
        setMouseDown(false)
        setPreviousPos({ x: null, y: null }); // Reseta posição anterior
    }

    const onMouseMoveHandler= (evt)=>{
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

    const onColorChangeHandler = (evt)=>{
        setDrawningColor(evt.target.value)
    }

    const onLineWidthChange = (evt)=>{
        setLineWidth(evt.target.value)
    }

    const onConfirmationBtnClickHandler = ()=>{
        const canvas = canvasRef.current

        saveImage(canvas.toDataURL(),`${Math.random()}`)
    }

    const eraseAllBtnClickHandler = ()=>{
        const canvas = canvasRef.current
        const ctx = ctxRef.current

        ctx.clearRect(0,0,canvas.width,canvas.height)
    }




    return(
        <Fragment>
            <input type="color" name="colorPicker" id="colorPicker" onChange={onColorChangeHandler} />
            <input type="range" name="rangeChanger" id="rangeChanger"  max={50} min={0.5} value={lineWidth} onChange={onLineWidthChange}/>
            <input type="radio" name="toolSelection" id="pencil" onChange={()=>{setPencil(true)}} checked={pencil}/>
            <input type="radio" name="toolSelection" id="eraser" onChange={()=>{setPencil(false)}} checked={!pencil}/>
            <button onClick={onConfirmationBtnClickHandler}>Confirmar</button>
            <button onClick={eraseAllBtnClickHandler}>Apagar Tudo</button>
            <canvas className={`${styles.DrawningCanvasProportions}`} ref={canvasRef} onMouseDown={onMouseDownHandler} onMouseMove={onMouseMoveHandler} onMouseUp={onMouseUpHandler}></canvas>
        </Fragment>
    )
    
}

export default DrawningCanvas