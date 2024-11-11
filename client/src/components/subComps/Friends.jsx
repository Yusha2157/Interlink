import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import male_avatar from "../../assets/male_avatar.svg"
import avatar from "../../assets/avatar.svg"
import "../../styles/friends.css";

const Friends = () => {
    const {user} = useContext(AuthContext);
    const { userChats ,  isUserChatsLoading , updateCurrentChat , onlineUsers } = useContext(ChatContext);
    

    return (
    <>
        <h3 className='link_head'>Your Links</h3>
        {userChats?.length < 1 ? (<div>
            <div className="myLink">
                No links yet
            </div>
        </div>) : (
            <div className='links_list'>
               {isUserChatsLoading && <span className='links_load'>Loading...</span> } 

               {userChats?.map((chat , index) => {

                const { recipientUser } = useFetchRecipientUser(chat , user);

                const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);
                return (
                <div key={index} onClick={() => updateCurrentChat(chat)} className='myLink'>
                    <div className="link_avatar">
                        <img src={male_avatar} alt={avatar} height={"50px"} />
                        <div className={isOnline ? "status isOnline" : "status isOffline" }></div>
                    </div>
                    <div className="link_info">
                        <div className="link_name">{recipientUser?.name}</div>
                        
                    </div>
                </div>
                )
          })}
            </div>
        )}
    </>
  )
}

export default Friends
