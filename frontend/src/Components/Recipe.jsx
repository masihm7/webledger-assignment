import React from "react";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Recipe = ({ title, image, recipeId, handleDelete }) => {
  const navigate = useNavigate();

  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({
      id: recipeId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: "grab",
    background: "#f8f8f8",
    padding: "20px",
    margin: "5px",
    borderRadius: "8px",
    boxShadow: transform ? "0px 4px 6px rgba(0,0,0,0.2)" : "none",
  };

  return (
    <div id="savedcard" ref={setNodeRef} style={style}>
      <div ref={setActivatorNodeRef} {...attributes} {...listeners} style={{ cursor: "grab" }}>
        <div id="imgdiv">
          <img src={image} />
          <p>{title}</p>
        </div>
        
      </div>


      <div id="txtdiv">
      
        <div>
          <i
            id="gtgt"
            data-no-dnd
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(recipeId);
            }}
            className="fa-solid fa-trash fa-xl"
            style={{ color: "#545454", cursor: "pointer" }}
          ></i>

          <button id="viewbtn"
            data-no-dnd
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/recipe/${recipeId}`);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
