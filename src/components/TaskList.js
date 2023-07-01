import ToDoTasks from "./ToDoTasks"
import DoneTasks from "./DoneTasks"

export default function TaskList({ tasks }) {
    const doneTasks = tasks.filter(t => t.isDone === true);
    const todoTasks = tasks.filter(t => t.isDone === false);
    return (
        <>
            <ToDoTasks tasks={todoTasks}/>
            <DoneTasks tasks={doneTasks}/>
        </>
    )
  }
  