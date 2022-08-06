import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactionsContext";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

export function TransactionTable() {
  const { transactions, deleteTransaction } = useTransactions();
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr key={transaction._id}>
                <td>{transaction.title}</td>
                <td className={transaction.type}>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(transaction.amount)}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(transaction.createdAt)
                  )}
                </td>
                <td>
                  <button onClick={() => deleteTransaction(transaction._id)}>
                    <DeleteForeverOutlinedIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
}
