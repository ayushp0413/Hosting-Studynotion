// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)


  console.log("Childer: ", children.type?.name);

  if (token === null) {
    return children
  } 
  else {
    return <Navigate to="/dashboard/myProfile" />
  }
}

export default OpenRoute