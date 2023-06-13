import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../AuthContext";
import { todos } from "../mockData";
import LogoutButton from "./LogoutButton";
import jwt from "jsonwebtoken";
import { Check, Edit, Trash } from "lucide-react";
import InputContainer from "./InputContainer";

export const getListFromLocalStorage = () => {
  const list = JSON.parse(window?.localStorage?.getItem("todos"));
  if (list) {
    return list;
  }

  return [];
};

export const setListInLocalStorage = (list) => {
  localStorage.setItem("todos", JSON.stringify(list));
};

const DashboardPage: React.FC = () => {
  // const { user, setUser } = useContext(AuthContext);
  // const [newTodo, setNewTodo] = useState("");
  // const initialTodos = JSON.parse(localStorage.getItem("todos"));
  // const [allTodos, setAllTodos] = useState(initialTodos || []);
  const { user, setUser } = useContext(AuthContext);
  const [newTodo, setNewTodo] = useState("");

  const [todos, setTodos] = useState(getListFromLocalStorage());
  const [focusedTodo, setFocusedTodo] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken: any = jwt.decode(token, { complete: true });
    if (decodedToken) {
      // Access the data from the decoded token
      const name = decodedToken.payload.data.name;
      const username = decodedToken.payload.data.username;
      const password = decodedToken.payload.data.password;
      const id = decodedToken.payload.data.id;
      const user = {
        id,
        username,
        name,
        password
      };

      setUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos.length]);

  const handleAddTodo = (data) => {
    // Generate a unique ID for the new todo (you can use a library like `uuid` for this)
    const newTodoId = todos.length + 1;
    const todo = { id: newTodoId, userId: user!.id, title: data.value };
    // Add the new todo to the list of todos
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleDelete = (id) => {
    const newTodoList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodoList);
    setListInLocalStorage(newTodoList);
  };

  const handleUpdate = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    setFocusedTodo(todoToUpdate);
  };

  const handleComplete = (id) => {
    const updatedTodoList = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          done: todo.done ? false : true
        };
      }

      return todo;
    });

    setTodos(updatedTodoList);
    setListInLocalStorage(updatedTodoList);
  };

  const updateTodo = (updatedTodo) => {
    const updatedTodoList = todos.map((todo) => {
      if (todo.id === updatedTodo.id) {
        return {
          ...updatedTodo,
          userId: todo.userId // Preserve the userId property
        };
      }

      return todo;
    });

    setTodos(updatedTodoList);
    setListInLocalStorage(updatedTodoList);
    setFocusedTodo({});
  };

  return (
    <div>
      {user && (
        <div className="todosContainer">
          <h2>Welcome, {user.name}!</h2>
          <h1>PLAN YOUR DAY</h1>
          <InputContainer addTodo={handleAddTodo} />

          {todos
            .filter((todo) => todo.userId === user.id)
            .map((todo) => {
              return (
                <div className="todo updateContainer" key={todo.id}>
                  {focusedTodo.id === todo.id ? (
                    <InputContainer
                      updateTodo={updateTodo}
                      todo={focusedTodo}
                      isEditing={true}
                    />
                  ) : (
                    <>
                      <span
                        className={todo?.done ? "done todoItem" : "todoItem"}
                      >
                        {todo.title}
                      </span>

                      <div className="icons">
                        <Trash
                          className="icon trash-icon"
                          color="red"
                          onClick={() => handleDelete(todo.id)}
                        />
                        <Edit
                          className="icon edit-icon"
                          color="yellow"
                          onClick={() => handleUpdate(todo.id)}
                        />
                        <Check
                          className="icon"
                          color="green"
                          onClick={() => handleComplete(todo.id)}
                        />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
