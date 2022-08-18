import React from 'react';
import {useLocation, Navigate} from "react-router-dom";
import {useAuth} from "../hook/useAuth";
import ContactsPage from "../pages/ContactsPage";


const RequireAuth: React.FC = () => {
  const location = useLocation()

  const {isAuth} = useAuth()


  return isAuth ? <ContactsPage/> : <Navigate to='/' state={{from: location}}/>
};

export default RequireAuth;