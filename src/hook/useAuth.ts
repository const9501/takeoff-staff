import {useAppSelector} from "./useAppSelector";


interface IContact {
  id: number,
  name: string,
  phone: string
}

interface IUser {
  id: string,
  userName: string,
  email: string,
  password: string,
  contacts: IContact[]
}

interface IIsAuth {
  isAuth: boolean,
  user: IUser | null,
  status: string,
  error: null | string
}


export const useAuth = (): IIsAuth => {
  const {user, status, error} = useAppSelector(state => state.users)


  return {
    isAuth: !!user,
    user,
    status,
    error
  }
}