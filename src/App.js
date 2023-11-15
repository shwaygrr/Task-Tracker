import React, {useState} from "react"
import ReactDOM from "react-dom"
import Task from "./Task"
import "./styles.css"

export default function App() {

  const [taskList, setTaskList] = React.useState([]);
  const [newTask, setNewTask] = React.useState("");

  function handleChange(event) {
    setNewTask(event.target.value)
  }

  function addTask(event) {
    event.preventDefault(); //enter button work without relaoding

    if (newTask.trim().length == 0){
      console.log("Empty string");
    } 
    else {
      setTaskList(prevTaskList => [...prevTaskList, newTask]);
      setNewTask("");
    }
  }

  const tasks = taskList.map((task, index) => <Task key={index} id={index+1} task={task}/>)

  return (
    <div className="App">
      <form className="new-task-form" onSubmit={addTask}>
        <input placeholder="New Task" name="new-task" onChange={handleChange} value={newTask}></input>
        <button className="add-task">+</button>
      </form>
      <div className="tasks">
        {tasks}
      </div>
    </div>
  );
}
