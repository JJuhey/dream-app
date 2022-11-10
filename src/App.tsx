import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { initializeApp } from 'firebase/app'
import { EmailAuthProvider, getAuth } from 'firebase/auth'

import Button from './components/Button'

import './App.css';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
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

  return (
    <div className="App">
      <h1>WELCOME DREAM2025</h1>
      {isSignedIn ? (
        <div>
          <h2>Hello, {auth.currentUser?.displayName ?? auth.currentUser?.email}👋</h2>
          <Button onClick={() => auth.signOut()}>LOGOUT</Button>
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
