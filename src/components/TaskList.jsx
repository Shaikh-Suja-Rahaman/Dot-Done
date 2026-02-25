import React, { useState, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import { FaGripVertical, FaCheck, FaTrash } from 'react-icons/fa';
import './TaskList.css'; // Assuming you have a CSS file for styles
import { motion } from "framer-motion";

export default function TaskList() {
  const { selectedGroup, tasks, addTask, toggleTask, deleteTask } = useTodo();
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {

  }, [selectedGroup])


  if (!selectedGroup) {
    return (

      <motion.div
      initial={{opacity : 0, y:100}}
      animate={{ opacity: 1, y: 0 }}
      transition={{
                 y: { duration: 0.4, ease: 'easeOut' },
                 opacity: { duration: 0.4 , ease: 'easeIn'},
                }}

      className="bg-[#1f1f1f] border border-zinc-800 text-zinc-100 p-12 text-center shadow-2xl mt-60 max-w-md mx-auto">
        <h3 className="font-heading text-xl font-semibold tracking-wide mb-2 text-zinc-400">NO GROUP SELECTED</h3>
        <p className="font-body text-sm text-zinc-500">Select a group from the sidebar to view and manage tasks</p>
      </motion.div>
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

     <motion.div
      key={selectedGroup.id} // This is CRITICAL - forces re-mount when group changes
      initial={{opacity : 0, y:100}}
      animate={{ opacity: 1, y: 0 }}
      transition={{
                 y: { duration: 0.4, ease: 'easeOut' },
                 opacity: { duration: 0.4 , ease: 'easeIn'},
                }}

    className="flex flex-col items-center w-full px-6 py-8">
      <header className="mb-10 text-center">
        <h2 className="relative inline-block font-display text-5xl font-bold tracking-tight text-white">
          <span className="relative z-10">{selectedGroup.name.toUpperCase()}</span>
          <span
            className="absolute left-0 bottom-0 w-full h-2 z-0 opacity-60"
            style={{ backgroundColor: selectedGroup.color }}
          ></span>
        </h2>
        <p className="font-body text-zinc-500 text-sm tracking-wider mt-3 uppercase">Task Management</p>
      </header>

      {/* Add Task Input - Matching GroupsSidebar style */}
      <div className="flex items-stretch bg-[#262626] border border-zinc-800 shadow-lg mb-8 overflow-hidden max-w-3xl w-full mx-auto">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="bg-transparent text-gray-200 placeholder-zinc-600 outline-none px-4 py-3 flex-1 min-w-0 font-body text-sm tracking-wide"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTask(e);
            }
          }}
        />
        <button
          onClick={handleAddTask}
          style={{ backgroundColor: selectedGroup.color }}
          className="hover:brightness-110 cursor-pointer text-white font-heading font-semibold px-6 py-3 transition-all duration-200 text-sm tracking-wider uppercase shadow-md"
        >
          ADD TASK
        </button>
      </div>

      {/* Task List - Matching GroupsSidebar item style */}
      <ul className="w-full max-w-3xl flex flex-col space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-stretch justify-between transition-all duration-200 shadow-md hover:shadow-lg border border-zinc-800 overflow-hidden ${
              task.completed ? 'bg-[#1f1f1f] opacity-70' : 'bg-[#1f1f1f] hover:bg-[#262626]'
            }`}
          >
            <div className="flex items-stretch">
              <div className="bg-[#1a1a1a] flex items-center px-2 border-r border-zinc-800">
                <FaGripVertical className="text-zinc-700 text-[1rem]" />
              </div>
              <div
                className="w-1"
                style={{ backgroundColor: selectedGroup.color }}
              />
            </div>
            <div className="flex px-4 py-3 items-center flex-1 font-body text-sm tracking-wide">
              <span className={task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}>
                {task.title}
              </span>
            </div>

            <button
              onClick={() => toggleTask(task.id, !task.completed)}
              className={`w-10 h-100% flex items-center cursor-pointer justify-center transition-all duration-200 border-l border-zinc-800 hover:bg-zinc-900 ${
                task.completed ? '' : ''
              }`}
              style={{ backgroundColor: task.completed ? selectedGroup.color : 'transparent' }}
              aria-label="Complete task"
            >
              {task.completed && <FaCheck className="text-white text-sm" />}
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="text-zinc-600 cursor-pointer hover:text-red-400 hover:bg-zinc-900 transition-all px-3 border-l border-zinc-800"
              aria-label="Delete task"
            >
              <FaTrash size={16} />
            </button>
          </li>
        )).reverse()}
      </ul>
    </motion.div>
  );
}
