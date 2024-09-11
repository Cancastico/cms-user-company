/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosAuth } from "../axios";

export type User = {
  id_usuario?: number;
  nm_usuario?: string;
  ultimo_nome_usuario?: string;
  email_usuario?: string;
  senha_usuario?: string;
  celular_usuario?: string;
  status_usuario?: string;
  token_usuario?: string;
  id_plano_usuario?: number;
  plano?: string;
  usuario_empresa?: UserXCompany[];
  [key: string]: any;
}

export type UserXCompany = {
  id_ue?: number;
  id_usuario_ue?: number;
  id_empresa_ue?: number;
}

export default class UserFetch {
  async getAll() {
    return AxiosAuth.get<User[]>('/user/users');
  }

  async post(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    plan: number;
  }) {
    
  return AxiosAuth.post('/auth/register', {
    nm_usuario: user.firstName,
    ultimo_nome_usuario: user.lastName,
    email_usuario: user.email,
    senha_usuario: user.password,
    celular_usuario: user.phone,
    id_plano_usuario: user.plan,
  })
}


async put(user: {
  plan: number;
  id_user: number;
  nm_user: string;
  last_nm_user: string;
  email_user: string;
  phone_user: string;
}) {
return AxiosAuth.put('/user/userAdmin', {
  id_usuario:user.id_user,
  nm_usuario: user.nm_user,
  ultimo_nome_usuario: user.last_nm_user,
  email_usuario: user.email_user,
  celular_usuario: user.phone_user,
  id_plano_usuario: user.plan,
})
}


}