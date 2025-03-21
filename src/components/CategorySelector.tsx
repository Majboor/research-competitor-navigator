
import React from 'react';
import { CATEGORIES } from '../utils/api';
import { CategoryOption } from '../types';
import { Input } from '@/components/ui/input';

interface CategorySelectorProps {
  selectedCategory: string;
  customCategory: string;
  onSelectCategory: (category: string) => void;
  onCustomCategoryChange: (value: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  customCategory,
  onSelectCategory, 
  onCustomCategoryChange
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold text-center mb-2">Select a product category</h2>
      <p className="text-neutral-500 text-center mb-8">Choose the category you want to find competitors for</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {CATEGORIES.map((category: CategoryOption) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`glass-card rounded-xl p-6 flex flex-col items-center transition-all duration-300 cursor-pointer hover:shadow-glow ${
              selectedCategory === category.id 
                ? 'ring-2 ring-brand-500 shadow-glow scale-[1.02]' 
                : 'hover:scale-[1.02]'
            }`}
          >
            <span className="text-3xl mb-3">{category.icon}</span>
            <h3 className="font-medium text-lg mb-1">{category.name}</h3>
            {category.description && (
              <p className="text-neutral-500 text-sm text-center">{category.description}</p>
            )}
          </div>
        ))}
      </div>

      {selectedCategory === 'other' && (
        <div className="w-full max-w-md mx-auto animate-fade-up">
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Enter your custom category
          </label>
          <Input
            type="text"
            value={customCategory}
            onChange={(e) => onCustomCategoryChange(e.target.value)}
            placeholder="e.g., Beauty products, Pet supplies"
            className="glass-input w-full p-4 rounded-lg transition-all focus:ring-2 focus:ring-brand-500"
          />
        </div>
      )}
    </div>
  );
};

export default CategorySelector;
