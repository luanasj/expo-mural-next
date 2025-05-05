import "./ZoomBtn.scss"

interface ZoomBtnProperties {
    text: string
    handler: () => void
    size?: number
}

const ZoomBtn : React.FC<ZoomBtnProperties> = ({text,handler} : ZoomBtnProperties) => {
    
    const clickHandler = (): void =>{
        handler()
    }

    return (
        <button  className="zoomBtn" onClick={clickHandler}>
           
                {text}

        </button>
    )
}

export default ZoomBtn
