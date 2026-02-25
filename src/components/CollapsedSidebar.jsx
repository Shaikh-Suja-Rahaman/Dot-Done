import React from 'react'
import { Folder } from 'lucide-react'

const CollapsedSidebar = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <div className='h-screen bg-[#1a1a1a] p-6 flex flex-col items-center border-r border-zinc-800'>
      <button
        onClick={()=>setSidebarOpen(true)}
        className='p-3 hover:bg-zinc-800 transition-colors duration-200 border border-zinc-800 hover:border-zinc-700'
      >
        <Folder size={24} className="text-zinc-400 hover:text-white transition-colors"/>
      </button>
    </div>
  )
}

export default CollapsedSidebar