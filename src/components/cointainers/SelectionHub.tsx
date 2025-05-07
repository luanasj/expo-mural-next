import "./SelectionHub.scss"
interface iSelectionHub {
    children: React.ReactNode
    message: string
}

const SelectionHub : React.FC<iSelectionHub> = ({children,message})=>{
    return (
        <div className="selectionHub" >
            <h5 className="message">{message}</h5>
            <div className="btnsContainer">
                {children}
            </div>
        </div>
    )
}

export default SelectionHub