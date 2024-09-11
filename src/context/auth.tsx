'use client'
import AuthFetch, { LoginData } from "@/services/fetchs/auth";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from 'react-toastify';


type AuthContext = {
  isAuthenticated: boolean;
  login: (user: LoginData) => Promise<void>;
  logout: () => void;
}


const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authFetch = new AuthFetch();

  async function login(loginData: LoginData) {
    await authFetch.login(loginData).then((response) => {
      const data = response.data;
      localStorage.setItem('userToken', data.token);
      setIsAuthenticated(true);
    }).catch((error) => {
      setIsAuthenticated(false);
      throw new Error(error.response.data.error)
    })
    return
  }

  function logout() {
    toast.success('Deslogado com sucesso');
    setIsAuthenticated(false);
  }

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     localStorage.clear();
  //     window.location.reload();
  //     redirect('/');
  //   }
  // }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('O provedor não foi autenticado');
  }
  return context;
};

