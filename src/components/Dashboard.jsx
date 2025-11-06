import React, { useEffect, useState } from 'react'
import {UserAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Task from './Task';
import GroupsSidebar from "./GroupsSidebar";
import TaskList from "./TaskList";
import { FaBars } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';
import { FiLogOut } from "react-icons/fi"; // exit icon
import { Folder } from 'lucide-react';
import CollapsedSidebar from './CollapsedSidebar';

export function Dashboard() {
  const {session, signOut} = UserAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const {selectedGroup} = useTodo();

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
      navigate('/');
    } catch(err) {
      console.error(err);
    }
  }

  useEffect(() => {
  console.log("Sidebar state:", sidebarOpen);
}, [sidebarOpen]);


  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.id) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('profile')
        .select('name, class')
        .eq('uuid', session.user.id)
        .single();
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfile(data);
      }
      setLoading(false);
    };
    fetchProfile();
  }, [session]);

  return (
    <div className="flex h-screen bg-[#303030] text-zinc-100">
      {/* Sidebar toggle button */}

      {/* Sidebar */}
      {/* <div className={`fixed md:static z-10 transition-all duration-300 ${sidebarOpen ? 'left-0' : '-left-80'} md:left-0`}>  */}
      {
        sidebarOpen ? ( <GroupsSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>)
        : (<CollapsedSidebar  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>)
      }


      {/* </div> */}
      {/* Main content */}
      <main className="flex-1 flex flex-col md:ml-0 ml-0">
        <div className="flex justify-end p-4">
          <button
        onClick={handleSignOut}
        style={{ backgroundColor: selectedGroup?.color || "#6FB269" }}
        className="group cursor-pointer flex items-center overflow-hidden text-white font-semibold rounded-lg transition-all duration-300 ease-in-out"
      >
        {/* Icon */}
        <span className="p-2 flex items-center text-shadow-xs justify-center">
          <FiLogOut className="" size={25}
          style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))' }}/>
        </span>

        {/* Sliding text */}
        <span

          className="max-w-0 whitespace-pre opacity-0 group-hover:max-w-[100px] group-hover:opacity-100
          transition-all duration-500 ease-out overflow-hidden"
          style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.3))' }}
        >
          Sign Out  </span>
      </button>
        </div>
        <TaskList />
      </main>
    </div>
  );
}

export default Dashboard;