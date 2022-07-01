import { useContext, FormEvent, useState } from "react";
import Head from "next/head";
import styles from "../../styles/home.module.scss";
import Image from "next/image";
import logoImg from "../../public/logo.svg";
import { Input } from "../components/ui/input/input";
import { Button } from "../components/ui/button/button";
import Link from "next/link";

import { canSSGuest } from "../utils/canSSGuest";

import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    let data = {
      email,
      senha,
    };

    if (email === "" || senha === "") {
      toast.warning("Informe o email e a senha!");
      return;
    }

    setLoading(true);

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>SujeitoPizza - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Sua senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button type="submit" loading={loading}>
              Acessar
            </Button>
          </form>

          <Link href="/cadastro">
            <a className={styles.text}>Nao possui uma conta? Cadastre-se</a>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSGuest(async (ctx) => {
  return {
    props: {},
  };
});
