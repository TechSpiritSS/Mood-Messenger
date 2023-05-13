import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { sendDataRoute } from '../utils/APIRoutes';

export default function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // console.log(result);
      // console.log(result.user);
      setUser(result.user);
      result.user
        .getIdToken()
        .then((token) => {
          setToken(token);
          // console.log('Tokens :  ' + token);
        })
        .then(() => {
          setError(null);
        })
        .catch((error) => {
          setError(error.message);
          toast.error(error.message, toastOptions);
        });
    });
  };

  useEffect(() => {
    const fetchDetails = (token) => {
      fetch(sendDataRoute, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uid: user.uid,
          name: user.name,
          email: user.email,
          photoURL: user.photoURL,
        }),
      }).then((res) => {
        // console.log(res);
        return res.json();
      });
    };

    if (token) {
      fetchDetails(token);
      localStorage.setItem(
        process.env.REACT_APP_LOCALHOST_KEY,
        JSON.stringify(user)
      );
      navigate('/');
    }
  }, [token]);

  return (
    <>
      <FormContainer>
        <div className="brand">
          <img src={Logo} alt="logo" />
          <h1>Mood Messenger</h1>
        </div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
        {error && <p>{error}</p>}
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #161616;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  button {
    background-color: #c84b31;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #c84b31;
    }
  }
`;
