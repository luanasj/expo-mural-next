import RedirectionButton from "../buttons/RedirectionButton"
import PageTitle from "../text/PageTitle"
import "./Header.scss"

interface iHeader {
    title: string
}

const Header: React.FC<iHeader> = ({title})=>{
    return (
        <header className="header">
            <PageTitle title={title}/>
            <RedirectionButton text={"Crie um Post"} link={"/createpost"}/>
        </header>
    )
}

export default Header