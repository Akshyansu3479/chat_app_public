import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { allUsersRoute,host } from '../utils/APIroutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    async function SetCurrUser() {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }
    if (!localStorage.getItem("chat-app-user")) {
      navigate('/');
    } else {
      SetCurrUser();
    }
  }, []);

  useEffect(()=>{
  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])
 
  // setting an avatar for a new user.
  useEffect(() => {
  if(currentUser){
    async function AvatarImageSet(){
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data.data);
    }
    if(currentUser.isAvatarImageSet){
    AvatarImageSet();
    }else{
      navigate('/setAvatar');
    }
  }
  }, [currentUser]);

  const handleChatChange = (chat)=>{
  setCurrentChat(chat);
  }

  return (
    <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange} />
        { isLoaded && currentChat === undefined ? 
          <Welcome currentUser={currentUser}/> :
          <ChatContainer
           currentChat = {currentChat} 
           currentUser={currentUser}
           socket={socket} />
        }
      </div>
    </Container>
  )
}

const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color: #131324;
.container{
  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display:grid;
  grid-template-columns: 25% 75%;
  @media screen and (min-width: 720px) and (max-width:1020px){
    grid-template-columns : 35% 65%;
  }
}
`;  

export default Chat;
