import React from 'react';
import {fetchUser} from "../store/slices/userSlice";
import {useAppDispatch} from "../hook/useAppDispatch";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import {useAuth} from "../hook/useAuth";

interface ILoginData {
  email: string,
  password: string
}

const LoginForm: React.FC = () => {


  const dispatch = useAppDispatch()
  const {error} = useAuth()

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Enter correct email')
      .required('Required field'),
    password: yup
      .string()
      .required('Required field')
  })

  const {
    register,
    formState: {
      errors
    },
    handleSubmit,
  } = useForm<ILoginData>({
    mode: 'onBlur',
    resolver: yupResolver(loginValidationSchema)
  })

  const onSubmit = handleSubmit((data) => {
    const {email, password} = data
    dispatch(fetchUser({email, password}))
  })


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={onSubmit} className='login-form'>

        <input
          placeholder='email'
          autoComplete='off'
          {...register('email')}
        />

          {errors?.email && <div className='form-error'>{errors?.email.message || 'Error'}</div>}


        <input
          type="password"
          placeholder="password"
          autoComplete='off'
          {...register('password')}
        />

          {errors?.password && <div className='form-error'>{errors?.password.message || 'Error'}</div>}


        <button type='submit'>Login</button>

        {error && <div className='form-error'>{error}</div>}

      </form>
    </>
  );
};

export default LoginForm;