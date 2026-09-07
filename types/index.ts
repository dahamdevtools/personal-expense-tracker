export type Category = {
  id: number;
  name: string;
};

export type Expense = {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: string;
};
