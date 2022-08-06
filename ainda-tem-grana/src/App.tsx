import { Dashboard } from "./components/Dashborad";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
// import { createServer, Model } from "miragejs";
import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from "./hooks/useTransactionsContext";

// createServer({
//   models: {
//     transaction: Model,
//   },

//   // seeds(server) {
//   //   server.db.loadData({
//   //     transactions: [
//   //       {
//   //         _id: 1,
//   //         title: "Desenvolvimento de website",
//   //         type: "deposit",
//   //         category: "Freelance",
//   //         amount: 10000,
//   //         createdAt: new Date("2022-02-12 09:00:00"),
//   //       },
//   //       {
//   //         _id: 2,
//   //         title: "Macbook Air m1",
//   //         type: "withdraw",
//   //         category: "Ferramenta",
//   //         amount: 8000,
//   //         createdAt: new Date("2022-02-12 11:00:00"),
//   //       },
//   //     ],
//   //   });
//   // },

//   routes() {
//     this.namespace = "api";

//     this.get("/transactions", () => {
//       return this.schema.all("transaction");
//     });

//     this.post("/transactions", (schema, request) => {
//       const data = JSON.parse(request.requestBody);
//       return schema.create("transaction", data);
//     });
//   },
// });

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
