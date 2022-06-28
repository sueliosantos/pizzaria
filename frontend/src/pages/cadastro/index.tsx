import Head from "next/head";
import styles from "../../../styles/home.module.scss";
import Image from "next/image";

import logoing from "../../../public/logo.svg";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import Link from "next/link";

export default function Cadastro() {
  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoing} alt="Logo Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form action="">
            <Input placeholder="Digite seu nome" type="text" />

            <Input placeholder="Digite seu email" type="text" />

            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false}>
              Cadastrar
            </Button>
          </form>
          <Link href="/">
            <a className={styles.text}>Já uma conta? Faça login</a>
          </Link>
        </div>
      </div>
    </>
  );
}
