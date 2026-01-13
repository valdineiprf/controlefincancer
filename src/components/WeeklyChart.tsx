import { Transaction } from '@/types/transaction';
import { startOfWeek, endOfWeek, isWithinInterval, format, eachDayOfInterval, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface WeeklyChartProps {
  transactions: Transaction[];
}

export function WeeklyChart({ transactions }: WeeklyChartProps) {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(today, { weekStartsOn: 0 });
  
  const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd });
  
  const weeklyData = daysOfWeek.map(day => {
    const dayTransactions = transactions.filter(t => 
      isSameDay(new Date(t.date), day)
    );
    
    const income = dayTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.value, 0);
      
    const expense = dayTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.value, 0);
    
    return {
      day: format(day, 'EEE', { locale: ptBR }),
      income,
      expense,
      isToday: isSameDay(day, today),
    };
  });
  
  const maxValue = Math.max(
    ...weeklyData.map(d => Math.max(d.income, d.expense)),
    100
  );

  return (
    <div className="bg-card rounded-2xl p-6 shadow-lg animate-slide-up">
      <h3 className="text-lg font-display font-semibold text-card-foreground mb-6">
        Resumo Semanal
      </h3>
      
      <div className="flex items-end justify-between gap-2 h-32">
        {weeklyData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex gap-1 h-24 items-end justify-center">
              {data.income > 0 && (
                <div 
                  className="w-3 rounded-t-md gradient-income transition-all duration-300"
                  style={{ height: `${(data.income / maxValue) * 100}%`, minHeight: '4px' }}
                />
              )}
              {data.expense > 0 && (
                <div 
                  className="w-3 rounded-t-md gradient-expense transition-all duration-300"
                  style={{ height: `${(data.expense / maxValue) * 100}%`, minHeight: '4px' }}
                />
              )}
              {data.income === 0 && data.expense === 0 && (
                <div className="w-6 h-1 rounded-full bg-muted" />
              )}
            </div>
            <span className={`text-xs font-medium capitalize ${data.isToday ? 'text-primary font-bold' : 'text-muted-foreground'}`}>
              {data.day}
            </span>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full gradient-income" />
          <span className="text-sm text-muted-foreground">Receitas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full gradient-expense" />
          <span className="text-sm text-muted-foreground">Despesas</span>
        </div>
      </div>
    </div>
  );
}
