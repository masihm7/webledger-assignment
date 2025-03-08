import { useContext } from "react";
import { AuthContext } from "./AuthContext";



export const Private=({ children })=> {
    const { user } = useContext(AuthContext);
    return user ? children : <Navigate to="/" />;
  }