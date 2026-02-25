import React from 'react'

const GroupDeleteWarning = ({handleCancelDelete, groupToDelete, handleConfirmDelete}) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#1a1a1a] backdrop-blur-md p-10 shadow-2xl max-w-md w-full text-center border-2 border-zinc-800">
        <h3 className="font-display text-2xl font-bold mb-6 text-red-400 tracking-tight">DELETE GROUP</h3>
        <p className="mb-8 text-zinc-300 font-body text-base leading-relaxed">
          Are you sure you want to permanently delete{' '}
          <span className="font-heading font-semibold tracking-wide" style={{ color: groupToDelete.color }}>
            {groupToDelete?.name}
          </span>
          ?
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleConfirmDelete}
            className="bg-[#8b3a3a] cursor-pointer hover:bg-[#a04444] text-red-200 px-8 py-3 font-heading font-semibold backdrop-blur-sm transition-all duration-200 border border-zinc-800 hover:border-red-900 tracking-wider uppercase text-sm"
          >
            DELETE
          </button>
          <button
            onClick={handleCancelDelete}
            className="bg-[#262626] hover:bg-[#303030] cursor-pointer text-white px-8 py-3 font-heading font-semibold backdrop-blur-sm transition-all duration-200 border border-zinc-800 hover:border-zinc-700 tracking-wider uppercase text-sm"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupDeleteWarning