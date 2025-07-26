import React, { useState, useRef, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import { FaTrash, FaFolderOpen, FaGripVertical } from 'react-icons/fa';
import GroupDeleteWarning from "./GroupDeleteWarning";
// If using GSAP via CDN, access it as window.gsap

export default function GroupsSidebar() {
  const { groups, addGroup, selectedGroup, setSelectedGroup, deleteGroup } = useTodo();
  const [groupName, setGroupName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);

  // Ref to the last group item
  const lastGroupRef = useRef(null);
  const prevGroupsLength = useRef(groups.length);

  
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
              ref={idx === groups.length - 1 ? lastGroupRef : null}
              className={`flex items-center justify-between rounded-xl transition-all duration-200 cursor-pointer ${
                selectedGroup?.id === group.id ? 'bg-[#4E4E4E]' : 'bg-[#303030] hover:bg-[#4E4E4E]'
              }`}
              onClick={() => setSelectedGroup(group)}
            >
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
        <GroupDeleteWarning
          groupToDelete={groupToDelete}
          handleConfirmDelete={handleConfirmDelete}
          handleCancelDelete={handleCancelDelete}
        />
      )}
    </>
  );
}
