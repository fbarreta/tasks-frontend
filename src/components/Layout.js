import React, { useEffect, useState, useRef } from "react"
import Header from "./Header";
import UpperBar from "./UpperBar";
import TaskList from "./TaskList";
import ConfirmationModal from "./ConfimationModal";

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
        <ConfirmationModal setShowModal={setShowModal} deleteAll={deleteAll} />
      ) : null}
    </div>
  )
}
