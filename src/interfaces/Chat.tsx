import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { IUserProps } from "./User";

export interface IMessageProps {
  userId: string;
  message: string;
  createdAt?: FirebaseFirestoreTypes.Timestamp;
}

export interface IChatProps {
  id?: string;
  user?: IUserProps;
  users?: string[];
  latestMessage?: IMessageProps;
  messages?: FirebaseFirestoreTypes.DocumentSnapshot[];
  updatedAt?: FirebaseFirestoreTypes.Timestamp;
  isViewed?: boolean;
}

export interface ISendChatProps {
  chatId: string | undefined;
  receiverId: string; 
  message: IMessageProps;
}