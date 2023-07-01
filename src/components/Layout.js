import React, { useEffect, useState } from "react"
import Header from "./Header";
import UpperBar from "./UpperBar";
import TaskList from "./TaskList";

export default function Layout() {
    const [tasks, setTasks] = useState([]);
    const fetchUserData = () => {
        fetch("http://localhost:3000/tasks")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setTasks(data)
          })
      }
    
    useEffect(() => {
        fetchUserData()
    }, [])
    // const tasks = [
    //     {taskId: 1, description: 'Task 1', isDone: false},
    //     {taskId: 2, description: 'Task 2', isDone: false},
    //     {taskId: 3, description: 'Task 3', isDone: false},
    //     {taskId: 4, description: 'Task 4', isDone: true},
    //     {taskId: 5, description: 'Task 5', isDone: false},
    //     {taskId: 6, description: 'Task 6', isDone: false},
    //     {taskId: 7, description: 'Task 7', isDone: true},
    //     {taskId: 8, description: 'Task 8', isDone: false},
    //     {taskId: 9, description: 'Task 9', isDone: false},
    //     {taskId: 10, description: 'Task 10', isDone: false},
    // ];
    return (
        <>
            <Header />
            <UpperBar />
            <TaskList tasks={tasks} />
        </>
    )
  }
  