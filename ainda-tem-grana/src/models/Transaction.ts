export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: Date;
}
