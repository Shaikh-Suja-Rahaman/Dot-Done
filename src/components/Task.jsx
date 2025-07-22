import React, { useState } from 'react'

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if(newTask.trim() === ""){
      return;
    } else {
      setTasks([...tasks, {text: newTask, completed: false}]);
      setNewTask('');
    }
  }

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  return (
    <div className="bg-zinc-900 text-zinc-100 rounded-xl shadow-lg p-8 max-w-lg mx-auto mt-8 flex flex-col min-h-[400px]">
      <h1 className="text-2xl font-bold text-green-400 mb-6 text-center">To-Do List</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter your Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-green-400 transition"
        />
        <button onClick={handleAddTask} className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition">Add</button>
      </div>
      <ul className="flex-1 space-y-3">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex items-center bg-zinc-800 rounded-lg px-4 py-3 border border-zinc-700 shadow-sm transition ${task.completed ? 'opacity-60' : ''}`}
          >
            <label className="flex items-center flex-1 cursor-pointer">
              <input
                type='checkbox'
                checked={task.completed}
                onChange={()=>handleToggleComplete(index)}
                className="accent-green-400 w-5 h-5 mr-3"
              />
              <span className={`text-base font-medium ${task.completed ? 'line-through text-zinc-400' : ''}`}>{task.text}</span>
            </label>
            <button
              onClick={()=>handleDeleteTask(index)}
              className="ml-4 text-red-400 hover:text-red-600 text-xl font-bold transition"
              aria-label="Delete task"
            >
              ×
            </button>
          </li>
        )).reverse()}
      </ul>
    </div>
  )
}

export default Task