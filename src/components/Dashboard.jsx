import React, { useEffect, useState } from 'react'
import {UserAuth} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Task from './Task';
import GroupsSidebar from "./GroupsSidebar";
import TaskList from "./TaskList";

function Dashboard() {
  const {session, signOut} = UserAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div className="flex min-h-screen bg-zinc-900 text-zinc-100">
      <GroupsSidebar />
      <main className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <button onClick={handleSignOut} className="bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg transition">Sign Out</button>
        </div>
        <TaskList />
      </main>
    </div>
  );
}

export default Dashboard