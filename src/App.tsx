import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { initializeApp } from 'firebase/app'
import { EmailAuthProvider, getAuth } from 'firebase/auth'

import Button from './components/Button'

import './App.css';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      disableSignUp: {
          status: true,
          adminEmail: "dallicjh@gmail.com",
          helpLink: "",
      },
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

function App() {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);

  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  const logout = () => {
    auth.signOut()
    setShowAuth(false)
  }

  return (
    <div className="App">
      <h1>WELCOME DREAM2025</h1>
      {isSignedIn ? (
        <div>
          <h2>Hello, {auth.currentUser?.displayName ?? auth.currentUser?.email}👋</h2>
          <div style={{ 
            marginRight: 'auth', marginLeft: 'auth', paddingRight: '10px', paddingLeft: '10px',
            color: '#888'
          }}>
            ❝<br/>
            네가 어떤 선택을 하든지 나는 너를 존중할 거고, 너를 소중히 여길거야.<br/>
            그리고 너를 사랑하고 아끼는 사람들이 항상 이 자리에 있다는 사실을 기억하렴.<br/>
            ❞
          </div>
          <Button onClick={logout}>LOGOUT</Button>
        </div>
      ) : (
        <div>
          {showAuth || <Button onClick={() => setShowAuth(true)}>LOGIN</Button>}
          {showAuth && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
        </div>
      )}
    </div>
  );
}

export default App;
