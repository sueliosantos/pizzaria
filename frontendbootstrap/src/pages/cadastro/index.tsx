import Head from "next/head";
import styles from "../../../styles/home.module.scss";
import Image from "next/image";

import logoing from "../../../public/logo.svg";
import { Input } from "../../components/ui/input/input";
import { Button } from "../../components/ui/button/button";
import Link from "next/link";
import { FormEvent, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from "react-toastify";

export default function Cadastro() {
  const { cadastrar } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrarNovo(e: FormEvent) {
    e.preventDefault();
    if (nome === "" || email === "" || senha === "") {
      toast.error("Preencha todos os campos");
      return;
    }
    let data = {
      nome,
      email,
      senha,
    };
    setLoading(true);

    await cadastrar(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoing} alt="Logo Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>
          <form onSubmit={cadastrarNovo}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Button type="submit" loading={loading}>
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
