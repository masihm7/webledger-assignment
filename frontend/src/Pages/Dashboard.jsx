import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate,NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";;
import Footer from "../Components/Footer";
import "./dashboard.css"
const url = import.meta.env.VITE_URL
console.log(url)



export const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${url}/show`);
        setData(res.data.results); 
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchdata();
  }, [])

  const handlesearchsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${url}/search?query=${search}`);
      setData(res.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const handlesave = async (recipe) => {
    try {
      await axios.post(`${url}/recipes`, {
        userId: user.id,
        recipeId: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      <div className="bgrrot"></div>
      <nav id="landing-nav" style={{"zIndex": "10"}}>
            <div id="mgt">
            <div id="logop">
            <h2 id="logo">RECIPESTACK</h2>
            <i class="fa-solid fa-utensils fa-xl" style={{"margin-left": "5px", "color":"gray"}}></i>
            </div>
            <form id="dashsearch" onSubmit={handlesearchsubmit}>
            <input
          type="text"
          placeholder="Search Recipes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit"><i className="fa-solid fa-magnifying-glass" style={{ color: "#ffffff" }}></i></button>
            </form>
            <div id="navbtns">
                <p className={"navlink"} style={{"border-right": '1px solid gray'}}>Magazine</p>
                <p className={"navlink"} style={{"border-right": '1px solid gray'}}>News Letters</p>
                <NavLink className={"navlink"} style={{"border-right": '1px solid gray'}} to={"/saved"}>Saved Recipes</NavLink>
                <NavLink className={"navlink"} onClick={()=>logout()} to={"/"}>Logout</NavLink>
            </div>
            </div>
        </nav>
      

      
      <div id="dashrecipeconte">
        {data.map((recipe) => (
          <div id="cards" key={recipe.id}>
            <div>
            <img src={recipe.image}/>
            </div>
            <p><strong>{recipe.title}</strong></p>
            <div>
            <button id="vdbtn" onClick={() => navigate(`/recipe/${recipe.id}`)} >View Details</button>
            <button id="sdbtn" onClick={() => {handlesave(recipe);}}><i class="fa-regular fa-bookmark fa-xl" style={{"color": "#ffffff;"}}></i></button>
            </div>
          </div>
        ))}
      </div>

      <Footer></Footer>
    </div>
  );
};
