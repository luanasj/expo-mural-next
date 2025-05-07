import "./ButtonsContainer.scss"

const ButtonsContainer = ({children}: {children: React.ReactNode})=>{
    return(
        <div className="buttonsContainer">
            {children}
        </div>
    )

}

export default ButtonsContainer

