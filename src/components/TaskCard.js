import React from "react"
import ReactDOM from "react-dom"

export default function TaskCard(props) {
    const cardClasses = props.isComplete ? "task-card-complete" : "task-card" //chatGPT idea because const styles had too much precedence
    
    return (
        <div className={cardClasses} onClick={props.completeTask}>
            <h1 className="task">{props.task}</h1>
        </div>
    )
}