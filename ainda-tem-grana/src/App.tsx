import { Dashboard } from "./components/Dashborad";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer, Model } from "miragejs";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import {
  TransactionsProvider,
} from "./TransactionsContext";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Freelance de website",
          type: "deposit",
          category: "Dev",
          amount: 6000,
          createdAt: new Date("2022-02-12 09:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          type: "withdraw",
          category: "Casa",
          amount: 1188,
          createdAt: new Date("2022-02-12 11:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });

    this.post("/transactions", (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create("transaction", data);
    });
  },
});

Modal.setAppElement("#root");

export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModal] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsNewTransactionModal(true);
  }
  function handleCloseNewTransactionModal() {
    setIsNewTransactionModal(false);
  }

  return (
    <TransactionsProvider>
      <GlobalStyle />
      <Header onOpenNewTransactionModel={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}
