import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import axios from "axios";
import {io} from "socket.io-client";

export default function Messenger() {

    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const {user} = useContext(AuthContext);
    const scrollRef = useRef();

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && 
            currentChat?.members.includes(arrivalMessage.sender) && 
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", users => {
            setOnlineUsers(user.following.filter( (f) => users.some((u) => u.userId === f)));
        })
    }, [user]); 

    useEffect(() => {
        const getConversations = async () => {
            try{
                const res = await axios.get("/api/conversations/" + user._id);
                setConversations(res.data); 
            } catch(err) {
                console.log(err);
            }
        };
        getConversations();
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await axios.get("/api/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch(err) {
                console.log(err);
            }
        };
        getMessages();
    }, [currentChat]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(member => member !== user._id)      
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId, 
            text: newMessage,
        });

        try{
            const res = await axios.post("/api/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch(err) {
            console.log(err);
        }
    };


    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth" });

    }, [messages])
  
    return (
    <>
    <Topbar/>
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder = "search for friends" className="chatMenuInput" />
                {conversations?.map((c) => ( // the names on the left side
                    <div onClick={() => setCurrentChat(c)}>
                        <Conversation conversation={c} currentUser={user}/>
                    </div>
                ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat?
                <>
                <div className="chatBoxTop">
                   {messages.map(m =>(
                    <div ref = {scrollRef}>
                       <Message message = {m} own = {m.sender === user._id}/>
                   </div>
                   ))}
                   
                </div>
                <div className="chatBoxBotton">
                    <textarea 
                    className="chatMessageInput" 
                    placeholder = "write something..."
                    onChange = {(e) => setNewMessage(e.target.value)}
                    value = {newMessage}    
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                        Send 
                    </button>
                </div></> : <span className="noConversationText">Open a conversation to start a chat</span>}
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUsers = {onlineUsers} currentId = {user._id} setCurrentChat = {setCurrentChat}/>
            </div>
        </div>
    </div>
    </>
  )
}
