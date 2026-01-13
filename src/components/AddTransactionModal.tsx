import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { TransactionType, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/types/transaction';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (transaction: {
    description: string;
    value: number;
    category: string;
    type: TransactionType;
  }) => void;
}

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !value || !category) return;
    
    onAdd({
      description,
      value: parseFloat(value),
      category,
      type,
    });
    
    setDescription('');
    setValue('');
    setCategory('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div 
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full sm:max-w-md bg-card rounded-t-3xl sm:rounded-2xl shadow-xl animate-slide-up p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold text-card-foreground">
            Novo Lançamento
          </h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Type Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-xl">
            <button
              type="button"
              onClick={() => { setType('expense'); setCategory(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                type === 'expense' 
                  ? 'bg-expense text-expense-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Minus className="w-4 h-4" />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => { setType('income'); setCategory(''); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                type === 'income' 
                  ? 'bg-income text-income-foreground shadow-md' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Plus className="w-4 h-4" />
              Receita
            </button>
          </div>
          
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-foreground">
              Descrição
            </Label>
            <Input
              id="description"
              placeholder="Ex: Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>
          
          {/* Value */}
          <div className="space-y-2">
            <Label htmlFor="value" className="text-sm font-medium text-foreground">
              Valor
            </Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                R$
              </span>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="h-12 pl-12 rounded-xl"
              />
            </div>
          </div>
          
          {/* Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">
              Categoria
            </Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    category === cat
                      ? type === 'income'
                        ? 'bg-income text-income-foreground'
                        : 'bg-expense text-expense-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-secondary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          
          {/* Submit */}
          <Button 
            type="submit"
            disabled={!description || !value || !category}
            className={`w-full h-12 rounded-xl text-base font-semibold ${
              type === 'income' ? 'gradient-income' : 'gradient-expense'
            } text-primary-foreground hover:opacity-90 transition-opacity`}
          >
            Adicionar {type === 'income' ? 'Receita' : 'Despesa'}
          </Button>
        </form>
      </div>
    </div>
  );
}
