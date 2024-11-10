import React, { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import UserChat from '../components/chat/UserChat';
import { AuthContext } from '../context/AuthContext';
import PotentialChats from '../components/chat/potentialChats';
import ChatBox from '../components/chat/ChatBox';

export default function chat() {

  const { user } = useContext(AuthContext);

  const { userChats ,  isUserChatsLoading , updateCurrentChat } = useContext(ChatContext);

  return (
    <>
      <PotentialChats/>
      {userChats?.length < 1 ? null : 
      (<div className="chat_container">
        <div className="list">
          {isUserChatsLoading && <p>Loading Your Chats</p>}

          {userChats?.map((chat , index) => {
            return (
              <div key={index} onClick={() => updateCurrentChat(chat)}>
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
