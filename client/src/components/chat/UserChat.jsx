import React, { useContext } from 'react'
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient'
import avatar from "../../assets/avatar.svg"
import ChatBox from './ChatBox';
import { ChatContext } from '../../context/ChatContext';

export default function UserChat({chat , user}) {

    const { recipientUser } = useFetchRecipientUser(chat , user);
    const {onlineUsers} = useContext(ChatContext);

    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  return (
    <>
      <div className="flexdiv" >
        <div className="myDiv">
            <img src={avatar} alt = "user" height={"45px"} />
        </div>
        <div className="text-content">
            <div className="name">{recipientUser?.name} <span>{isOnline ? "on" : "off"}</span></div>
            <div className="text">Text Message</div>
        </div>
      </div>
      <div className="dateFlex">
        <div className="date">
            12/12/2022
        </div>
        <div className="notifications">2</div>
      </div>
    </>
  )
}
