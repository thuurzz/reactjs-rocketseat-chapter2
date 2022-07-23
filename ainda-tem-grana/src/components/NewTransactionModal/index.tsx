import Modal from "react-modal";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onClose,
}: NewTransactionModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Cadastrar Transação</h2>
    </Modal>
  );
}
