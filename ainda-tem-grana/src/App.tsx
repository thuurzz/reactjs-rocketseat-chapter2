import { Dashboard } from "./components/Dashborad";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "api";

    this.get("/transactions", () => {
      return [
        {
          id: 1,
          title: "transaction 1",
          amount: 400,
          type: "deposit",
          category: "Fuel",
          createdAt: new Date(),
        },
      ];
    });
  },
});

export function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Dashboard />
    </>
  );
}
