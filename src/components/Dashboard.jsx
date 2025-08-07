import React, { useEffect, useState } from 'react'
import {UserAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Task from './Task';
import GroupsSidebar from "./GroupsSidebar";
import TaskList from "./TaskList";
import { FaBars } from 'react-icons/fa';
import { useTodo } from '../context/TodoContext';

function Dashboard() {
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
      <button
        className="absolute top-4 left-4 z-20 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white md:hidden"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-label="Toggle sidebar"
      >
        <FaBars className="text-2xl" />
      </button>
      {/* Sidebar */}
      {/* <div className={`fixed md:static z-10 transition-all duration-300 ${sidebarOpen ? 'left-0' : '-left-80'} md:left-0`}>  */}
        <GroupsSidebar />
      {/* </div> */}
      {/* Main content */}
      <main className="flex-1 flex flex-col md:ml-0 ml-0">
        <div className="flex justify-end p-4">
          <button onClick={handleSignOut}
          style={{ backgroundColor: selectedGroup?.color || '#6FB269' }}
          className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg transition">Sign Out</button>
        </div>
        <TaskList />
      </main>
    </div>
  );
}

export default Dashboard