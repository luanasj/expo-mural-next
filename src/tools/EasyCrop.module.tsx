import { useState } from "react";
import Cropper from "react-easy-crop";

interface iArea {
    x: number
    y: number
    width: number
    height: number
}
interface iEasyCrop {
    imgUrl : string
    aspectX: number
    aspectY: number
    cropOP: (url:string,area: iArea) => void
}


const EasyCrop : React.FC<iEasyCrop> = ({imgUrl,aspectX,aspectY,cropOP}) => {
    const [crop,setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    
    const onCropComplete = (croppedArea : iArea , croppedAreaPixels:iArea) : void => {
        cropOP(imgUrl,croppedAreaPixels)
        // console.log(imgUrl)    
        console.log(croppedArea, croppedAreaPixels)
    }


    return (
        <Cropper
            image={imgUrl}
            crop={crop}
            zoom={zoom}
            aspect={aspectX/aspectY}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
        />
    
    )
}

export default EasyCrop