import { createContext, useContext, useEffect, useState } from "react";
import { Transaction } from "../models/Transaction";
import { api } from "../services/api";

type TransactionInput = Omit<Transaction, "_id" | "createdAt">;

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransaction] = useState<Transaction[]>([]);

  useEffect(() => {
    handleLoadTransactions();
  }, []);

  function handleLoadTransactions() {
    api.get("transactions").then((response) => setTransaction(response.data));
  }

  async function createTransaction(transactionInput: TransactionInput) {
    await api.post("/transactions", {
      ...transactionInput,
      createdAt: new Date(),
    });
    handleLoadTransactions();
  }

  async function deleteTransaction(id: string) {
    await api.delete(`/transactions/${id}`);
    handleLoadTransactions();
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  return context;
}
