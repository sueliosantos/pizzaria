import Head from "next/head";
import styles from "../../styles/home.module.scss";
import Image from "next/image";

import logoing from "../../public/logo.svg";
import { Input } from "../components/ui/input/input";
import { Button } from "../components/ui/button/button";
export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria - faça seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoing} alt="Logo Pizzaria" />

        <div className={styles.login}>
          <form action="">
            <Input placeholder="Digite seu email" type="text" />

            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>

          <a className={styles.text}>Não possui uma conta? cadastre-se</a>
        </div>
      </div>
    </>
  );
}
