import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [users, setUsers] = useState([null])
  const [createForm, setCreateForm] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    role: "",
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    role: "",
    
  });

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/v1/users");
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  return (
    <div>Home</div>
  )
}

export default Home