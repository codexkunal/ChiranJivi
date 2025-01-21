import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function VideoChat() {
    const [roomCode,setRoomCode]=useState("")

    const navigate = useNavigate()

    const handleFormsubmit = (e)=>{
        e.preventDefault();
        navigate(`/room/${roomCode}`)
    }
  return (
    <div>
      VideoChat
      <form onSubmit={handleFormsubmit}>
        <label htmlFor="">enter room code</label>
        <input
        onChange={(e)=>setRoomCode(e.target.value)}
        type="text" />
        <button type='submit'>JOIN</button>
      </form>
      
    </div>
  )
}
