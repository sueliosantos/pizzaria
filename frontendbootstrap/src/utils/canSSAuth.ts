import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { AuthTokenErro } from "../services/erros/AuthTokenErro";

import { parseCookies, destroyCookie } from "nookies";

//so user logados podem ter acesso

export function canSSAuth<P>(fn: GetServerSideProps<P>) {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx);

    const token = cookies["@meu.token"];

    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    try {
      return await fn(ctx);
    } catch (err) {
      if (err instanceof AuthTokenErro) {
        destroyCookie(ctx, "@meu.token");

        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
    }
  };
}
