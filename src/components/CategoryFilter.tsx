import React from 'react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Desserts'];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`p-4 rounded-lg text-center transition ${
            selectedCategory === category
              ? 'bg-orange-500 text-white'
              : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
          }`}
        >
          <span className="text-lg font-semibold">{category}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;