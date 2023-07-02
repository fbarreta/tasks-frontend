import AddTask from "./AddTask";
import Search from "./Search";

export default function UpperBar({ task, handleAdd, createTask, searchText, handleSearch }) {
    return (
        <>
        <div>
            <AddTask handleAdd={handleAdd} task={task} createTask={createTask} />
        </div>
        <div>
            <Search searchText={searchText} handleSearch={handleSearch} />
        </div>
        </>
    )
  }
  