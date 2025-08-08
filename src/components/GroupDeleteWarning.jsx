import React from 'react'

const GroupDeleteWarning = ({handleCancelDelete, groupToDelete, handleConfirmDelete}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">
      <div className="bg-zinc-800/90 backdrop-blur-md p-8 rounded-xl shadow-lg max-w-sm w-full text-center border border-zinc-700/50">
        <h3 className="text-xl font-bold mb-4 text-red-400">Delete Group</h3>
        <p className="mb-6 text-zinc-200">
          Are you sure you want to delete <span className="font-semibold" style={{ color: groupToDelete.color }}>{groupToDelete?.name}</span>?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirmDelete}
            className="bg-zinc-600/80 cursor-pointer ring-2 ring-inset ring-transparent hover:ring-red-400 hover:bg-zinc-600 text-red-400 px-6 py-2 rounded-lg font-semibold backdrop-blur-sm transition-all duration-200"
          >
            Yes, Delete
          </button>
          <button
            onClick={handleCancelDelete}
            className="bg-zinc-600/80 hover:bg-zinc-600 cursor-pointer ring-2 ring-inset ring-transparent hover:ring-white/20 text-white px-6 py-2 rounded-lg font-semibold backdrop-blur-sm transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupDeleteWarning