import './FunctionalBtn.scss'

interface iFunctionalBtn {
    color:string
    bg_color:string
    label:string
    clickHandler: ()=> void
    disabled?: boolean  
}

const FunctionalBtn = ({color,bg_color,label,clickHandler,disabled=false} : iFunctionalBtn)=>{
    return (
        <button className='functionalBtn' disabled={disabled} onClick={clickHandler} style={{color: `${color}`,backgroundColor:`${bg_color}`}}> 
            {label}
        </button> 
    )
}

export default FunctionalBtn