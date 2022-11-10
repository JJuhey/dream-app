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
            너는 정말 대단한 아이란다.<br/>
            너는 진정한 네 자신이 되기 위해 이 세상에 태어난거야.<br/>
            네가 하는 선택들이 다른 이들에게도 영향을 미칠 수 있으니<br/>
            그 선택의 결과를 항상 잘 따져보도록 해.<br/><br/>
            나는 나만의 여정을 살고 있으니 네가 나에 대해 걱정할 필요는 없어. <br/>
            너는 네 안에 있는 강력한 힘의 원천을 따르도록 해.<br/>
            네 본능이나 직관, 직감과 같은 것들 말이야.<br/>
            이것들이 네게 있어 옳은 것은 무엇인지 늘 알려주게 될거야.<br/><br/>
            인생은 정말이지 간단한 거야.<br/>
            네게 옳은 일을 한다면, 그것이 너 자신과 다른 사람 모두에게 좋은 거야.<br/>
            만약 네게 적절하지 않은 일을 한다면, 그건 저 자신과 다른 사람들에게도 옳지 않은 일일거야.<br/><br/>
            우리는 복제 인간이 아니라 모두가 각기 다른 사람들이기 때문에<br/>
            우리가 항상 모든 일에 동의할 수는 없고, 그래도 괜찮다는 사실을 알아야 해.<br/>
            언제든 이 사실만은 꼭 알아줘.<br/>
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
