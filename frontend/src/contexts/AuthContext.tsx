import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { api } from "../services/apiCliente";
import { toast } from "react-toastify";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  singOut: () => void;
  cadastrar: (credentials: CadastrarProps) => Promise<void>;
};

type SignInProps = {
  email: string;
  senha: string;
};

type CadastrarProps = {
  nome: string;
  email: string;
  senha: string;
};

type UserProps = {
  id: string;
  nome: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function singOut() {
  try {
    destroyCookie(undefined, "@meu.token");
    Router.push("/");
  } catch {
    console.log("Erro ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "@meu.token": token } = parseCookies();

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { id, nome, email } = response.data;

          setUser({
            id,
            nome,
            email,
          });
        })
        .catch(() => {
          singOut();
        });
    }
  }, []);

  async function signIn({ email, senha }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        senha,
      });

      const { id, nome, token } = response.data;
      //console.log(response.data);
      setCookie(undefined, "@meu.token", token, {
        maxAge: 60 * 60 * 24 * 30, //expira em um mês
        path: "/", //quais caminhos terao acesso ao cookie "/" = todos
      });

      setUser({
        id,
        nome,
        email,
      });

      //passando token para proximas requisiçoes
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Bem vindo");
      //Redirecionar para deshboard
      Router.push("dashboard");
    } catch (error) {
      toast.error("Erro ao acessar!");
      console.log("Erro ao acessar", error);
    }
  }

  async function cadastrar({ nome, email, senha }: CadastrarProps) {
    try {
      const response = await api.post("/users", {
        nome,
        email,
        senha,
      });

      toast.success("cadastrado com sucesso");
      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar ", error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, singOut, cadastrar }}
    >
      {children}
    </AuthContext.Provider>
  );
}
