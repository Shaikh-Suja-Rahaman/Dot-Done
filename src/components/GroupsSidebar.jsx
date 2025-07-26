import React, { useState } from "react";
import { useTodo } from "../context/TodoContext";
import { FaTrash, FaFolderOpen, FaGripVertical } from 'react-icons/fa';
import GroupDeleteWarning from "./GroupDeleteWarning";


export default function GroupsSidebar() {
  const { groups, addGroup, selectedGroup, setSelectedGroup, deleteGroup } = useTodo();
  const [groupName, setGroupName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (groupName.trim()) {
      addGroup(groupName.trim());
      setGroupName("");
    }
  };

  const handleDeleteClick = (e, group) => {
    e.stopPropagation();
    setGroupToDelete(group);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (groupToDelete) {
      deleteGroup(groupToDelete.id);
      setShowDeleteModal(false);
      setGroupToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setGroupToDelete(null);
  };

  return (
    <>
    <aside className="w-72 bg-[#212121] text-white p-5 flex flex-col min-h-screen">
  <div className="flex items-center justify-between mb-10">
    <h2 className="font-serif text-2xl tracking-widest ">GROUPS</h2>
    <FaFolderOpen className="text-xl text-zinc-400" />
  </div>
  
  <div className="flex items-center bg-[#4F4F4F] border-2 border-none rounded-xl p-1.5 w-full mx-auto shadow-lg mb-3">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="GROUP NAME"
            className="bg-transparent text-gray-300 placeholder-[gray-700] outline-none pl-3 rounded-xl flex-1 min-w-0 text-l"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddGroup(e);
              }
            }}
          />
          <button
            onClick={handleAddGroup}
            className="bg-[#6FB269] hover:bg-[#88b384] text-white font-semibold px-4 py-2 rounded-xl transition-colors duration-200 text-sm flex-shrink-0 ml-2"
          >
            ADD
          </button>
        </div>


  <ul className="flex-1 space-y-3">
    {groups.map((group, idx) => (
      <li
        key={group.id}
        className={`flex items-center justify-between rounded-xl transition-all duration-200 cursor-pointer ${
          selectedGroup?.id === group.id ? 'bg-[#4E4E4E]' : 'bg-[#303030] hover:bg-[#4E4E4E]'
        }`}
        onClick={() => setSelectedGroup(group)}
      >
        {/* <div className="flex items-center gap-3 w-full">
          <div className={`w-2 h-6 rounded-full ${groupColors[idx % groupColors.length]}`}></div>
          <FaGripVertical className="text-zinc-500" />
          <span className="flex-1 font-semibold tracking-wide font-mono text-sm">{group.name}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); deleteGroup(group.id); }}
          className="text-zinc-400 hover:text-red-500 transition"
        >
          <FaTrash size={14} />
        </button> */}
        <div className="flex">
        <div className="rounded-l-xl bg-[#4E4E4E] p-0.5 py-3 flex">
          <FaGripVertical className="text-[#303030]  text-[1.2rem]" />
        </div>

        <div className="bg-[#6FB269] h-100% w-3.5"></div>

        </div>
        <div className="text-wrap flex-1 pl-2 font-mono tracking-wide text-l">{group.name}</div>
        <button
  onClick={(e) => handleDeleteClick(e, group)}
  className="text-zinc-400 cursor-pointer hover:text-red-300 transition mr-2"
>
  <FaTrash size={20} />
</button>
      </li>
    ))}
  </ul>

  
</aside>
{showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-zinc-800 p-8 rounded-xl shadow-lg max-w-sm w-full text-center border border-zinc-700">
            <h3 className="text-xl font-bold mb-4 text-red-400">Delete Group</h3>
            <p className="mb-6 text-zinc-200">
              Are you sure you want to delete <span className="font-semibold text-green-400">{groupToDelete?.name}</span>?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-zinc-600 hover:bg-zinc-500 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
