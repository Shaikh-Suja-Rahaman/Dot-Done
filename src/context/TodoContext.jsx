import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { UserAuth } from "./AuthContext";

const TodoContext = createContext();

export function useTodo() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const { session } = UserAuth();
  const user = session?.user;
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Fetch groups for the user
  useEffect(() => {
    if (!user) return;
    const fetchGroups = async () => {
      const { data, error } = await supabase
        .from("groups")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      if (!error) setGroups(data); //this is the initial load
    };
    fetchGroups();
  }, [user]);

  // Fetch tasks for the selected group
  useEffect(() => {
    if (!user || !selectedGroup) return; //user and selected group both have to present in order for this to run
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .eq("group_id", selectedGroup.id)
        .order("created_at", { ascending: true });
      if (!error) setTasks(data); //again this is the inital load
    };
    fetchTasks();
  }, [user, selectedGroup]); //my tasks will change upon change in user as well as change in tghe selected group

  // Add group
  const addGroup = async (name) => {
    const { data, error } = await supabase
      .from("groups")
      .insert([{ name, user_id: user.id }])
      .select();
    if (!error && data) setGroups((prev) => [...prev, ...data]);
  };

  // Add task
  const addTask = async (title) => {
    if (!selectedGroup) return;
    const { data, error } = await supabase
      .from("tasks")
      .insert([{ title, group_id: selectedGroup.id, user_id: user.id }])
      .select();
    if (!error && data) setTasks((prev) => [...prev, ...data]);
  };

  // Toggle task completion
  const toggleTask = async (taskId, completed) => {
    const { data, error } = await supabase
      .from("tasks")
      .update({ completed })
      .eq("id", taskId)
      .select();
    if (!error && data) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, completed } : t))
      );
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    const { error } = await supabase.from("tasks").delete().eq("id", taskId);
    if (!error) setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Delete group
  const deleteGroup = async (groupId) => {
    const { error } = await supabase.from("groups").delete().eq("id", groupId);
    if (!error) setGroups((prev) => prev.filter((g) => g.id !== groupId));
    // Optionally, clear selectedGroup if it was deleted
    if (selectedGroup && selectedGroup.id === groupId) setSelectedGroup(null);
  };

  // Update group color
  const updateGroupColor = async (groupId, color) => {
    const { data, error } = await supabase
      .from("groups")
      .update({ color }) //shorthand for {color : color}
      .eq("id", groupId)
      .select();

    if (!error && data) {
      setGroups((prev) =>
        prev.map((group) =>
          group.id === groupId ? { ...group, color } : group
        )
      );
    }
  };

  return (
    <TodoContext.Provider
      value={{
        groups,
        addGroup,
        deleteGroup, // <-- add this
        selectedGroup,
        setSelectedGroup,
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateGroupColor,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}