import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import ".Login.css"

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (!user) {
        alert("no user returned");
      }
      navigate("/dash");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
            <h2 style={{"margin-bottom":"20px"}}>Login your account</h2>
          <form onSubmit={handlesubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
          <div>
          <Link className="navlink" to="/signup">dont have an account?</Link>
        </div>
        </div>
        
      </div>
    </>
  );
};
