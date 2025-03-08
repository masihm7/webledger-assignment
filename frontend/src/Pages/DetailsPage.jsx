import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import Footer from "../Components/Footer";
import { AuthContext } from "../context/AuthContext";
const url = import.meta.env.VITE_URL



export const DetailsPage = () => {
  const { logout } = useContext(AuthContext);
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `${url}/show/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.log(error)
      }
    };
    fetchdata();
  }, [id]);

  return (
    <>
    <nav id="landing-nav" style={{"zIndex": "10"}}>
    <div id="rtr">
      <div id="dlogo">
      <h2>RECIPESTACK</h2>
      <i class="fa-solid fa-utensils fa-lg" style={{"margin-left": "10px", "color":"gray"}}></i>
      </div>
    
    <div id="navbtns">
        <p className={"navlink"} style={{"border-right": '1px solid gray'}}>Magazine</p>
        <p className={"navlink"} style={{"border-right": '1px solid gray'}}>News Letters</p>
        <NavLink className={"navlink"} style={{"border-right": '1px solid gray'}} to={"/saved"}>Saved Recipes</NavLink>
        <NavLink className={"navlink"} style={{"border-right": '1px solid gray'}} to={"/dash"}>Dashborad</NavLink>
        <NavLink className={"navlink"} onClick={()=>logout} to={"/"}>Logout</NavLink>
    </div>
    </div>
</nav>
<div className="bgrrot"></div>
<div id="details-container">
      {!recipe ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="recipe-container">
          <h1 className="recipe-title">{recipe.title}</h1>
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          

          <div className="info-section">
            <p><strong>Ready in:</strong> {recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {recipe.servings}</p>
            <p>
              <strong>Source:</strong>{" "}
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer">
                {recipe.sourceName}
              </a>
            </p>
          </div>

          <p dangerouslySetInnerHTML={{ __html: recipe.summary }} />


          <h3>Ingredients</h3>
          <ul className="ingredients-list">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                <img src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`} alt={ingredient.name} />
                {ingredient.amount} {ingredient.unit} - {ingredient.name}
              </li>
            ))}
          </ul>

          <h3>Instructions</h3>
          <ul className="instructions-list">
            {recipe.analyzedInstructions.length > 0 ? (
              recipe.analyzedInstructions[0].steps.map((step) => (
                <li key={step.number}>
                  <strong>Step {step.number}:</strong> {step.step}
                </li>
              ))
            ) : (
              <p>No instructions available.</p>
            )}
          </ul>

          <h3>Health & Nutrition</h3>
          <div className="info-section">
            <p><strong>Weight Watchers Points:</strong> {recipe.weightWatcherSmartPoints}</p>
            <p><strong>Health Score:</strong> {recipe.healthScore}</p>
            <p><strong>Price per Serving:</strong> ${recipe.pricePerServing / 100}</p>
          </div>

          <h3>Dietary Information</h3>
          <ul className="list">
            <li>Vegetarian: {recipe.vegetarian ? "Yes" : "No"}</li>
            <li>Vegan: {recipe.vegan ? "Yes" : "No"}</li>
            <li>Gluten-Free: {recipe.glutenFree ? "Yes" : "No"}</li>
            <li>Dairy-Free: {recipe.dairyFree ? "Yes" : "No"}</li>
            <li>Healthy: {recipe.veryHealthy ? "Yes" : "No"}</li>
            <li>Cheap: {recipe.cheap ? "Yes" : "No"}</li>
            <li>Popular: {recipe.veryPopular ? "Yes" : "No"}</li>
            <li>Sustainable: {recipe.sustainable ? "Yes" : "No"}</li>
            <li>Low FODMAP: {recipe.lowFodmap ? "Yes" : "No"}</li>
          </ul>

          

          
          

        </div>
      )}
    </div>
      <Footer/>
    </>
  );
};

