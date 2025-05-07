'use client'

import { Fragment } from "react"
import ContributionChoiceBtn from "../../components/buttons/ContributionChoiceBtn"
import SelectionHub from "@/components/cointainers/SelectionHub"
import RedirectionButton from "@/components/buttons/RedirectionButton"
// import ImageUploader from "../../contributionsInterfaces/ImageUploader.module"



const CreatePost : React.FC = ()=>{
    return(
        <Fragment>
            <RedirectionButton link={"#"} text={"<Voltar ao Mural"}/>
            <SelectionHub message="Envie suas memórias para o quadro"> 
                <ContributionChoiceBtn btnColor="#5fa8d3" btnText="Escolha uma imagem" btnMethod={()=>{}} imgSrc="/assets/icons/picture-icon.svg" />
                <ContributionChoiceBtn btnColor="#d67ab1" btnText="Faça um desenho" btnMethod={()=>{}} imgSrc="/assets/icons/paint-icon.svg" />
                <ContributionChoiceBtn btnColor="#5e548e" btnText="Escreva um texto" btnMethod={()=>{}} imgSrc="/assets/icons/text-icon.svg" />
            </SelectionHub>
        </Fragment>
    )
}

export default CreatePost