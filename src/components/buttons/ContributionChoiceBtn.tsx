'use client'
import { Fragment } from "react"
import "./ContributionChoiceBtn.scss"


interface iContributionChoiceBtn {
    btnText: string
    btnColor: string
    imgSrc: string
    type: string
    btnMethod: (option: string) => void 
}

const ContributionChoiceBtn : React.FC<iContributionChoiceBtn> = ({btnText,btnColor,imgSrc,type,btnMethod})=>{
    const clickHandler = ()=>{
        btnMethod(type)
    }

    return (
        <button className="choiceBtn" style={{backgroundColor: `${btnColor}`}} onClick={clickHandler}>
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