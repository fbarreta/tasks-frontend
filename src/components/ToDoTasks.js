import React, { useState } from "react"

export default function ToDoTasks({ tasks }) {
    const [toDoTasks, setToDoTasks] = useState(tasks);
    const handleChange = (e) => {
        const id = e.target.value;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: true })
        };
        fetch("http://localhost:3000/tasks/"+id, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(() => {
                setToDoTasks(tasks.filter(t => t.taskId !== parseInt(id)))
            })
    }

    return (
        <>
            To Do
            <ul>
            {
                tasks.map(t => {
                    return(
                    <li key={t.taskId}>{t.description} <input type="checkbox" value={t.taskId} onClick={handleChange} /></li>
                    )
                })
            }
            </ul>
        </>
    )
  }
  