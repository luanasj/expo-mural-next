import './FunctionalBtn.scss'

interface iFunctionalBtn {
    color:string
    bg_color:string
    label:string
    clickHandler: ()=> void  
}

const FunctionalBtn = ({color,bg_color,label,clickHandler} : iFunctionalBtn)=>{
    return (
        <button className='functionalBtn' onClick={clickHandler} style={{color: `${color}`,backgroundColor:`${bg_color}`}}> 
            {label}
        </button> 
    )
}

export default FunctionalBtn