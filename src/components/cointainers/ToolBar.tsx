import "./ToolBar.scss"

const ToolBar = ({children} : {children: React.ReactNode})=>{
    return (
        <div className="toolBar">
            {children}
        </div>
    )
}

export default ToolBar