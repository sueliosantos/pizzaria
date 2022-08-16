import { canSSAuth } from "../../utils/canSSAuth";
import Head from "next/head";
import { Header } from "../../components/Header";
import styles from "./styles.module.scss";
import { FiRefreshCcw } from "react-icons/fi";
import { setupAPIClient } from "../../services/api";
import { useState } from "react";
import Modal from "react-modal";
import { ModalOrdem } from "../../components/ModalOrdem";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

      <Header />
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
