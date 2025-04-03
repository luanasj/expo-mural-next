import styles from "./Header.module.css"

interface iHeader {
    title: string
}

const Header: React.FC<iHeader> = ({title})=>{
    return (
        <header className={`${styles.headerProportions} ${styles.headerAlignment}`}>
            <h3 className={`${styles.headerText}`}>{title}</h3>
        </header>
    )
}

export default Header