import React from 'react';
import { Clock, Users, Bookmark } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  time: string;
  servings: number;
  difficulty: string;
  category: string;
  instructions?: string[];
  ingredients?: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  isSaved: boolean;
  onSave: () => void;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSaved, onSave, onClick }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave();
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={handleSaveClick}
            className={`bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition ${
              isSaved ? 'text-orange-500' : 'text-gray-400'
            }`}
          >
            <Bookmark className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{recipe.title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span className="mr-4">{recipe.time}</span>
          <Users className="h-4 w-4 mr-1" />
          <span>{recipe.servings} servings</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-orange-500">{recipe.difficulty}</span>
          <span className="text-sm text-gray-500">{recipe.category}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;