import React from "react"

export default function TaskCard(props) {
    const cardClasses = props.isComplete ? "task-card-complete" : "task-card" //chatGPT idea because const styles had too much precedence
    
    return (
        <div className={cardClasses} onClick={props.completeTask}>
            <p className="task">{props.task}</p>
        </div>
    )
}