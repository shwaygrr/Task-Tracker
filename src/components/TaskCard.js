import React from "react"
import ReactDOM from "react-dom"

export default function TaskCard(props) {
    return (
        <div className="task-card">
            <h1 className="task">{props.id}. {props.task}</h1>
        </div>
    )
}