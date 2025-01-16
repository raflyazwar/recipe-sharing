import React, { useState, useEffect } from 'react';
import { Search, ChefHat, Clock, Users, Bookmark, Plus, Menu, X as CloseIcon } from 'lucide-react';
import RecipeCard from './components/RecipeCard';
import { recipes as initialRecipes } from './data/recipes';
import AddRecipeModal from './components/AddRecipeModal';
import CategoryFilter from './components/CategoryFilter';
import RecipeDetailModal from './components/RecipeDetailModal';

function App() {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem('recipes');
    return saved ? JSON.parse(saved) : initialRecipes;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<number[]>(() => {
    const saved = localStorage.getItem('savedRecipes');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddRecipe = (newRecipe: any) => {
    const recipeWithId = { ...newRecipe, id: recipes.length + 1 };
    setRecipes([...recipes, recipeWithId]);
    setIsAddModalOpen(false);
  };

  const handleSaveRecipe = (recipeId: number) => {
    setSavedRecipes(prev => 
      prev.includes(recipeId) 
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const savedRecipesList = recipes.filter(recipe => savedRecipes.includes(recipe.id));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">CookBook</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a href="#discover" className="text-gray-600 hover:text-gray-900">Discover</a>
              <a href="#categories" className="text-gray-600 hover:text-gray-900">Categories</a>
              <a href="#saved" className="text-gray-600 hover:text-gray-900">Saved Recipes</a>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Recipe
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <CloseIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <a href="#discover" className="block text-gray-600 hover:text-gray-900">Discover</a>
              <a href="#categories" className="block text-gray-600 hover:text-gray-900">Categories</a>
              <a href="#saved" className="block text-gray-600 hover:text-gray-900">Saved Recipes</a>
              <button 
                onClick={() => {
                  setIsAddModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Submit Recipe
              </button>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover & Share Amazing Recipes
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Join our community of food lovers and share your favorite recipes
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search recipes..."
                  className="w-full px-6 py-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div id="categories" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Categories</h2>
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Saved Recipes */}
      {savedRecipesList.length > 0 && (
        <div id="saved" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Saved Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedRecipesList.map((recipe) => (
              <RecipeCard 
                key={recipe.id} 
                recipe={recipe}
                isSaved={true}
                onSave={() => handleSaveRecipe(recipe.id)}
                onClick={() => handleRecipeClick(recipe)}
              />
            ))}
          </div>
        </div>
      )}

      {/* All Recipes */}
      <div id="discover" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          {selectedCategory === 'All' ? 'All Recipes' : selectedCategory + ' Recipes'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRecipes.map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              isSaved={savedRecipes.includes(recipe.id)}
              onSave={() => handleSaveRecipe(recipe.id)}
              onClick={() => handleRecipeClick(recipe)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddRecipeModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddRecipe}
      />
      
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        isSaved={selectedRecipe ? savedRecipes.includes(selectedRecipe.id) : false}
        onSave={() => selectedRecipe && handleSaveRecipe(selectedRecipe.id)}
      />
    </div>
  );
}

export default App;