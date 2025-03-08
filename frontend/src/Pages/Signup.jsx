

import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";
import "./login.css"

export const Signup = () => {
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    

    const handlesubmit = async (e) => {
        e.preventDefault();
        await signup(username,email,password);
        navigate("/login")
    };

    return (
        <div id="logincontainer">
            <div>
            </div>
            <div>
          <h2 style={{"color":"rgb(239, 79, 37)"}}>
            RECIPESTACK
            <i
              class="fa-solid fa-utensils fa-lg"
              style={{ "margin-left": "10px", color: "gray" }}
            ></i>
          </h2>
        </div>
            <div>
            <h2 style={{"margin-bottom":"20px"}}> Create an account</h2>
            <form onSubmit={handlesubmit}>
                <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} required />
                <input type="email"  placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
                <button type="submit">Signup</button>
            </form>
                <Link to="/login" className="navlink">already have an account</Link>
            </div>
        </div>
    );
};
 
