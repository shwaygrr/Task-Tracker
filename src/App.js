import React, {useState} from "react"
import ReactDOM from "react-dom"
import DayCard from "./components/DayCard"
import TaskCard from "./components/TaskCard"
import "./styles.css"

export default function App() {

  const [newTask, setNewTask] = useState({
    taskName: "",
    day: "Monday",
    isComplete: false,
    id: 1
  });

  const [taskList, setTaskList] = useState([]);

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
          ...prevTask,
          id: prevTask.id+1,
          taskName: "",
        }
      });
    }
  }

  function completeTask(id) {
    setTaskList(prevTaskList => {
      return prevTaskList.map(prevTask => prevTask.id == id ? {...prevTask, isComplete: !prevTask.isComplete} : prevTask)
    })
  }

  const monTasks = taskList.map(task => task.day == "Monday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const tuesTasks = taskList.map(task => task.day == "Tuesday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const wedTasks = taskList.map(task => task.day == "Wednesday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const thurTasks = taskList.map(task=> task.day == "Thursday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const friTasks = taskList.map(task => task.day == "Friday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  console.log(taskList)
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
