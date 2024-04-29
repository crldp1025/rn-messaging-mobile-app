export interface IMessageSenderProps {
  name: string;
  avatar: string | undefined;
}

export interface IMessageProps {
  id: number,
  sender: IMessageSenderProps;
  message: string;
  date: string;
  isOpened: boolean;
  isTyping: boolean;
}