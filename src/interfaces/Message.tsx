import { IUserProps } from "./User";


export interface IMessageProps {
  id: number,
  user: IUserProps;
  recentMessage: string;
  date: string;
  isOpened: boolean;
  isTyping: boolean;
}