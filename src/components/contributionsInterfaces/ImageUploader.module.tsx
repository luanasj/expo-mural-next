'use client'


import { Fragment, useRef, useState } from "react"
import styles from "./ImageUploader.module.css"
import EasyCrop from "../../tools/EasyCrop.module"
import getCroppedImg from "../../tools/getCroppedImg"
import saveImage from "../../tools/saveImage"

const ImageUploader : React.FC = ()=>{
    const[image,setImage] = useState<File|null>(null)
    const[previewUrl, setPreviewUrl] = useState<string>("")
    const[aspectX,setAspectX] = useState<number>(1)
    const[aspectY,setAspectY] = useState<number>(1)
    const[cropBase64,setCropBase64] = useState<string>('') 
    

    const handleFile = (file: File): void => {
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
        console.log(file)

        // Note: The URL.createObjURL method can cause memory leak if it’s not cleaned up after use. 
        // so always ensure to clean it up using URL.revokeObjectURL(previewUrl).
    }

    const fileInput = useRef(null)

    const handleOnDragOver = (evt: React.DragEvent) : void =>{
        evt.preventDefault()
    }

    const handleOndrop = (evt: React.DragEvent) : void => {
        evt.preventDefault()
        evt.stopPropagation()

        let imageFile = evt.dataTransfer.files[0]
        handleFile(imageFile)
    }

    const cropHandler = async (imgURL,pixelCrop) : void=>{
        
        const img = await getCroppedImg(imgURL,pixelCrop)

        setCropBase64(img)
        // console.log(cropBase64)
    }

    return (
        <div className={`${styles.wrapper}`}>
            <div className={`${styles.drop_zone}`} onDragOver={handleOnDragOver} onDrop={handleOndrop} onClick={()=>{fileInput.current.click()}}>
                <p>Drag and Drop image here</p>
            </div>

            <input type="file" accept="image/*" ref={fileInput} hidden onChange={(e)=>{handleFile(e.target.files[0])}}/>

            {previewUrl && 
            <Fragment>
            <button onClick={()=>{
                            URL.revokeObjectURL(previewUrl)
                            setPreviewUrl("")
                            }}>Excluir</button> 
            <button onClick={()=>{saveImage(cropBase64,`random${Math.random()}`); URL.revokeObjectURL(previewUrl)}}>Confirmar imagem</button>
            <input type="range" name="" id="aspectx" min={1} max={10} onChange={(evt)=>setAspectX(evt.target.valueAsNumber)}/>
            <input type="range" name="" id="aspecty" min={1} max={10} onChange={(evt)=>setAspectY(evt.target.valueAsNumber)}/>
            <div style={{width: "500px", height: "500px", position: "relative"}}>
                <EasyCrop imgUrl={previewUrl} aspectX={aspectX} aspectY={aspectY} cropOP={cropHandler}/>
            </div>
 
            </Fragment>


            

            }
        </div>
        
        
    )
}

export default ImageUploader