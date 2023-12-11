import React, {useState} from "react"
import ReactDOM from "react-dom"
import DayCard from "./components/DayCard"
import TaskCard from "./components/TaskCard"
import "./styles.css"

export default function App() {

  const [newTask, setNewTask] = useState({
    taskName: "",
    day: "Monday",
    isCompleted: false,
  });

  const [taskList, setTaskList] = useState([]);

  // const [monTaskList, setMonTaskList] = useState([]);
  // const [tuestaskList, setTuesTaskList] = useState([]);
  // const [wedTaskList, setWedTaskList] = useState([]);
  // const [thurTaskList, setThurTaskList] = useState([]);
  // const [friTaskList, setFriTaskList] = React.useState([]);


  function handleTaskNameChange(event) {
    setNewTask(prevTask => {
      return {
        ...prevTask,
        taskName: event.target.value
      }
    })
  }

  function handleDayChange(event) {
    setNewTask(prevTask => {
      return {
        ...prevTask,
        day: event.target.value
      }
    })
  }

  function addTask(event) {
    event.preventDefault(); //enter button work without relaoding
    if (newTask.taskName.trim().length == 0){
      alert("Empty task");
      console.log("Empty string");
    } 
    else {
      setTaskList(prevTaskList => [...prevTaskList, newTask]);
      setNewTask(prevTask => {
        return {  
          taskName: "",
          day: "Monday",
          isCompleted: false,
        }
      });
    }
  }

  const monTasks = taskList.map((task, index) => task.day == "Monday" && <TaskCard key={index} task={task.taskName}/>)
  const tuesTasks = taskList.map((task, index) => task.day == "Tuesday" && <TaskCard key={index} task={task.taskName}/>)
  const wedTasks = taskList.map((task, index) => task.day == "Wednesday" && <TaskCard key={index} task={task.taskName}/>)
  const thurTasks = taskList.map((task, index) => task.day == "Thursday" && <TaskCard key={index} task={task.taskName}/>)
  const friTasks = taskList.map((task, index) => task.day == "Friday" && <TaskCard key={index} task={task.taskName}/>)

  return (
    <div className="App">

      <header className="app-nav">
        <h1 className="header-title">TASK TRACKER</h1>
        <div className="header-view-container">
          <label className="view-label" htmlFor="filter" >VIEW: </label>
          <select id="filter" className="header-view-dropdown" name="filter">
            <option>ALL TASKS</option>
            <option>COMPLETED</option>
            <option>INCOMPLETE</option>
          </select>
        </div>
      </header>

      <form className="new-task-form" onSubmit={addTask}>
        <div className="form-container">
          <label className="new-task-label day" htmlFor="day-select">day:</label>
          <select className="day-select form-input" id="day-select" onChange={handleDayChange}>
            <option defaultValue>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            {/* <option>Saturday</option>
            <option>SUnday</option> */}
          </select>
        </div>
        <div className="form-container">
          <label className="new-task-label" htmlFor="new-task">task:</label>
          <input className="form-input" id="new-task" placeholder="New Task" name="new-task" onChange={handleTaskNameChange} value={newTask.taskName}></input>
        </div>
        <button className="add-task">add task</button>
      </form>
      
      <main>
        <DayCard day={"Monday"} dayBackgroundColor="#F9614E" tasksBackgroundcolor="#FDD3CB" tasks={monTasks}/>
        <DayCard day={"Tuesday"} dayBackgroundColor="#A8CBFD" tasksBackgroundcolor="#EAEEF6" tasks={tuesTasks}/>
        <DayCard day={"Wednesday"} dayBackgroundColor="#FDD875" tasksBackgroundcolor="#FEF2CE" tasks={wedTasks}/>
        <DayCard day={"Thursday"} dayBackgroundColor="#E3AFE8" tasksBackgroundcolor="#F8E7F1" tasks={thurTasks}/>
        <DayCard day={"Friday"} dayBackgroundColor="#FF914D" tasksBackgroundcolor="#FFE0CD" tasks={friTasks}/>
      </main>
    </div>
  );
}
