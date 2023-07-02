import React, { useEffect, useState, useRef } from "react"
import Header from "./Header";
import UpperBar from "./UpperBar";
import TaskList from "./TaskList";

export default function Layout() {
  const newTask = {description: ''};
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState(newTask);
  const [searchText, setSearchText] = useState('');
  const [showModal, setShowModal] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;  

  const doSearch = (searchText) => {
    fetch(apiUrl + "tasks/search?searchTxt="+searchText)
    .then(response => {
      return response.json()
    }).then(data => {
      setTasks(data);
    })
  }

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    refText.current = e.target.value;
    doSearch(e.target.value);
  }

  const createTask = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: task.description })
    };
    fetch(apiUrl + "tasks", requestOptions)
    .then(response => {
      return response.json()
    }).then(() => {
      setSearchText('');
      setTask({description: ''});
      fetchUserData();
    })
  }

  const completeTask = (e) => {
    const timestampStr = (new Date()).toISOString();
    const id = e.target.value;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: true, updatedAt: timestampStr })
    };
    fetch(apiUrl + "tasks/"+id, requestOptions)
    .then(response => {
      return response.json()
    }).then(() => {
      doSearch(searchText);
    })
  }

  const undoTask = (e) => {
    const timestampStr = (new Date()).toISOString();
    const id = e.target.value;
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDone: false, updatedAt: timestampStr })
    };
    fetch(apiUrl + "tasks/"+id, requestOptions)
    .then(response => {
        return response.json()
    })
    .then(() => {
      doSearch(searchText);
    })
  }

  const showDeleteModal = () => {
    setShowModal(true);
  }

  const deleteAll = () => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    fetch(apiUrl + "tasks/", requestOptions)
    .then(response => {
        return response.json()
    })
    .then(() => {
      setShowModal(false);
      setSearchText('');
      setTask({description: ''});
      fetchUserData();
    })
  }

  const handleAdd = (e) => {
    setTask({description: e.target.value});
  }

  const fetchUserData = () => {
    fetch(apiUrl + "tasks")
    .then(response => {
      return response.json()
    }).then(data => {
      setTasks(data)
    })
  }
    
  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const refText = useRef('');

  useEffect(() => {
    const intervalCall = setInterval(() => {
      if (refText.current === '') {
        fetchUserData();
        // eslint-disable-next-line
      } else {
        doSearch(refText.current);
        // eslint-disable-next-line
      }
    }, 60000);
    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg grid grid-cols-2 gap-2 border border-gray-500 p-2">
      <Header deleteAll={showDeleteModal} />
      <UpperBar handleAdd={handleAdd} task={task} createTask={createTask} searchText={searchText} handleSearch={handleSearch} />
      <TaskList tasks={tasks} completeTask={completeTask} undoTask={undoTask} />
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border border-gray-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto">
                  <p>
                      Clicking on delete will clear <span className="text-red-500 font-bold uppercase">all</span> your tasks.
                  </p>
                  <p>
                      Are you sure ?
                  </p>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-red-500 active:bg-red-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => deleteAll()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}
