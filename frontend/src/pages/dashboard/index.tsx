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

  async function handleRefresh() {
    const api = setupAPIClient();
    const response = await api.get("/ordens");
    setOrdensList(response.data);
  }

  async function abrirModal(id: string) {
    const api = setupAPIClient();

    const response = await api.get("/ordens/detalhe", {
      params: {
        order_id: id,
      },
    });

    setModalItem(response.data);
    setModalVisible(true);
  }
  async function handleFinishItem(id: string) {
    //alert(id);
    const api = setupAPIClient();
    await api.put("order/finalizar", {
      ordem_id: id,
    });

    const response = await api.get("/ordens");
    setOrdensList(response.data);
    setModalVisible(false);
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

            <button onClick={handleRefresh}>
              <FiRefreshCcw color="#3fffa3" size={25} />
            </button>
          </div>

          <article className={styles.list}>
            {ordensList.length === 0 && (
              <span className={styles.listaVazia}>Nenhum pedido aberto</span>
            )}
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
            handleFinishIOrder={handleFinishItem}
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
