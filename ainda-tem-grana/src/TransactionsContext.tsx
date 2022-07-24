import { createContext, useEffect, useState } from "react";
import { Transaction } from "./models/Transaction";
import { api } from "./services/api";

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    handleLoadTransactions();
  }, []);

  function handleLoadTransactions() {
    api
      .get("transactions")
      .then((response) => setTransaction(response.data.transactions));
  }

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    handleLoadTransactions();
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
