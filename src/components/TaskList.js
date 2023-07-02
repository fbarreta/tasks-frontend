import ToDoTasks from "./ToDoTasks"
import DoneTasks from "./DoneTasks"

export default function TaskList({ tasks, completeTask, undoTask }) {
    const sortByUpdatedDesc = (a, b) => {
        if ( a.updatedAt < b.updatedAt ){
            return 1;
          }
          if ( a.updatedAt > b.updatedAt ){
            return -1;
          }
          return 0;
    }

    const sortAlpha = (a, b) => {
        if ( a.description < b.description ){
            return -1;
          }
          if ( a.description > b.description ){
            return 1;
          }
          return 0;
    }
    const todoTasks = tasks ? tasks.filter(t => t.isDone === false).sort(sortAlpha) : [];
    const doneTasks = tasks ? tasks.filter(t => t.isDone === true).sort(sortByUpdatedDesc).sort(sortAlpha).slice(0, 10) : [];    
    return (
        <>
            <div>
                <ToDoTasks tasks={todoTasks} completeTask={completeTask}/>
            </div>
            <div>
                <DoneTasks tasks={doneTasks} undoTask={undoTask} />
            </div>
        </>
    )
  }
  