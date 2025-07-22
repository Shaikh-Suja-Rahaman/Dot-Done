import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";

export default function GroupsSidebar() {
  const { groups, addGroup, selectedGroup, setSelectedGroup } = useTodo();
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      addGroup(groupName.trim());
      setGroupName("");
    }
  };

  return (
    <aside className="w-64 bg-zinc-800 text-zinc-100 p-6 flex flex-col min-h-screen shadow-lg">
      <h2 className="font-bold mb-4 text-green-400 text-xl">Groups</h2>
      <ul className="flex-1 space-y-2 mb-6">
        {groups.map((group) => (
          <li
            key={group.id}
            className={`p-2 cursor-pointer rounded-lg transition font-medium ${selectedGroup?.id === group.id ? "bg-green-500 text-white" : "hover:bg-zinc-700"}`}
            onClick={() => setSelectedGroup(group)}
          >
            {group.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleAddGroup} className="flex gap-2">
        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="New group"
          className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 text-zinc-100 border border-zinc-700 focus:outline-none focus:border-green-400 transition"
        />
        <button className="px-3 py-2 bg-green-500 hover:bg-green-400 text-white rounded-lg font-semibold transition">Add</button>
      </form>
    </aside>
  );
}
