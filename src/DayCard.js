import React from "react";
import ReactDOM from "react";

export default function DayCard(props) {

    const styles = {
        backgroundColor: props.color
    }

    return(
        <div>
            <header className="day-title">{props.day}</header>
            <div className="task-list" style={styles}>
                {props.tasks}
            </div>
        </div>
    )
}