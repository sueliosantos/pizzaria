import Modal from "react-modal";
import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { OrderItemProps } from "../../pages/dashboard";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];

  handleFinishIOrder: (id: string) => void;
}

export function ModalOrdem({
  isOpen,
  onRequestClose,
  order,
  handleFinishIOrder,
}: ModalProps) {
  const customStyles = {
    content: {
      top: "50%",
      bottom: "auto",
      left: "50%",
      right: "auto",
      padding: "30px",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#1d1d2e",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: "transparent", border: 0 }}
      >
        <FiX size={45} color="#f34748" />
      </button>

      <div className={styles.container}>
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].ordem.mesa}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {item.qtd} - {item.produto.nome}
            </span>
            <span className={styles.descricao}>{item.produto.descricao}</span>
          </section>
        ))}

        <button
          className={styles.botao}
          onClick={() => handleFinishIOrder(order[0].ordem_id)}
        >
          Concluir pedido
        </button>
      </div>
    </Modal>
  );
}
