export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  description: string;
  value: number;
  category: string;
  type: TransactionType;
  date: Date;
}

export const INCOME_CATEGORIES = [
  'Salário',
  'Freelance',
  'Investimentos',
  'Vendas',
  'Outros',
] as const;

export const EXPENSE_CATEGORIES = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Lazer',
  'Educação',
  'Compras',
  'Contas',
  'Outros',
] as const;
