import ContributionChoiceBtn from "../buttons/ContributionChoiceBtn.module"
import SelectionHub from "../cointainers/SelectionHub.module"
import ImageUploader from "../contributionsInterfaces/ImageUploader.module"
import styles from "./SelectionPage.module.css"

const SelectionPage : React.FC = ()=>{
    return(
        <section className={`${styles.selectionPageProportions} ${styles.selectionPageAppearance} ${styles.selectionPageAlignment}`}>
                {/* <SelectionHub message="Escolha como contribuir"> */}
                    {/* <ContributionChoiceBtn btnColor="blue" btnText="escolha uma imagem" btnMethod={()=>{}} heightPercentage={100/4} imgSrc="" /> */}
                    {/* <ContributionChoiceBtn btnColor="red" btnText="faça um desenho" btnMethod={()=>{}} heightPercentage={100/4} imgSrc="" /> */}
                    {/* <ContributionChoiceBtn btnColor="green" btnText="escreva um texto" btnMethod={()=>{}} heightPercentage={100/4} imgSrc="" /> */}
                {/* </SelectionHub> */}
                <ImageUploader/>
        </section>
    )
}

export default SelectionPage