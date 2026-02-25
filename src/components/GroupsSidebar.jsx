import ColorPicker from './ColorPicker';
import { FaRegTrashAlt } from "react-icons/fa";
import { useTodo } from "../context/TodoContext";
import GroupDeleteWarning from "./GroupDeleteWarning";
import React, { useState, useRef, useEffect } from "react";
import { FaTrash, FaFolderOpen, FaGripVertical } from 'react-icons/fa';
import { Folder } from 'lucide-react';
// If using GSAP via CDN, access it as window.gsap
import { motion } from 'framer-motion';

export default function GroupsSidebar({sidebarOpen, setSidebarOpen}) {
  const { groups, addGroup, selectedGroup, setSelectedGroup, deleteGroup, updateGroupColor } = useTodo();
  const [groupName, setGroupName] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(null);
  const [colorPicker, setColorPicker] = useState({
    isOpen: false,
    groupId: null,
    position: { x: 0, y: 0 }
  });

  // Ref to the last group item
  const lastGroupRef = useRef(null);
  const prevGroupsLength = useRef(groups.length);
  console.log(groups)


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

  // Add handler for band click
  const handleColorBandClick = (e, group) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setColorPicker({
      isOpen: true,
      groupId: group.id,
      position: {
        x: rect.right + 10, // Added more space
        y: rect.top - 20 // Offset up slightly
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPicker.isOpen && !event.target.closest('.color-picker')) {
        setColorPicker({ isOpen: false, groupId: null, position: { x: 0, y: 0 } });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [colorPicker.isOpen]);

  return (
    <>

      <aside className="w-80 bg-[#1a1a1a] text-white p-6 flex flex-col h-screen overflow-y-auto scrollbar-hide border-r border-zinc-800">
        <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-zinc-800">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">GROUPS</h2>
          <button
            onClick={()=> setSidebarOpen(false)}
            className="p-2 hover:bg-zinc-800 transition-colors duration-200"
          >
            <Folder size={24} className="text-zinc-400 hover:text-white transition-colors"/>
          </button>
        </div>

        <div className="flex items-stretch bg-[#262626] border border-zinc-800 shadow-lg mb-8 ">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Create new group..."
            className="bg-transparent text-gray-200 placeholder-zinc-600 outline-none px-4 py-3 flex-1 min-w-0 font-body text-sm tracking-wide"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddGroup(e);
              }
            }}
          />
          <button
            onClick={handleAddGroup}
            className="bg-[#6FB269] hover:bg-[#7ec478] text-white font-heading font-semibold px-5 py-3 transition-all duration-200 text-sm tracking-wider uppercase shadow-md"
          >
            ADD
          </button>
        </div>


        <ul className="flex-1 space-y-2">
          {groups.map((group, idx) => (
            <li
              key={group.id}
              ref={idx === groups.length - 1 ? lastGroupRef : null}
              className={`flex items-stretch justify-between transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg border border-zinc-800 overflow-hidden ${
                selectedGroup?.id === group.id ? 'bg-[#2a2a2a] border-zinc-700' : 'bg-[#1f1f1f] hover:bg-[#262626]'
              }`}
              onClick={() => setSelectedGroup(group)}
            >
              <div className="flex items-stretch">
                <div className="bg-[#1a1a1a] flex items-center px-2 border-r border-zinc-800">
                  <FaGripVertical className="text-zinc-700 text-[1rem]" />
                </div>
                <div
                  className="w-1 bg-[#6FB269] cursor-pointer hover:w-2 transition-all duration-200"
                  style={{ backgroundColor: group.color || '#6FB269' }}
                  onClick={(e) => handleColorBandClick(e, group)}
                />
              </div>
              <div className="flex px-4 py-3 items-center flex-1 font-heading text-sm tracking-wide font-medium uppercase">
                {group.name}
              </div>

              <button
                onClick={(e) => handleDeleteClick(e, group)}
                className="text-zinc-600 cursor-pointer hover:text-red-400 hover:bg-zinc-900 transition-all px-3 border-l border-zinc-800"
              >
                <FaRegTrashAlt size={16} />
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
      {colorPicker.isOpen && (
        <ColorPicker
          position={colorPicker.position}
          onColorSelect={(color) => {
            updateGroupColor(colorPicker.groupId, color);
            setColorPicker({ isOpen: false, groupId: null, position: { x: 0, y: 0 } });
          }}
          onClose={() => setColorPicker({ isOpen: false, groupId: null, position: { x: 0, y: 0 } })}
        />
      )}
    </>
  );
}
