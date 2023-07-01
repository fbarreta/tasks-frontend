import React, { useState } from "react"

export default function AddTask() {
    const newTask = {description: null};
    const [task, setTask] = useState(newTask);

    const createTask = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: task.description })
        };
        fetch("http://localhost:3000/tasks", requestOptions)
            .then(response => {
                return response.json()
            })
            .then(() => {
                setTask(newTask)
            })
    }

    function handleChange(e) {
        setTask({description: e.target.value});
    }

    return (
        <>
            <input type="text" value={task.description} onChange={handleChange} /> <button onClick={createTask}>Add</button>
        </>
    )
  }
  