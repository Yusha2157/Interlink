import React, { useContext } from 'react'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext';

export default function PotentialChats() {
    const {user} = useContext(AuthContext);
    const {potentialChats , createChat , onlineUsers } = useContext(ChatContext);
    
    return (
    <>
      {potentialChats && potentialChats.map((u, index) => {
        return (
        <div className="singleUser" key={index} onClick={() => [createChat(user._id , u._id)]}>
            {u.name} <span className={onlineUsers?.some((user) => user?.userId === u?._id) ? "online" : "offline"}></span>
        </div>
        )
      })}
    </>
  )
}
