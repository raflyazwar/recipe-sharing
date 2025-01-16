import React from 'react';
import { X, Clock, Users, Bookmark } from 'lucide-react';

interface RecipeDetailModalProps {
  recipe: any;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onSave: () => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  isSaved,
  onSave,
}) => {
  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold text-gray-900">{recipe.title}</h2>
            <button
              onClick={onSave}
              className={`text-gray-400 hover:text-orange-500 ${
                isSaved ? 'text-orange-500' : ''
              }`}
            >
              <Bookmark className="h-6 w-6" fill={isSaved ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex items-center text-gray-600 mb-6">
            <Clock className="h-5 w-5 mr-2" />
            <span className="mr-6">{recipe.time}</span>
            <Users className="h-5 w-5 mr-2" />
            <span>{recipe.servings} servings</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction: string, index: number) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-orange-500 mr-2">{index + 1}.</span>
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="font-medium text-orange-500">{recipe.difficulty}</span>
            <span className="text-gray-500">{recipe.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailModal;