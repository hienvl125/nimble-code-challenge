import axios from "../utils/axios"
import type { LoginUserCredentials, RegisterUserCredentials, UserSession } from "./../models/user";

export const RegisterUser = async (newUser: RegisterUserCredentials): Promise<void> => {
  await axios({
    method: 'POST',
    url: '/api/users',
    data: {
      email: newUser.email,
      password: newUser.password,
    }
  });
}

export const Login = async (user: LoginUserCredentials): Promise<UserSession | null> => {
  const resp = await axios({
    method: 'POST',
    url: '/api/login',
    data: {
      email: user.email,
      password: user.password,
    }
  });

  if (resp.status != 200) {
    return null;
  }

  const userSession: UserSession = {
    id: resp.data['id'],
    email: resp.data['email'],
    accessToken: resp.data['accessToken'],
  }

  return userSession;
}
