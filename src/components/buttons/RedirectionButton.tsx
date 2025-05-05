import "./RedirectionButton.scss"

const RedirectionButton = ({text,link})=>{
    const clickHandler = ()=>{
        //Função de redirecionamento 
    }

    return(
        <button className="redirectionButton" onClick={clickHandler}>
            {text}
        </button>
    )
}

export default RedirectionButton