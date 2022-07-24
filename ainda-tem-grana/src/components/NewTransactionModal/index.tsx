import Modal from "react-modal";
import { Container } from "./styles";
import closeImg from "../../assets/close.svg";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={"react-modal-overlay"}
      className={"react-modal-content"}
    >
      <Container>
        <h2>Cadastrar Transação</h2>

        <button type="button" onClick={onClose} className="react-modal-close">
          <img src={closeImg} alt="Fechar modal" />
        </button>

        <input type="text" placeholder="Título" />
        <input type="number" placeholder="Valor" />
        <input type="text" placeholder="Categoria" />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
