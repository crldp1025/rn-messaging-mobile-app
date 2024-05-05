import { IUserProps } from "./User";

export interface IMessageProps {
  email: string;
  message: string;
  createdAt: string;
}

export interface IChatProps {
  id?: string;
  user: IUserProps;
  messages: IMessageProps[];
  updatedAt: string;
  isViewed: boolean;
}