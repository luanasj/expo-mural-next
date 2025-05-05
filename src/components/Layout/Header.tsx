import RedirectionButton from "../buttons/RedirectionButton"
import "./Header.scss"

interface iHeader {
    title: string
}

const Header: React.FC<iHeader> = ({title})=>{
    return (
        <header className="header">
            <h3>{title}</h3>
            <RedirectionButton text={"Crie um Post"} link={"#"}/>
        </header>
    )
}

export default Header