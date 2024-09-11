import { AxiosAuth } from "../axios";

export type LoginData = {
  email: string,
  password: string,
}

export default class AuthFetch {
  async login(loginData: LoginData) {
    return AxiosAuth.post('/auth/loginAdmin', { email_usuario: loginData.email, senha_usuario: loginData.password });
  }
}