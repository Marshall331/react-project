import { Navigate } from "react-router-dom"

const AuthGard = ({children}) => {
    let logged = false
    
    if(!logged){
        return <Navigate to={"/login"}></Navigate>
    }

    return children
}

export default AuthGard