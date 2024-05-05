import { IUserProps } from "./User";

export interface IMessageProps {
  id: string,
  user: IUserProps;
  message?: string;
  updatedAt: string;
  isViewed?: boolean;
  isTyping?: boolean;
}