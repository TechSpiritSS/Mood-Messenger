import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatInput from './ChatInput';
import Logout from './Logout';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { sendMessageRoute, recieveMessageRoute } from '../utils/APIRoutes';

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        );
        const response = await axios.post(recieveMessageRoute, {
          from: data.uid,
          to: currentChat.uid,
        });
        setMessages(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const handleNewMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const currentSocket = socket.current;
    currentSocket.on('new-message', handleNewMessage);

    return () => {
      currentSocket.off('new-message', handleNewMessage);
    };
  }, [socket]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).uid;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    // console.log(
    //   'Sender ' + data.uid + ' Reciever ' + currentChat.uid + ' Message ' + msg
    // );
    socket.current.emit('send-msg', {
      to: currentChat.uid,
      from: data.uid,
      msg,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
    await axios.post(sendMessageRoute, {
      from: data.uid,
      to: currentChat.uid,
      message: msg,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });

    const msgs = [...messages];
    msgs.push({
      fromSelf: true,
      message: msg,
      createdAt: new Date()
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
        .split(' ')[1],
    });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { fromSelf: false, message: msg },
        ]);
      });
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img src={currentChat.photourl} alt="" />
          </div>
          <div className="username">
            <h3>{currentChat.name}</h3>
            <h5>{currentChat.email}</h5>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? 'sended' : 'recieved'
                }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                  <p className="time">{message.createdAt}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: white;
        }
        h5 {
          color: rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        .time {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #c84b31;
      }
      .time {
        text-align: right;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #161616;
      }
      .time {
        text-align: left;
      }
    }
  }
`;
