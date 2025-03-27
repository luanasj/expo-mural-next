import styles from "./ZoomBtn.module.css"

interface ZoomBtnProperties {
    text: string
    op: () => void
    size?: number
}

const ZoomBtn : React.FC<ZoomBtnProperties> = ({text,op} : ZoomBtnProperties) => {
    
    // const zoomBtnHandler = (): void =>{
    //     op()
    // }

    return (
        <button  className={`${styles.ZoomBtnAlignment} ${styles.ZoomBtnAppearence}`} onClick={op}>
            {text}
        </button>
    )
}

export default ZoomBtn
