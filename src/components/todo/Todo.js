import React, { useEffect, useRef, useState } from "react";
import "./Todo.css";
import { db } from "../../firebaseConfig/firebase";
import {
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
function Todo() {
  const inputRef = useRef();
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  // !dispaly data from the firestore
  const getTodoList = async () => {
    try {
      // !read the data from fireabse store
      const data = await getDocs(todosCollectionRef);
      const filterdData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // ! set todo list
      setTodos(filterdData);
      inputRef.current.value = "";
      console.log(filterdData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);
  console.log(todos);
  //   !add todos
  // !get reference(where to store)
  const todosCollectionRef = collection(db, "Todos");
  const addTodo = async () => {
    try {
      await addDoc(todosCollectionRef, {
        Todo: todo,
      });
      getTodoList();
    } catch (error) {
      console.error(error);
    }
  };

  //!delete todo item

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "Todos", id));
      setTodos(todos.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="todo">
      <h2>Todo app</h2>
      <div className="todo-container">
        <div className="input-group">
          <input
            type="text"
            ref={inputRef}
            placeholder="type here..."
            onChange={(e) => setTodo(e.target.value)}
          ></input>
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos?.map((todo) => {
            return (
              <div className="item">
                <li onClick={(e) => e.target.classList.toggle("lineThrough")}>
                  {todo.Todo}
                </li>
                <button onClick={() => handleDelete(todo.id)}>
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
