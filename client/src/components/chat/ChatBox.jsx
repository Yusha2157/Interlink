import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ChatContext } from '../../context/ChatContext';
import { useFetchRecipientUser } from '../../hooks/useFetchRecipient';
import moment from "moment";
import { IoIosSend } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import "../../styles/chatbox.css";

export default function ChatBox() {

    const { user } = useContext(AuthContext);
    const {currentChat , messages , isMessagesLoading , sendTextMessage } = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat, user);
    const [textMessage , setTextMessage] = useState("");

    console.log("text", textMessage);
   
    if (!recipientUser) {
        return ( <div className='Chatbox'>
            <div className="header">

            </div>
            <div className="messagebox">

            </div>
            <div className="chatInput">
                <InputEmoji />
                <button className='sendbtn'><IoIosSend/></button>
            </div>
        </div>
         );
    }

    if (isMessagesLoading) return (<p>Loading Your Chat</p>);

    return ( <div className='Chatbox'> 
        <div className="header">
            <h2>{recipientUser.name}</h2>
        </div>
        <div className="messagebox">
            {messages && messages.map((message, index) => <div key={index} className={`${message?.senderId === user?._id ? "message self" : "message notself"}`}>
                <span className="messageText">{message.text}</span>
                <span className='messageTime'>{moment(message.createdAt).calendar()}</span>
            </div> )}
        </div>

        <div className="chatInput">
            <InputEmoji value={textMessage} onChange={setTextMessage}/>
            <button className='sendbtn' onClick={() => sendTextMessage(textMessage, user , currentChat._id , setTextMessage)}><IoIosSend/></button>
        </div>
     </div> )
}
