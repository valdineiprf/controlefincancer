import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  income: number;
  expense: number;
}

export function BalanceCard({ balance, income, expense }: BalanceCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="gradient-primary rounded-2xl p-6 text-primary-foreground shadow-xl animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-primary-foreground/20">
          <Wallet className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium opacity-90">Saldo Atual</span>
      </div>
      
      <h2 className="text-4xl font-display font-bold mb-6">
        {formatCurrency(balance)}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/10">
          <div className="p-2 rounded-lg bg-income/80">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs opacity-80">Receitas</p>
            <p className="font-semibold">{formatCurrency(income)}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-foreground/10">
          <div className="p-2 rounded-lg bg-expense/80">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs opacity-80">Despesas</p>
            <p className="font-semibold">{formatCurrency(expense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
