import React, { useContext } from 'react'
import Friends from '../components/subComps/Friends'
import PotentialChats from '../components/chat/potentialChats';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import male_avatar from "../assets/male_avatar.svg";
import avatar from "../assets/avatar.svg"
import '../styles/friends.css';
import Feed from '../components/Feed';

const Main = () => {

  const {user} = useContext(AuthContext);
  const {potentialChats , createChat , onlineUsers } = useContext(ChatContext);
  
  return (
    <>
        <div className='MainCont'>
          <section>
            POSTS WILL GO HERE
          </section>
            <nav className='sideNav'>
              <Friends />

              <h3>Links Made for You</h3>
              {potentialChats && potentialChats.map((u, index) => {
              
                return (
              <div className="LinkSuggestion" key={index} onClick={() => [createChat(user._id , u._id)]}>

                <div className="link_avatar">
                        <img src={male_avatar} alt={avatar} height={"50px"} />
                        <div className={onlineUsers?.some((user) => user?.userId === u?._id) ? "status isOnline" : "status isOffline" }></div>
                    </div>
                    <div className="link_info">
                        <div className="link_name">{u.name}</div>
                        
                    </div>
              </div>
              )
              })}
            </nav>
        </div>
      
    </>
  )
}

export default Main;