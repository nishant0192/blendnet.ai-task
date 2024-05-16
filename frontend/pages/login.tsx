// pages/login.tsx
import React from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <Navbar/>
        <LoginForm/>
      </div>
    </div>
  );
};

export default LoginPage;
