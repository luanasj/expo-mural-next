import "./AspectRange.scss"

interface iAspectRange {
    label: string
    min: number
    max: number
    changeHandler: (evt: React.FormEvent) => void

} 

const AspectRange = ({label,min,max,changeHandler} : iAspectRange)=>{
    return ( 
    <div className="aspect">
        <label htmlFor="aspect">{`${label}: `}</label>
        <input type="range" name="aspect" min={min} max={max} onChange={changeHandler}/>
    </div>)
}

export default AspectRange