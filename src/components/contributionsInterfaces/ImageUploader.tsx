'use client'


import { Fragment, useRef, useState } from "react"
import EasyCrop from "../../tools/EasyCrop"
import getCroppedImg from "../../utils/getCroppedImg"
import saveImage from "../../services/saveImage"
import "./ImageUploader.scss"
import ToolBar from "../cointainers/ToolBar"
import AspectRange from "../buttons/edit/AspectRange"
import FunctionalBtn from "@/components/buttons/FunctionalBtn"
import ButtonsContainer from "../cointainers/ButtonsContainer"



const ImageUploader = ({returnPageHandler} : {returnPageHandler: () => void})=>{
    
    const[image,setImage] = useState<File|null>(null)
    const[previewUrl, setPreviewUrl] = useState<string>("")
    const[aspectX,setAspectX] = useState<number>(1)
    const[aspectY,setAspectY] = useState<number>(1)
    const[cropBase64,setCropBase64] = useState<string>('') 
    

    const handleFile = (file: File): void => {
        setImage(file);
        if(file) setPreviewUrl(URL.createObjectURL(file));
    }

    const fileInputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>): void => {
        const target = evt.target as HTMLInputElement
        const file : File | undefined = target.files?.[0]

        if(file) handleFile(file)
    }

    const fileInput = useRef<HTMLInputElement>(null)

    const handleOnDragOver = (evt: React.DragEvent) : void =>{
        evt.preventDefault()
    }

    const handleOndrop = (evt: React.DragEvent) : void => {

        evt.preventDefault()
        evt.stopPropagation()

        let imageFile = evt.dataTransfer.files[0]
        handleFile(imageFile)
    }

    const dropZoneClickHandler = ()=>{
        if( fileInput.current){ fileInput.current.click()};
        
    }

    const cropHandler = async (imgURL:string, pixelCrop: {width: number, height: number, x: number, y: number}) : Promise<void>=>{
        
        const img = await getCroppedImg(imgURL,pixelCrop)

        setCropBase64(img)
        // console.log(cropBase64)
    }

    const aspectyChangeHandler = (evt: React.FormEvent)=>{
        const inputElement = evt.target as HTMLInputElement
        setAspectY(inputElement.valueAsNumber)
        
    };

    const aspectxChangeHandler = (evt: React.FormEvent)=>{
        const inputElement = evt.target as HTMLInputElement
        setAspectX(inputElement.valueAsNumber)
        console.log(aspectX)
    };

    const deleteImageHandler = ()=>{
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl("")
    }

    const cancelBtnHandler = ()=>{
        deleteImageHandler()
        returnPageHandler()

    }

    const postBtnHandler = ()=>{
        saveImage(cropBase64,`picture-${Date.now()}}`);
        URL.revokeObjectURL(previewUrl)
    }
    

    return (
        <div className="wrapper">

            {!previewUrl &&
                <Fragment>
                    <div className="drop_zone" onDragOver={handleOnDragOver} onDrop={handleOndrop} onClick={dropZoneClickHandler}>
                        <p>Arraste um arquivo ou clique para selecionar uma imagem do seu dispositivo.</p>
                    </div>
                    <input type="file" accept="image/*" ref={fileInput} hidden onChange={fileInputChangeHandler}/>
                </Fragment>
            }


            {previewUrl && 
            <section className="crop">
                <ToolBar>
                    <AspectRange label="x" min={1} max={16} changeHandler={aspectxChangeHandler}/>
                    <AspectRange label="x" min={1} max={16} changeHandler={aspectyChangeHandler}/>
                </ToolBar>
                
                <EasyCrop imgUrl={previewUrl} aspectX={aspectX} aspectY={aspectY} cropOP={cropHandler}/> 
            </section>}
            
            <ButtonsContainer>
                <FunctionalBtn bg_color="#DADADA" color="#000000" label="Cancelar" clickHandler={cancelBtnHandler}/>
                <FunctionalBtn bg_color="#686868" color="#ffffff" label="Postar" clickHandler={postBtnHandler}/>
            </ButtonsContainer>
        </div>
        
        
    )
}

export default ImageUploader