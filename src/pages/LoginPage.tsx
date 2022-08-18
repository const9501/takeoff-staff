import React from 'react';
import {Navigate} from "react-router-dom";
import {useAuth} from "../hook/useAuth";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {

  const {isAuth} = useAuth()

  if (isAuth) {
    return <Navigate to='/contacts'/>
  }

  return (
    <div className='login-page'>

      <LoginForm/>

    </div>
  );
};

export default LoginPage;