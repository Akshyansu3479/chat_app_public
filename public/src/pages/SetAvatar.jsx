import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { setAvatarRoute } from '../utils/APIroutes';
import { Buffer } from 'buffer';


 export default function SetAvatar() {

  const api = 'https://api.multiavatar.com/45678945';
  const apiKey = '76idjvZ91NXmpb';  // this is multiavatar api which is open source and can randomly generate any aavatar
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);     // for displaying loader.
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(()=>{
  if(!localStorage.getItem('chat-app-user')){
    navigate('/login');
  }
  })

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an Avatar", toastOptions);
    }
    else{
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      const {data} = await axios.post(`${setAvatarRoute}/${user._id}`, {
      image : avatars[selectedAvatar]
      });
      // console.log(data);
      if(data.isSet){
        user.isAvatarImageSet = true;
        user.avatarImage = data.iamge;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      }else{
        toast.error("Error Setting Avatar, Please try again",toastOptions );
      }
  
    }    
  };

  useEffect(() => {
    const data = [];
    async function getImage() {
      for (let i = 0; i < 2; i++) {
        const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=${apiKey}`); // generating random avatars
        setAvatars(prev => [...prev, Buffer(image.data).toString('base64')]);
      }
    }
    getImage();
    setIsLoading(false);
    // console.log("Avatar : ",avatars.length);
    // console.log(avatars);
    // console.log("Data : ",data);
  }, []);


  // useEffect( async ()=>{
  //   const data = [];
  //   for(let i=0;i<4;i++){
  //     const image  = await axios.get(`${api}/${Math.round(Math.random()*1000)}`);
  //     const buffer = new Buffer(image.data);
  //     data.push(buffer.toString("base64"));
  //   }
  //   setAvatars(data);
  //   setIsLoading(false);
  // },[]);



  return (
    <>
      {isLoading ? <Container>
        <img src='./assets/loader.gif' alt="loader" className='loader' />
      </Container> :
      (<Container>
          <div className="title-container">
            <h1>Pick an Avatar as your Profile Picture:  </h1>
          </div>

          <div className="avatars">{
            avatars.map((avatar, index) => {
              return (
                <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""} `}>
                  <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" onClick={() => setSelectedAvatar(index)} />
                </div>
              );
            })
          }</div>
          <button className="btn" onClick={setProfilePicture} >Set as Profile Picture</button>
        </Container>)
      }
      <ToastContainer />
    </>
  )
}

const Container = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
gap:3rem;
background-color: #131324;
height: 100vh;
width: 100vw;
.loader{
  max-inline-size:100%;
}
.title-container{
  margin: 0px 484px;
  padding: 79px 7px;
  display: block;
  width: 43%;
  height: 115px;
  // border: 1px solid red;
  h1{
    color:white;
  }
}
.avatars{
  // display: block;
  // border:2px solid blue;
  width:40%;
  height:200px;
  display:flex;
  gap:2rem;
  margin: 28px 482px;
  .avatar{
    border: 0.4rem solid transparent;
    padding:0.4rem;
    border-radius: 5rem;
    display:flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img{
      height:6rem;
    }
  }
  .selected{
    border : 0.4rem solid #4e0eff;
  }
}
.btn{
  display: block;
  width: 17%;
  margin: 67px 667px;
  height: 43px;
  border: 2px solid dodgerblue;
  border-radius: 23px;
  font-weight: bold;
  &:hover{
    background-color: #4e0eff;
  }
  background-color: rgb(28 12 61);
  color: white;
  
  
}

`;



