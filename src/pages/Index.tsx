import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { Transaction, TransactionType } from '@/types/transaction';
import { BalanceCard } from '@/components/BalanceCard';
import { WeeklyChart } from '@/components/WeeklyChart';
import { TransactionItem } from '@/components/TransactionItem';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Sample data
const initialTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Salário mensal',
    value: 5500,
    category: 'Salário',
    type: 'income',
    date: new Date(),
  },
  {
    id: '2',
    description: 'Supermercado',
    value: 450,
    category: 'Alimentação',
    type: 'expense',
    date: new Date(),
  },
  {
    id: '3',
    description: 'Uber para o trabalho',
    value: 35,
    category: 'Transporte',
    type: 'expense',
    date: subDays(new Date(), 1),
  },
  {
    id: '4',
    description: 'Freelance WebApp',
    value: 800,
    category: 'Freelance',
    type: 'income',
    date: subDays(new Date(), 2),
  },
  {
    id: '5',
    description: 'Netflix',
    value: 45,
    category: 'Lazer',
    type: 'expense',
    date: subDays(new Date(), 3),
  },
  {
    id: '6',
    description: 'Conta de luz',
    value: 180,
    category: 'Contas',
    type: 'expense',
    date: subDays(new Date(), 4),
  },
];

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.value, 0);

  const balance = totalIncome - totalExpense;

  const handleAddTransaction = (data: {
    description: string;
    value: number;
    category: string;
    type: TransactionType;
  }) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      ...data,
      date: new Date(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 pt-8 pb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-sm text-muted-foreground">Olá! 👋</p>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Minhas Finanças
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-full shadow-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">
              {format(new Date(), "MMM 'de' yyyy", { locale: ptBR })}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 space-y-6">
        {/* Balance Card */}
        <BalanceCard 
          balance={balance} 
          income={totalIncome} 
          expense={totalExpense} 
        />

        {/* Weekly Chart */}
        <WeeklyChart transactions={transactions} />

        {/* Transactions List */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-display font-semibold text-foreground">
              Lançamentos Recentes
            </h3>
            <span className="text-sm text-muted-foreground">
              {transactions.length} itens
            </span>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <TransactionItem 
                key={transaction.id} 
                transaction={transaction}
                onDelete={handleDeleteTransaction}
              />
            ))}
          </div>
        </section>
      </main>

      {/* FAB - Add Transaction */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 gradient-primary rounded-full shadow-xl shadow-glow flex items-center justify-center text-primary-foreground hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />
    </div>
  );
};

export default Index;
