import { Fragment, useState } from "react"
import "./TextUploader.scss"
import TextEditor from "@/tools/TextEditor"
import FunctionalBtn from "@/components/buttons/FunctionalBtn"
import ButtonsContainer from "../cointainers/ButtonsContainer"
import updateMuralCell from "@/services/updateMuralCell"
import { redirect } from "next/navigation";

const TextUploader = ({returnPageHandler} : {returnPageHandler: () => void})=>{
        const [text, setText] = useState<{text:string,style:string}>({text:"",style:""})
        const [isPosting, setIsPosting] = useState(false);


        const cancelBtnHandler = ()=>{
            returnPageHandler()
        }
    
        const postBtnHandler = async ()=>{
            setIsPosting(true);
            // const router = useRouter()
            const resultado = await updateMuralCell("text",text.style,text.text);
            // URL.revokeObjectURL(previewUrl)
            // setFlash({ success: resultado.ok, message: resultado.message });
            if(resultado.ok){
                redirect("/")
            } else {
                setIsPosting(false); // reativa o botão se falhar
        // opcional: exibir erro ou feedback
            }   
            // console.log(response)
        }

    return(
        <section className="textUploader">
            <TextEditor textHandler={setText}/>
            <ButtonsContainer>
                <FunctionalBtn bg_color="#DADADA" color="#000000" label="Cancelar" clickHandler={cancelBtnHandler}/>
                <FunctionalBtn bg_color="#686868" color="#ffffff" label="Postar" clickHandler={postBtnHandler} disabled={isPosting}/>
            </ButtonsContainer>
        </section>
    )
}

export default TextUploader