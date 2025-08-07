import React, { useState, useRef, useEffect } from "react";
import { useTodo } from "../context/TodoContext";
import { FaTrash, FaFolderOpen, FaGripVertical } from 'react-icons/fa';
import { FaRegTrashAlt } from "react-icons/fa";
import GroupDeleteWarning from "./GroupDeleteWarning";
import ColorPicker from './ColorPicker';

// If using GSAP via CDN, access it as window.gsap

export default function GroupsSidebar() {
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
      <aside className="w-72 bg-[#212121] text-white p-5 flex flex-col h-screen overflow-y-auto scrollbar-hide ">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-2xl tracking-widest ">GROUPS</h2>
          <FaFolderOpen className="text-xl text-zinc-400" />
        </div>

        <div className="flex items-center bg-[#4F4F4F] border-2 border-none rounded-full p-1.5 w-full mx-auto shadow-lg mb-12">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Add Group"
            className="bg-transparent text-gray-300 placeholder-[gray-700] outline-none pl-3 rounded-full flex-1 min-w-0 text-l"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddGroup(e);
              }
            }}
          />
          <button
            onClick={handleAddGroup}
            className="bg-[#6FB269] hover:bg-[#88b384] text-white font-semibold px-4 py-2 rounded-full transition-colors duration-200 text-sm flex-shrink-0 ml-2"
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
              <div className="flex items-stretch h-12"> {/* Fixed height container */}
                <div className="rounded-l-xl bg-[#4E4E4E] flex items-center px-2">
                  <FaGripVertical className="text-[#303030] text-[1.2rem]" />
                </div>
                <div
                  className="w-3 bg-[#6FB269] cursor-pointer hover:brightness-110 transition-all color-band"
                  style={{ backgroundColor: group.color || '#6FB269' }}
                  onClick={(e) => handleColorBandClick(e, group)}
                />
              </div>
              <div className="text-wrap flex-1 pl-2 font-mono tracking-wide text-l">
                {group.name}
              </div>
              <button
                onClick={(e) => handleDeleteClick(e, group)}
                className="text-zinc-400 cursor-pointer hover:text-red-300 transition mr-2"
              >
                <FaRegTrashAlt size={20} />
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
