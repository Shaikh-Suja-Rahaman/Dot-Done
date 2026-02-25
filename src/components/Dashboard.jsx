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
import { motion } from 'framer-motion';

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
    <div className="flex h-screen bg-[#151515] text-zinc-100">
      {/* Sidebar */}
      <motion.div layout>
      {
        sidebarOpen ? ( <GroupsSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>)
        : (<CollapsedSidebar  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>)
      }
      </motion.div>

      {/* Main content */}
      <main className="flex-1 flex flex-col md:ml-0 ml-0">
        <div className="flex justify-end p-6 border-b border-zinc-800">
          <button
            onClick={handleSignOut}
            style={{ backgroundColor: selectedGroup?.color || "#6FB269" }}
            className="group cursor-pointer flex items-center overflow-hidden text-white font-heading font-semibold transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl border border-zinc-800"
          >
            {/* Icon */}
            <span className="p-3 flex items-center justify-center border-r border-black/20">
              <FiLogOut size={20} className="drop-shadow-md"/>
            </span>

            {/* Sliding text */}
            <span
              className="max-w-0 whitespace-pre opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:px-4
              transition-all duration-500 ease-out overflow-hidden text-sm tracking-wider uppercase drop-shadow-md"
            >
              SIGN OUT
            </span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TaskList />
        </div>

      </main>
    </div>
  );
}

export default Dashboard;