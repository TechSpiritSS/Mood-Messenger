import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserEmail, setCurrentUserEmail] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    const getUserData = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      setCurrentUserName(data.displayName);
      setCurrentUserEmail(data.email);
      setCurrentUserImage(data.photoURL);
    };

    getUserData();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(
      (contact) =>
        contact.email.toLowerCase().includes(searchQuery.toLowerCase()) &&
        contact.email !== currentUserEmail
    );
    setFilteredContacts(filtered);
  }, [contacts, searchQuery]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Mood Messenger</h3>
          </div>
          <div className="search">
            <input
              type="text"
              placeholder="🔍 Search contacts"
              onChange={handleSearch}
            />
          </div>
          <div className="contacts">
            {filteredContacts.map((contact, index) => {
              return (
                <div
                  key={contact.uid}
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={contact.photourl} alt="" />
                  </div>
                  <div className="username">
                    <h3>{contact.name}</h3>
                    <h5>{contact.email}</h5>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={currentUserImage} alt="avatar" />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
              <h4>{currentUserEmail}</h4>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 65% 15%;
  overflow: hidden;
  background-color: #161616;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .search {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin: 1rem;
    input {
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: none;
      outline: none;
      width: 100%;
      max-width: 20rem;
      font-size: 1rem;
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    button {
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: none;
      outline: none;
      margin-left: 0.5rem;
      background-color: #346751;
      color: white;
      font-size: 1rem;
      cursor: pointer;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #c84b31;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #346751;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #ecdbba;
    }
  }
  .current-user {
    background-color: #c84b31;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
      }
    }
    .username {
      h2 {
        color: white;
      }
      h4 {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
        h4 {
          font-size: 0.8rem;
        }
      }
    }
  }
`;
