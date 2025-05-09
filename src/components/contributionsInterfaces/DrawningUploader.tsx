import { useState } from 'react'
import DrawningCanvas from '../../tools/DrawningCanvas'
import ButtonsContainer from '../cointainers/ButtonsContainer'
import FunctionalBtn from '../buttons/FunctionalBtn'
import './DrawningUploader.scss'
import saveImage from '@/services/saveImage'
// import { useRouter } from 'next/router'
import { redirect } from "next/navigation";

const DrawningUploader = ({returnPageHandler} : {returnPageHandler: () => void})=>{
    const [drawningURL, setDrawningURL] = useState<string>("")
    const[flash, setFlash] = useState<{ success: boolean; message: string } | null>(null);
    const [isPosting, setIsPosting] = useState(false);

    // const router = useRouter()


    const cancelBtnHandler = ()=>{
        setDrawningURL("")
        returnPageHandler()

    }

    const postBtnHandler = async ()=>{
        setIsPosting(true);

        // const router = useRouter()
        const resultado = await saveImage(drawningURL,`drawning-${Date.now()}}`);
        setFlash({ success: resultado.ok, message: resultado.message });
        if(resultado.ok){
            redirect("/")
        } else {
            setIsPosting(false);
        }
    }

    return (
        <div className="drawningUploader">
            <DrawningCanvas imgURLHandler={setDrawningURL} />
            <ButtonsContainer>
                <FunctionalBtn bg_color="#DADADA" color="#000000" label="Cancelar" clickHandler={cancelBtnHandler}/>
                <FunctionalBtn bg_color="#686868" color="#ffffff" label="Postar" clickHandler={postBtnHandler} disabled={isPosting}/>
            </ButtonsContainer>
        </div>
    )
}

export default DrawningUploader