'use client'

import { Fragment, useState } from "react"
import ContributionChoiceBtn from "../../components/buttons/ContributionChoiceBtn"
import SelectionHub from "@/components/cointainers/SelectionHub"
import RedirectionButton from "@/components/buttons/RedirectionButton"
import ImageUploader from "@/components/contributionsInterfaces/ImageUploader"




const CreatePost : React.FC = ()=>{
    const [postType,setPostType] = useState<string>("");

    return(
        <Fragment>
            {!postType &&
              <Fragment>
                        <RedirectionButton link={"#"} text={"<Voltar ao Mural"}/>
                        <SelectionHub message="Envie suas memórias para o quadro"> 
                            <ContributionChoiceBtn btnColor="#5fa8d3" btnText="Escolha uma imagem" type="image" btnMethod={setPostType} imgSrc="/assets/icons/picture-icon.svg" />
                            <ContributionChoiceBtn btnColor="#d67ab1" btnText="Faça um desenho" type="paint" btnMethod={setPostType} imgSrc="/assets/icons/paint-icon.svg" />
                            <ContributionChoiceBtn btnColor="#5e548e" btnText="Escreva um texto" type="text" btnMethod={setPostType} imgSrc="/assets/icons/text-icon.svg" />
                        </SelectionHub>
              </Fragment>
            }

            {postType == "image" && 
                <ImageUploader/>
            }

        </Fragment>


    )
}

export default CreatePost