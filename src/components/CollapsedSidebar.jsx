import React from 'react'
import { Folder } from 'lucide-react'

const CollapsedSidebar = ({sidebarOpen, setSidebarOpen}) => {
  return (
    <div className='h-screen bg-[#212121] p-5'>
      <Folder onClick={()=>setSidebarOpen(true)}/>
    </div>
  )
}

export default CollapsedSidebar