import React from 'react';

const Form = () => {
  return (
    <>
      <form onSubmit={submitHandler}>
        <label>
          email: <input type="text" name="email" autoComplete='off' value='user1@mail.ru'/>
        </label>
        <label>
          password: <input type="text" name="password" value='12345'/>
        </label>

        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Form;