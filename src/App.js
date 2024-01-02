import React, {useEffect, useState} from "react"
import { nanoid } from 'nanoid'
import { onSnapshot } from "firebase/firestore"
import { tasksCollection } from "./firebase"
import DayCard from "./components/DayCard"
import TaskCard from "./components/TaskCard"
import "./styles.css"

export default function App() {
  
  //form tasks
  const [newTask, setNewTask] = useState({
    taskName: "",
    day: "Monday",
    isComplete: false,
    id: nanoid()
  });

  //task list object
  const [taskLists, setTaskLists] = useState({
    allTasks: [],
    selectedList: "ALL TASKS",
    filteredList: []
  })

  //filter functions
  function filterList(list, filter) {
      if (filter === "COMPLETED") {
        return list.filter(task => task.isComplete);
      } else if (filter === "INCOMPLETE") {
        return list.filter(task => !task.isComplete);
      } else {
        return list;
      }
  }

  function handleFilterChange(event) {
    setTaskLists(prevTaskLists => {
      return {
        ...prevTaskLists,
        selectedList: event.target.value,
        filteredList: filterList(prevTaskLists.allTasks, event.target.value)
      }
    })
  }

  //new task event handler
  function handleNewTaskChange(event) {
    const {name, value} = event.target

    setNewTask(prevTask => ({
      ...prevTask,
      [name]: value
    }))
  }


  //edit list functions

  useEffect(() => {
    const unsubscribe = onSnapshot(tasksCollection, snapshot => {
      //sync up  local tasks array with the snapshot data
      console.log("yayyyyyyy")
    })

    return unsubscribe
  }, [taskLists])

  function addTask(event) {
    event.preventDefault(); //enter button work without relaoding
    if (newTask.taskName.trim().length === 0){
      alert("Empty task");
      console.log("Empty string");
    } 
    else {
      setTaskLists(prevTaskLists => {
        const updatedAllTasks = [...prevTaskLists.allTasks, newTask]
        const updatedFilteredList = filterList(updatedAllTasks, taskLists.selectedList) 
        return {
          ...prevTaskLists,
          allTasks: updatedAllTasks,
          filteredList: updatedFilteredList
        }
      });

      //reset form
      setNewTask(prevTask => {
        return {
          ...prevTask,
          id: nanoid(),
          taskName: "",
        }
      });
    }
    console.log(newTask.id)
  }

  function completeTask(id) { 
    setTaskLists(prevTaskLists => {
      const updatedallTasks = prevTaskLists.allTasks.map(prevTask => prevTask.id === id ? {...prevTask, isComplete: !prevTask.isComplete} : prevTask);
      const updatedSelectedList = filterList(updatedallTasks, taskLists.selectedList);
      return {
        ...prevTaskLists,
        allTasks: updatedallTasks,
        filteredList: updatedSelectedList
      }
    })
  }

  const monTasks = taskLists.filteredList.map(task => task.day === "Monday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const tuesTasks = taskLists.filteredList.map(task => task.day === "Tuesday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const wedTasks = taskLists.filteredList.map(task => task.day === "Wednesday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const thurTasks = taskLists.filteredList.map(task=> task.day === "Thursday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  const friTasks = taskLists.filteredList.map(task => task.day === "Friday" && <TaskCard key={task.id} task={task.taskName} isComplete={task.isComplete} completeTask={() => completeTask(task.id)}/>)

  return (
    <div className="App">

      <header className="app-nav">
        <h1 className="header-title">TASK TRACKER</h1>
        <div className="header-view-container">
          <label className="view-label" htmlFor="filter" >VIEW: </label>
          <select id="filter" className="header-view-dropdown" name="filter" onChange={handleFilterChange}>
            <option>ALL TASKS</option>
            <option>COMPLETED</option>
            <option>INCOMPLETE</option>
          </select>
        </div>
      </header>

      <form className="new-task-form" onSubmit={addTask}>
        <div className="form-container">
          <label className="new-task-label day" htmlFor="day-select">day:</label>
          <select className="day-select form-input" id="day-select" name="day" onChange={handleNewTaskChange} value={newTask.day}>
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
          <input className="form-input" id="new-task" placeholder="New Task" name="taskName" onChange={handleNewTaskChange} value={newTask.taskName}></input>
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
