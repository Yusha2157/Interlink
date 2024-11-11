import React, { useContext } from 'react'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'
import avatar from "../../assets/avatar.svg"
import ChatBox from './ChatBox';
import { ChatContext } from '../../context/ChatContext';
import "../../styles/userchat.css"

export default function UserChat({chat , user}) {

    const { recipientUser } = useFetchRecipientUser(chat , user);
    const {onlineUsers} = useContext(ChatContext);

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  return (
    <>
      <div className="flexdiv" >
        <div className="myDiv">
            <img src={avatar} alt = "user"/>
        </div>
        <div className="text-content">
            <div className="name">{recipientUser?.name}</div>
            <div className="date">
            date
        </div>
        </div>
      </div>
    </>
  )
}
