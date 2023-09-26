// import React,{useState} from 'react';
// import styled from 'styled-components';
// import EmojiPicker from 'emoji-picker-react';
// // import { Picker } from 'emoji-mart';
// // import {EmojiPicker} from '@emoji-mart/react';
// // import {Picker} from 'emoji-mart' ;
// import {IoMdSend} from 'react-icons/io';
// import {BsEmojiSmileFill} from 'react-icons/bs';

// export default function ChatInput() {

//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [msg, setMsg] = useState("");

//   // const handleEmojiPickerHideShow = ()=>{
//   //   setShowEmojiPicker(!showEmojiPicker);
//   //   // console.log(setShowEmojiPicker(!showEmojiPicker));
//   // }

//   const handleEmojiClick = (event,emojiObject)=>{
//   // let message = msg;
//   // console.log("Emoji : ",emoji);
//   // message += emoji.target; 
//   // setMsg(message);

//   setMsg(prevInput => prevInput+emojiObject.emoji);
//   setShowEmojiPicker(false);
//   console.log("Emoji");
//   };

//   // console.log(EmojiPicker);  

//   return (
//     <Container>
//      <div className="button-container">
//       <div className="emoji">
//        {/* <BsEmojiSmileFill className='smily-emoji' onClick={()=>{setShowEmojiPicker(!showEmojiPicker)}} />
//        {
//         showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
//        } */}

//       <img className='smily-emoji' src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg" alt="smile-emoji" onClick={()=>{setShowEmojiPicker(val=>!val)}}/>
//          { showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} /> }

//       </div>
//      </div>
//      <form className='input-container' >
//        <input type="text" placeholder='type your message here' value={msg} onChange={(e)=>setMsg(e.target.value)} />
//        <button className="submit">
//         <IoMdSend/>
//        </button>
//        </form>
//     </Container>
//   )
// }

// const Container = styled.div`
// display: grid;
// grid-template-columns: 5% 95%;
// align-items: center;
// background-color: #080420;
// padding: 0 2rem;
// padding-bottom: 0.3rem;

// .button-container{
//   display: flex;
//   align-items: center;
//   color:white;
//   gap: 1rem;
//   .emoji{
//     position: relative;
//     img{
//       font-size: 1.5rem;
//       cursor: pointer;
//       height: 35px;
//       margin: 10px -5px;
//       border-radius: 100px;
//       background-color: rgb(255, 195, 0);
//     }
//     .emoji-picker-react{
//       position: absolute;
//       top: -450px;
//     }
//   }
// }


// .input-container{
//   width: 100%;
//   border-radius: 2rem;
//   display: flex;
//   align-items: center;
//   gap: 2rem;
//   background-color: #ffffff34;
//   input{
//     width: 90%;
//     height: 60%;
//     background-color: transparent;
//     color: white;
//     border: none;
//     padding-left: 1rem;
//     font-size: 1.2rem;
//     &::selection{
//       background-color: #9a86f3;
//     }
//     &:focus{
//       outline: none;
//     }
//   }
//  button{
//   padding: 0.35rem 1.5rem;
//   border-radius: 2rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background-color: #9a86f3;
//   border: none;
//   svg{
//     font-size: 2rem;
//     color: white;
//   }
//  }
// }
// `

// #2

import '../App.css';
import React, { useState,useRef } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";


export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef =  useRef(null);

    
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const ref = useRef(null);
  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);

  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker  onEmojiClick={handleEmojiClick}  />}
        </div>
      </div>  
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          ref = {inputRef}
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem; 
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;


// #3
