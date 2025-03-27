import styles from "./SelectionHub.module.css"
interface iSelectionHub {
    children: React.ReactNode
    message: string
}

const SelectionHub : React.FC<iSelectionHub> = ({children,message})=>{
    return (
        <div className={`${styles.selectionHubProportions} ${styles.selectionHubAppearance}`} >
            <h5 className={`${styles.selectionHubTitle}`}>{message}</h5>
            <div className={`${styles.selectionHubBtnsContainer}`}>
                {children}
            </div>
        </div>
    )
}

export default SelectionHub