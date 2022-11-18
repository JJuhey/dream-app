import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const [loginUser, setLoginUser] = useState<any>()

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoginUser(user)
      } else {
        window.location.href = '/'
      }
    });
    return () => unregisterAuthObserver();
  }, [auth]);

  return (
    <div className='App'>
      {loginUser ? (
        <>
          {children}
          <a href='/'>back to main poge</a>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}

export default AuthLayout;
