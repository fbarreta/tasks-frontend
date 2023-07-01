import React, { useState } from "react"

export default function DoneTasks({ tasks }) {
    const handleChange = (e) => {
        const id = e.target.value;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: false })
        };
        fetch("http://localhost:3000/tasks/"+id, requestOptions)
            .then(response => {
                return response.json()
            })
            .then(() => {
                // setToDoTasks(tasks.filter(t => t.taskId !== parseInt(id)))
            })
    }

    return (
        <>
            Done
            <ul>
            {
                tasks.map(t => {
                    return(
                    <li key={t.taskId}><input checked type="checkbox" value={t.taskId} onClick={handleChange}/>{t.description}</li>
                    )
                })
            }
            </ul>
        </>
    )
  }
  