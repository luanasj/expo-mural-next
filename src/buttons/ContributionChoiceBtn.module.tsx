import styles from "./ContributionChoiceBtn.module.css"

interface iContributionChoiceBtn {
    btnText: string
    btnColor: string
    imgSrc: string
    heightPercentage: number 
    btnMethod: () => void 
}

const ContributionChoiceBtn : React.FC<iContributionChoiceBtn> = ({btnText,btnColor,heightPercentage,imgSrc,btnMethod})=>{
    return (
        <button className={`${styles.choiceBtnProportions} ${styles.choiceBtnAlignment} ${styles.choiceBtnAppearance}`} style={{backgroundColor: `${btnColor}`, height: `${heightPercentage}%`}} onClick={btnMethod}>
            <span>{btnText}</span>
            <img src={`${imgSrc}`} alt="" />
        </button>
    )
}


export default ContributionChoiceBtn