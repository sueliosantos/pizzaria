import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { setupAPIClient } from "../../services/api";
import { toast } from "react-toastify";
import { canSSAuth } from "../../utils/canSSAuth";
import { FiUpload } from "react-icons/fi";

type ItemProp = {
  id: string;
  nome: string;
};

interface CategoriaProps {
  categoriaList: ItemProp[];
}
export default function Produto({ categoriaList }: CategoriaProps) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [descricao, setDescricao] = useState("");

  const [avatarUrl, setAvatarUrl] = useState("");
  const [imgAvatar, setImgAvatar] = useState(null);

  const [categoria, setCategoria] = useState(categoriaList || []);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);

  function pegarImagem(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const img = e.target.files[0];

    if (!img) {
      return;
    }

    if (img.type === "image/jpeg" || img.type === "image/png") {
      setImgAvatar(img);
      setAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function registrarProduto(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();
      if (
        nome === "" ||
        preco === "" ||
        descricao === "" ||
        imgAvatar === null
      ) {
        toast.error("Preencha todos os campos");
        return;
      }

      data.append("nome", nome);
      data.append("preco", preco);
      data.append("descricao", descricao);
      data.append("categoria_id", categoria[categoriaSelecionada].id);
      data.append("file", imgAvatar);

      const api = setupAPIClient();
      await api.post("/produto", data);
      toast.success("Produto cadastrado com sucesso");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao cadastrar o produto");
    }

    setNome("");
    setPreco("");
    setDescricao("");
    setImgAvatar(null);
    setAvatarUrl("");
  }

  function mudarCategoria(e) {
    setCategoriaSelecionada(e.target.value);
  }

  return (
    <>
      <Head>
        <title>Novo produto</title>
      </Head>

      <div>
        <Header />
        <main className={styles.contairer}>
          <h1>Cadastrar produto</h1>

          <form onSubmit={registrarProduto} className={styles.form}>
            <label className={styles.labelAvatar}>
              <span>
                <FiUpload size={25} color="#FFF" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={pegarImagem}
              />

              {avatarUrl && (
                <img
                  className={styles.preview}
                  src={avatarUrl}
                  alt="foto do produto"
                  width={250}
                  height={250}
                />
              )}
            </label>

            <select
              value={categoriaSelecionada}
              className={styles.select}
              onChange={mudarCategoria}
            >
              {categoria.map((item, index) => {
                return (
                  <option key={item.id} value={index}>
                    {item.nome}
                  </option>
                );
              })}
            </select>

            <input
              type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <input
              type="text"
              placeholder="Preço do produto"
              className={styles.input}
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={styles.textarea}
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
  const api = setupAPIClient(ctx);
  const response = await api.get("/categoria");

  // console.log(response.data);

  return {
    props: {
      categoriaList: response.data,
    },
  };
});
