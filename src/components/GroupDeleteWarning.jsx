import React from 'react'

const GroupDeleteWarning = ({handleCancelDelete, groupToDelete, handleConfirmDelete}) => {
  return (
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
  )
}

export default GroupDeleteWarning