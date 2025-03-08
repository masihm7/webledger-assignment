import React from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Recipe from "./Recipe";

const Column = ({ saved, handleDelete }) => {
  return (
    <div id="savedcontainer">
      <h2>Saved Recipes</h2>
      <SortableContext items={saved.map((r) => r.recipeId)} strategy={verticalListSortingStrategy}>
        {saved.length > 0 ? (
          saved.map((recipe) => (
            <Recipe
              key={recipe.recipeId}
              title={recipe.title}
              image={recipe.image}
              recipeId={recipe.recipeId}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p>No saved recipes found.</p>
        )}
      </SortableContext>
    </div>
  );
};

export default Column;
