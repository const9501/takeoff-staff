import React from 'react';
import {Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RequireAuth from "./hok/RequireAuth";


const App: React.FC = () => {

  return (
    <div className='wrapper'>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route
          path='/contacts'
          element={
            <RequireAuth/>
          }
        />
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
};

export default App;