import { canSSAuth } from "../../utils/canSSAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";
import Modal from "react-modal";
import { ModalOrdem } from "../../components/ModalOrdem";

type OrderProps = {
  id: string;
  mesa: string | number;
  status: boolean;
  rascunho: boolean;
  nome: string | null;
};
interface HomeProps {
  ordens: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  qtd: number;
  ordem_id: string;
  produto_id: string;

  produto: {
    id: string;
    nome: string;
    descricao: string;
    preco: string;
    banner: string;
  };

  ordem: {
    id: string;
    mesa: string | number;
    status: boolean;
    nome: string | null;
  };
};

export default function Dashboard({ ordens }: HomeProps) {
  const [ordensList, setOrdensList] = useState(ordens || []);
  const [modalItem, setModalItem] = useState<OrderItemProps[]>();
  const [modalVisible, setModalVisible] = useState(false);

  function fecharModal() {
    setModalVisible(false);
  }
  async function abrirModal(id: string) {
    const api = setupAPIClient();

    const response = await api.get("/ordens/detalhe", {
      params: {
        ordem_id: id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  }

  Modal.setAppElement("#__next");
  return (
    <>
      <Head>
        <title>Painel - Pizzaria</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>

            <button>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>

          <article className={styles.list}>
            {ordensList.map((item) => (
              <section key={item.id} className={styles.ordemItem}>
                <button onClick={() => abrirModal(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.mesa}</span>
                </button>
              </section>
            ))}
          </article>
        </main>
        {modalVisible && (
          <ModalOrdem
            isOpen={modalVisible}
            onRequestClose={fecharModal}
            order={modalItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSAuth(async (ctx) => {
  const api = setupAPIClient(ctx);
  const response = await api.get("/ordens");

  return {
    props: {
      ordens: response.data,
    },
  };
});
