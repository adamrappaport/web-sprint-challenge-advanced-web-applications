import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
 code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const history = useHistory();

  
  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

 
  const saveEdit = (e) => {
    e.preventDefault();
    // Make as put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        updateColors([...colors, res.data]);
        history.push("/bubbles/reload");
      })
      .catch((err) => console.log(err));
  };


  const deleteColor = (color) => {
    axiosWithAuth()
      .delete(`/api/colors/${color.id}`)
      .then((res) => {
        history.push("/bubbles/reload");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
         
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
@@ -56,7 +68,7 @@ const ColorList = ({ colors, updateColors }) => {
          <label>
            color name:
            <input
            
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
@@ -65,10 +77,10 @@ const ColorList = ({ colors, updateColors }) => {
          <label>
            hex code:
            <input
              onChange={e =>
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
@@ -81,7 +93,6 @@ const ColorList = ({ colors, updateColors }) => {
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};