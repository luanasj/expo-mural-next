import { useState } from 'react'
import DrawningCanvas from '../../tools/DrawningCanvas'
import ButtonsContainer from '../cointainers/ButtonsContainer'
import FunctionalBtn from '../buttons/FunctionalBtn'
import './DrawningUploader.scss'
import saveImage from '@/services/saveImage'

const DrawningUploader = ({returnPageHandler} : {returnPageHandler: () => void})=>{
    const [drawningURL, setDrawningURL] = useState<string>("")

    const cancelBtnHandler = ()=>{
        setDrawningURL("")
        returnPageHandler()

    }

    const postBtnHandler = ()=>{
        if(drawningURL) saveImage(drawningURL,`${Math.random()}`);
    }

    return (
        <div className="drawningUploader">
            <DrawningCanvas imgURLHandler={setDrawningURL} />
            <ButtonsContainer>
                <FunctionalBtn bg_color="#DADADA" color="#000000" label="Cancelar" clickHandler={cancelBtnHandler}/>
                <FunctionalBtn bg_color="#686868" color="#ffffff" label="Postar" clickHandler={postBtnHandler}/>
            </ButtonsContainer>
        </div>
    )
}

export default DrawningUploader