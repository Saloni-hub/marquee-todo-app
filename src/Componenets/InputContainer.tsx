import React, { useState, useEffect } from "react";

const InputContainer = ({ addTodo, updateTodo, todo, isEditing = false }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (todo && todo.title) {
      setValue(todo.title);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (todo && todo.id) {
      updateTodo({ title: value, id: todo.id });
    } else {
      addTodo({ value, id: new Date().getTime() });
    }

    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="inputForm">
      {isEditing ? (
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="inputbox"
          placeholder="Write something..."
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="inputbox"
          placeholder="Write something..."
        />
      )}

      <button className="submitBtn" type="submit">
        {todo ? "Update" : "Submit"}
      </button>
    </form>
  );
};

export default InputContainer;
