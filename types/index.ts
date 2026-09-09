export type Category = {
  id: number;
  name: string;
};

export type Expense = {
  id: number;
  date: string;
  category: string;
  category_id: number;
  description: string;
  amount: string;
};
