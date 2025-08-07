import React, { useState, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import { FaGripVertical, FaCheck, FaTrash } from 'react-icons/fa';
import './TaskList.css'; // Assuming you have a CSS file for styles

export default function TaskList() {
  const { selectedGroup, tasks, addTask, toggleTask, deleteTask } = useTodo();
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {

  }, [selectedGroup])


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
    <div className="flex flex-col items-center h-screen overflow-scroll w-full">
      <header className="mb-8 mt-4 text-center">
  <h2 className="inline-block relative text-white text-4xl font-thin tracking-wide">
    <span className="relative z-10">{selectedGroup.name.toUpperCase()} TASKS</span>
    <span className="absolute left-[-5%] bottom-[4px] w-[110%] h-[8px] bg z-0"
      style={{ backgroundColor: selectedGroup.color }}
    ></span>
  </h2>
</header>



      {/* <form onSubmit={handleAddTask} className="flex w-full max-w-2xl mb-8 gap-4">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="ADD YOUR TASK"
          className="flex-1 px-6 py-3 rounded-full bg-zinc-700 text-zinc-200 border-none focus:outline-none focus:ring-2 focus:ring-green-400 text-lg tracking-wide shadow"
        />
        <button className="px-8 py-3 bg-green-500 hover:bg-green-400 text-white font-bold rounded-full shadow transition text-lg">ADD</button>
      </form> */}

       <div className="flex items-center mb-8 bg-[#4F4F4F] border-2 max-w-2xl border-none rounded-full p-1.5 w-full mx-auto shadow-lg">
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Add Your Task"

            className="bg-transparent text-gray-300 placeholder-[gray-700] outline-none pl-3 rounded-full flex-1 min-w-0 text-l"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTask(e);
              }
            }}
          />

          <button
            onClick={handleAddTask}
            style={{ backgroundColor: selectedGroup.color }}
            className="bg-[#6FB269]  hover:bg-[#88b384] text-white font-semibold px-[1.4rem] py-2 rounded-full transition-colors duration-200 text-sm flex-shrink-0 ml-2"
          >
            ADD
          </button>
        </div>

      <ul className="w-full max-w-2xl  flex flex-col">
        {/* {tasks.map((task) => (
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
        )).reverse()} */}
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center mb-5  bg-[#4F4F4F] border-2 max-w-2xl border-none transition-all duration-200 rounded-full p-1.5 w-full mx-auto shadow-lg `}
            >
              <FaGripVertical className="text-[#303030]  text-[1.2rem] mr-2" />
              <span className={`flex-1 text-l font-mono tracking-wide ${task.completed ? 'line-through text-zinc-400' : 'text-white'}`}>{task.title}</span>
              <button
              onClick={() => toggleTask(task.id, !task.completed)}
              className={`w-9 h-9 flex items-center cursor-pointer justify-center transition-all duration-200 rounded-full ${task.completed ? 'bg-[#6FB269]' : 'bg-zinc-800 border border-zinc-600'} hover:bg-[#8ec38a] `}
              aria-label="Complete task"
            ></button>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-1 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 bg-[#dd7878] hover:bg-red-300 transition"
              aria-label="Delete task"
            >
              {/* <FaTrash className="text-white text-xl cursor-pointer" /> */}
            </button>
          </li>
        ))}

      </ul>
    </div>
  );
}
