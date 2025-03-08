import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { DndContext, closestCorners } from "@dnd-kit/core";
import { NavLink } from "react-router-dom";
import Column from "../Components/Column";
import { arrayMove } from "@dnd-kit/sortable";
// import Navigat from "../Components/Navigat";
import Footer from "../Components/Footer";
// import Navigate from "../Components/Navigate";

const url = import.meta.env.VITE_URL;

export const SavedRecipe = () => {
  const { user,logout } = useContext(AuthContext);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await axios.get(`${url}/recipes/${user.id}`);
        const sorted = res.data.sort((a, b) => a.order - b.order);
        setSaved(sorted);
      } catch (error) {
        console.error(error);
      }
    };

    fetchdata();
  }, [user.id]);

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`${url}/recipes/${user.id}/${recipeId}`);
      setSaved(saved.filter((recipe) => recipe.recipeId !== recipeId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (active.id === over.id) return;

    const oldIndex = saved.findIndex((item) => item.recipeId === active.id);
    const newIndex = saved.findIndex((item) => item.recipeId === over.id);

    const newOrder = arrayMove(saved, oldIndex, newIndex);
  setSaved(newOrder)

    const orderedRecipes = newOrder.map((item, index) => ({
      recipeId: item.recipeId,
      order: index,
    }));
    try {
      await axios.put(`${url}/recipes/update`, { userId: user.id, orderedRecipes });
      console.log("Order updated in database:", orderedRecipes);
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      <nav id="landing-nav" style={{"zIndex": "10"}}>
            <div>
            <h2>RECIPESTACK<i class="fa-solid fa-utensils fa-lg" style={{"margin-left": "10px", "color":"gray"}}></i></h2>
            <div id="navbtns">
                <p className={"navlink"} style={{"border-right": '1px solid gray'}}>Magazine</p>
                <p className={"navlink"} style={{"border-right": '1px solid gray'}}>News Letters</p>
                <NavLink className={"navlink"} style={{"border-right": '1px solid gray'}} to={"/dash"}>Dashboard</NavLink>
                <NavLink className={"navlink"} onClick={()=>logout} to={"/"}>Logout</NavLink>
            </div>
            </div>
        </nav>
        <div className="bgrrot"></div>
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column saved={saved} handleDelete={handleDelete} />
      </DndContext>
      <Footer></Footer>
    </>
  );
};
