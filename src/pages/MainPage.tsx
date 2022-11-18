import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { EmailAuthProvider, getAuth, onAuthStateChanged } from 'firebase/auth'

import Button from '../components/Button';

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  }
};

const MainPage = () => {
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  const [showAuth, setShowAuth] = React.useState(false);
  const [showProgress, setShowProgress] = React.useState(false);

  const auth = getAuth();

  const onChangeNotion = () => {
    window.location.href = '/notion'
  }

  React.useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, user => {
      setIsSignedIn(!!user);
      setShowProgress(!!user);
    });
    return () => unregisterAuthObserver();
  }, []);

  React.useEffect(() => {
    if(isSignedIn) setShowProgress(false)
    else setShowProgress(true)
  }, [isSignedIn])

  const logout = () => {
    auth.signOut()
    window.location.href = '/'
  }

  return (
    <div>
      {showProgress && (<span>Loading...</span>)}
      {isSignedIn ? (
        <>
          <h2>Hello, {auth.currentUser?.displayName ?? auth.currentUser?.email}👋</h2>
          <Button onClick={onChangeNotion}>NOTION PAGE</Button>
          <Button onClick={logout}>LOGOUT</Button>
        </>
      ) : (
        <>
          {showAuth || showProgress || <Button onClick={() => setShowAuth(true)}>LOGIN</Button>}
          {showAuth && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />}
        </>
      )}

    </div>
  );
}

export default MainPage;
