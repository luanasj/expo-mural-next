import styles from "./VerticalBtnContainer.module.css"

interface VerticalBtnContainerProps {
    children: React.ReactNode
}

const VerticalBtnContainer : React.FC<VerticalBtnContainerProps> = ({children})=>{
    return <div className={`${styles.containerAlignment}`}>{children}</div>
}

export default VerticalBtnContainer