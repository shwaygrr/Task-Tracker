import React from "react"
import ReactDOM from "react-dom"

export default function Task(props) {


    return(
        <div className="task-container">
            <h1>{props.id}. {props.task}</h1>
        </div>
    )
}