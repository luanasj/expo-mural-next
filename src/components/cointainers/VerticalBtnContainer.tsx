import "./VerticalBtnContainer.scss"

interface VerticalBtnContainerProps {
    children: React.ReactNode
}

const VerticalBtnContainer : React.FC<VerticalBtnContainerProps> = ({children})=>{
    return (<div className="verticalContainer">
                {children}
            </div>)
}

export default VerticalBtnContainer