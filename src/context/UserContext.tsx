import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { IUserProps } from '../interfaces/User';
import { IChatProps } from '../interfaces/Chat';

interface IUserContextProps {
  auth: IUserProps | undefined;
  contacts: IUserProps[];
  chats: IChatProps[];
};

interface IContextProps {
  user: IUserContextProps,
  setUser: Dispatch<SetStateAction<IUserContextProps>>
};

const initialState = {
  user: {
    auth: undefined,
    contacts: [],
    chats: []
  },
  setUser: (user: IUserContextProps) => {}
} as IContextProps;

const UserContext = createContext(initialState);

interface IUserProviderProps {
  children?: ReactNode;
};

const UserProvider = ({children}: IUserProviderProps) => {
  const [user, setUser] = useState<IUserContextProps>(initialState.user);
  
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;