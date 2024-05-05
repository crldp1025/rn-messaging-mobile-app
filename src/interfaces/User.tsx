export interface IUserProps {
  id?: string;
  email: string;
  displayName: string;
  avatar?: string | undefined;
};

export interface IUserLoginProps {
  email: string;
  password: string;
};

export interface IUserRegistrationProps extends IUserProps {
  password: string;
  retypePassword: string;
};