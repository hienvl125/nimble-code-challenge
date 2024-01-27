import axios from "../utils/axios"
import type { RegisterUserCredentials } from "./../models/user";

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
