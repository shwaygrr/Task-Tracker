import React, {useState} from "react"
import ReactDOM from "react-dom"
import Task from "./Task"
import DayCard from "./DayCard"
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
      <header className="app-nav">
        <h1 className="header-title">TASK TRACKER</h1>
        <div className="header-view-container">
          <label className="view-label" for="filter" >VIEW: </label>
          <select id="filter" className="header-view-dropdown">
            <option>ALL TASKS</option>
            <option>COMPLETED</option>
            <option>INCOMPLETE</option>
          </select>
        </div>
      </header>

      <form className="new-task-form" onSubmit={addTask}>
        <div className="form-container">
          <label className="new-task-label day" for="day-select">day:</label>
          <select className="day-select form-input" id="day-select">
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            {/* <option>Saturday</option>
            <option>SUnday</option> */}
          </select>
        </div>
        <div className="form-container">
          <label className="new-task-label task" for="new-task">task:</label>
          <input className="form-input" id="new-task" placeholder="New Task" name="new-task" onChange={handleChange} value={newTask}></input>
        </div>
        <button className="add-task">add task</button>
      </form>
      <DayCard day={"Monday"} color="blue" tasks={taskList}/>


    </div>
  );
}
