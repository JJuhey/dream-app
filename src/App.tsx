import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { API_KEY, AUTH_DOMAIN } from './config';
import { initializeApp } from 'firebase/app'

import NotionPage from './pages/NotionPage';
import MainPage from './pages/MainPage';

import './App.css';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
}
initializeApp(firebaseConfig);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/notion",
    element: <NotionPage />
  }
]);


function App() {
  return (
    <div className="App">
      <h1>WELCOME DREAM2025</h1>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
