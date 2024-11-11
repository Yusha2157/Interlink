import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/potentialChats';
import ChatBox from '../components/chat/ChatBox';
import "../styles/chat.css";

export default function chat() {

  const { user } = useContext(AuthContext);

  const { userChats ,  isUserChatsLoading , updateCurrentChat } = useContext(ChatContext);

  return (
    <>
      
      {userChats?.length < 1 ? null : 
      (<div className="chat_container">
        <div className="list_chats">
          {isUserChatsLoading && <p>Loading Your Chats</p>}

          {userChats?.map((chat , index) => {
            return (
              <div key={index} onClick={() => updateCurrentChat(chat)} className='pick_chat'>
                  <UserChat chat = {chat} user = {user} />
              </div>
            )
          })}
        </div>
        <ChatBox />
      </div>) }
    </>
  )
}
