import { Fragment } from "react"
import "./TextUploader.scss"
import TextEditor from "@/tools/TextEditor"
import FunctionalBtn from "@/components/buttons/FunctionalBtn"
import ButtonsContainer from "../cointainers/ButtonsContainer"

const TextUploader = ({returnPageHandler} : {returnPageHandler: () => void})=>{

        const cancelBtnHandler = ()=>{
            returnPageHandler()
        }
    
        const postBtnHandler = async ()=>{
            // const router = useRouter()
            // const resultado = await saveImage(cropBase64,`picture-${Date.now()}}`);
            // URL.revokeObjectURL(previewUrl)
            // setFlash({ success: resultado.ok, message: resultado.message });
            // if(resultado.ok){
                // redirect("/")
            // }
            // console.log(response)
        }

    return(
        <section className="textUploader">
            <TextEditor/>
                <ButtonsContainer>
                    <FunctionalBtn bg_color="#DADADA" color="#000000" label="Cancelar" clickHandler={cancelBtnHandler}/>
                    <FunctionalBtn bg_color="#686868" color="#ffffff" label="Postar" clickHandler={postBtnHandler}/>
                </ButtonsContainer>
        </section>
    )
}

export default TextUploader