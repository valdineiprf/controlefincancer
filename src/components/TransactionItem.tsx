import { Transaction } from '@/types/transaction';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  ShoppingBag, 
  Car, 
  Home, 
  Heart, 
  Gamepad2, 
  GraduationCap, 
  Receipt,
  Briefcase,
  TrendingUp,
  CircleDollarSign,
  MoreHorizontal,
  Trash2
} from 'lucide-react';

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Alimentação': ShoppingBag,
  'Transporte': Car,
  'Moradia': Home,
  'Saúde': Heart,
  'Lazer': Gamepad2,
  'Educação': GraduationCap,
  'Compras': ShoppingBag,
  'Contas': Receipt,
  'Salário': Briefcase,
  'Freelance': Briefcase,
  'Investimentos': TrendingUp,
  'Vendas': CircleDollarSign,
  'Outros': MoreHorizontal,
};

export function TransactionItem({ transaction, onDelete }: TransactionItemProps) {
  const Icon = categoryIcons[transaction.category] || MoreHorizontal;
  const isIncome = transaction.type === 'income';
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="group flex items-center gap-4 p-4 bg-card rounded-xl shadow-sm hover:shadow-md transition-all duration-200 animate-scale-in">
      <div className={`p-3 rounded-xl ${isIncome ? 'bg-income-muted' : 'bg-expense-muted'}`}>
        <Icon className={`w-5 h-5 ${isIncome ? 'text-income' : 'text-expense'}`} />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-card-foreground truncate">
          {transaction.description}
        </h4>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{transaction.category}</span>
          <span>•</span>
          <span>{format(new Date(transaction.date), "dd 'de' MMM", { locale: ptBR })}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className={`font-semibold ${isIncome ? 'text-income' : 'text-expense'}`}>
          {isIncome ? '+' : '-'} {formatCurrency(transaction.value)}
        </span>
        
        <button 
          onClick={() => onDelete(transaction.id)}
          className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
