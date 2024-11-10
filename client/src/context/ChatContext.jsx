import { createContext, useCallback, useEffect, useState } from 'react';
import { baseUrl , getRequest , postRequest } from '../utils/services';
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({children , user}) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatsError, setUserChatsError] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket , setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([])

    console.log("onlineUser" , onlineUsers);

    // initialising socket 

    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect()
        }
    } , [user]);

    // online status
    useEffect(() => {
        if (socket === null) return
        socket.emit("addNewUser", user?._id);

        // socket.emit , io.on("connection", console.log("user connected")); 

        socket.on("getOnlineUser", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUser");
        };
    }, [socket])

    // send messages
    useEffect(() => {
        if (socket === null) return

        const recipientId = currentChat?.members?.find((id) => id !== user?._id);

        socket.emit("sendMessage", {...newMessage , recipientId});
    }, [newMessage]);

    //receive message
    
    useEffect(() => {
        if (socket === null) return

        socket.on("getMessage", res => {
            if (currentChat?._id !== res.chatId) return;

            setMessages((prev) => [...prev , res]);
        })

        return () => {
            socket.off("getMessage")
        }
    }, [socket , currentChat])


    // 
    useEffect(() => {
        const getUsers = async () => {
            setIsUserChatsLoading(true);
            const response = await getRequest(`${baseUrl}/users`);
            setIsUserChatsLoading(false);
            if (response.error){
                return console.log('Error fetching users', response);

                // 404 not found 
            }

            

            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if(user?._id === u._id) return false;

                if (userChats){
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    })
                }

                return !isChatCreated;
                
            });
            
            setPotentialChats(pChats);
        };
        getUsers();
    } , [userChats])


    useEffect(() => {
        const getUserChat = async () => {
            if (user?._id){

                setIsUserChatsLoading(true);
                setUserChatsError(null);
                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setIsUserChatsLoading(false);
                if (response.error){
                    return setUserChatsError(response);
                }

                setUserChats(response);
            }
        }

        getUserChat()
    } , [user])


    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

            setIsMessagesLoading(false);

            if (response.error){
                console.log("error in getMessages");
                return setMessagesError(response);
            }

            setMessages(response);
        }
        getMessages()
    } , [currentChat])


    const sendTextMessage = useCallback(async (textMessage , sender , currentChatId , setTextMessage) => {
        if (!textMessage) return console.log("empty message");

        const response = await postRequest(`${baseUrl}/messages`,JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));

        if (response.error){
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response])
        setTextMessage("")
    } , [])

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    } , [])

    

    const createChat = useCallback(async (firstId , secondId) => {  
        const response = await postRequest(`${baseUrl}/chats` , JSON.stringify({
            firstId , 
            secondId , 
        })
        );

        if (response.error){
            return console.log("Error creating chat : " , response);
        }

        setUserChats((prev) => [...prev , response]);
    }, [])
    return <ChatContext.Provider value={{
        userChats, 
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading, 
        messagesError,
        sendTextMessage,
        onlineUsers
    }}>{children}</ChatContext.Provider>
}

