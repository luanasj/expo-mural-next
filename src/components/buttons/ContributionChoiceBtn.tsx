'use client'
import { Fragment } from "react"
import "./ContributionChoiceBtn.scss"


interface iContributionChoiceBtn {
    btnText: string
    btnColor: string
    imgSrc: string
    btnMethod: () => void 
}

const ContributionChoiceBtn : React.FC<iContributionChoiceBtn> = ({btnText,btnColor,imgSrc,btnMethod})=>{
    return (
        <button className="choiceBtn" style={{backgroundColor: `${btnColor}`}} onClick={btnMethod}>
            <div>
                <span> 
                    {btnText.split(" ").map((word,index)=>(
                        <Fragment key={index}>
                            {word} <br />
                        </Fragment>
                    ))}
                </span>
                <img src={`${imgSrc}`} alt="" />
            </div>
        </button>
    )
}


export default ContributionChoiceBtn