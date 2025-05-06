import "./PageTitle.scss"

interface iPageTitle{
    title: string
}

const PageTitle : React.FC<iPageTitle> = ({title}: iPageTitle)=>{
    return <h3 className="pageTitle">{title}</h3>
}

export default PageTitle
