import Head from "next/head";
import { FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { canSSAuth } from "../../utils/canSSAuth";

export default function Categoria() {
  const [nome, setNome] = useState("");

  async function registrarCategoria(event: FormEvent) {
    event.preventDefault();

    if (nome === "") {
      return;
    }

    const api = setupAPIClient();
    await api.post("/categoria", {
      nome: nome,
    });

    toast.success("Categoria cadastrada com sucesso");
    setNome("");
  }

  return (
    <>
      <Head>
        <title>Nova Categoria</title>
      </Head>

      <div>
        <Header />
        <main className={styles.contairer}>
          <h1>Cadastrar categoria</h1>

          <form onSubmit={registrarCategoria} className={styles.form}>
            <input
              type="text"
              placeholder="Digite o nome da categoria"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <button type="submit" className={styles.btn}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSAuth(async (ctx) => {
  return {
    props: {},
  };
});
