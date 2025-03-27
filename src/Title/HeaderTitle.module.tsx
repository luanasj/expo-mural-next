import styles from "./HeaderTitle.module.css"

interface iHeaderTitle {
    title: string
}

const HeaderTitle: React.FC<iHeaderTitle> = ({title})=>{
    return (
        <div className={`${styles.headerProportions} ${styles.headerAlignment}`}>
            <h3 className={`${styles.headerText}`}>{title}</h3>
        </div>
    )
}

export default HeaderTitle