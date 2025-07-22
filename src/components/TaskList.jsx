import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

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
    <div className="bg-zinc-900 text-zinc-100 rounded-xl shadow-lg p-8 max-w-lg mx-auto mt-8 flex flex-col min-h-[400px]">
      <header className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-green-400">{selectedGroup.name} Tasks</h2>
      </header>
      <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-green-400 transition"
        />
        <button className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg transition">
          Add
        </button>
      </form>
      <ul className="flex-1 space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`flex items-center bg-zinc-800 rounded-lg px-4 py-3 border border-zinc-700 shadow-sm transition ${task.completed ? 'opacity-60' : ''}`}
          >
            <label className="flex items-center flex-1 cursor-pointer">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id, !task.completed)}
                className="accent-green-400 w-5 h-5 mr-3"
              />
              <span className={`text-base font-medium ${task.completed ? 'line-through text-zinc-400' : ''}`}>
                {task.title}
              </span>
            </label>
            <button
              onClick={() => deleteTask(task.id)}
              className="ml-4 text-red-400 hover:text-red-600 text-xl font-bold transition"
              aria-label="Delete task"
            >
              ×
            </button>
          </li>
        )).reverse()}
      </ul>
    </div>
  );
}
