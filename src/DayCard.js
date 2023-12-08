import React from "react";
import ReactDOM from "react";


export default function DayCard(props) {

    const dayStyles = {
        backgroundColor: props.dayBackgroundColor
    }

    const taskListStyles = {
        backgroundColor: props.tasksBackgroundcolor
    }

    return(
        <article>
            <h2 className="day-title" style={dayStyles}>{props.day}</h2>
            <div className="tasks-list-container" style={taskListStyles}>
                {props.tasks}
            </div>
        </article>
    )
}