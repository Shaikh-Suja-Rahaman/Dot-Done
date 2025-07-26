import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { FaGripVertical, FaCheck, FaTrash } from 'react-icons/fa';

export default function TaskList() {
  const { selectedGroup, tasks, addTask, toggleTask, deleteTask } = useTodo();
  const [taskTitle, setTaskTitle] = useState("");

  if (!selectedGroup) {
    return (
      <div className="bg-zinc-900 text-zinc-100 rounded-xl p-8 text-center shadow-lg mt-8 max-w-md mx-auto">
        Select a group to see tasks.
      </div>
    );
  }

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(taskTitle.trim());
      setTaskTitle("");
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <header className="mb-8 mt-4 text-center">
        <h2 className="text-3xl font-bold tracking-widest text-white mb-2">{selectedGroup.name.toUpperCase()} <span className="text-green-400">TASKS</span></h2>
        <div className="w-48 h-1 bg-green-400 mx-auto rounded-full mb-2" />
      </header>
      <form onSubmit={handleAddTask} className="flex w-full max-w-2xl mb-8 gap-4">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="ADD YOUR TASK"
          className="flex-1 px-6 py-3 rounded-full bg-zinc-700 text-zinc-200 border-none focus:outline-none focus:ring-2 focus:ring-green-400 text-lg tracking-wide shadow"
        />
        <button className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full shadow transition text-lg">ADD</button>
      </form>
      <ul className="w-full max-w-2xl flex flex-col gap-5">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center rounded-full px-6 py-4 shadow-md transition bg-zinc-700 ${task.completed ? 'opacity-60' : ''}`}
          >
            <FaGripVertical className="mr-4 text-zinc-400" />
            <span className={`flex-1 text-lg font-mono tracking-wide ${task.completed ? 'line-through text-zinc-400' : 'text-white'}`}>{task.title}</span>
            <button
              onClick={() => toggleTask(task.id, !task.completed)}
              className={`ml-4 w-9 h-9 flex items-center justify-center rounded-full ${task.completed ? 'bg-green-500' : 'bg-zinc-800 border border-zinc-600'} hover:bg-green-400 transition`}
              aria-label="Complete task"
            >
              <FaCheck className={`text-xl ${task.completed ? 'text-white' : 'text-green-400'}`} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-3 w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 transition"
              aria-label="Delete task"
            >
              <FaTrash className="text-white text-xl cursor-pointer" />
            </button>
          </li>
        )).reverse()}
      </ul>
    </div>
  );
}
