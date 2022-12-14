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
          <h2>Hello, {auth.currentUser?.displayName ?? auth.currentUser?.email}π</h2>
          <div style={{ 
            marginRight: 'auth', marginLeft: 'auth', paddingRight: '10px', paddingLeft: '10px',
            color: '#888'
          }}>
            β<br/>
            λ€κ° μ΄λ€ μ νμ νλ μ§ λλ λλ₯Ό μ‘΄μ€ν  κ±°κ³ , λλ₯Ό μμ€ν μ¬κΈΈκ±°μΌ.<br/>
            κ·Έλ¦¬κ³  λλ₯Ό μ¬λνκ³  μλΌλ μ¬λλ€μ΄ ν­μ μ΄ μλ¦¬μ μλ€λ μ¬μ€μ κΈ°μ΅νλ ΄.<br/>
            β
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
