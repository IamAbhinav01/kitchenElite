import bgVideo from '../assets/smartReciepe.mp4';
import React, { useEffect, useState } from 'react';

const SmartRecipe = () => {
  const staticData = {
    query: 'paneer',
    results: [
      {
        name: 'Paneer Butter Masala',
        ingredients: [
          'paneer',
          'butter',
          'tomato puree',
          'cream',
          'garam masala',
          'onion',
        ],
        calories: 420,
        protein: 18,
        instructions: [
          'Heat butter in a pan and sauté onions until golden.',
          'Add tomato puree and cook until oil separates.',
          'Add spices and mix well.',
          'Add paneer cubes and simmer for 5 minutes.',
          'Stir in cream and serve hot.',
        ],
      },
      {
        name: 'Palak Paneer',
        ingredients: ['paneer', 'spinach', 'garlic', 'green chili', 'cream'],
        calories: 350,
        protein: 20,
        instructions: [
          'Blanch spinach and blend into a puree.',
          'Sauté garlic and chili in oil.',
          'Add spinach puree and cook.',
          'Add paneer cubes and simmer.',
          'Finish with cream and serve.',
        ],
      },
      {
        name: 'Paneer Tikka',
        ingredients: [
          'paneer',
          'yogurt',
          'red chili powder',
          'capsicum',
          'onion',
        ],
        calories: 280,
        protein: 22,
        instructions: [
          'Mix yogurt and spices.',
          'Marinate paneer and vegetables.',
          'Skewer and grill for 10 minutes.',
          'Serve hot with mint chutney.',
        ],
      },
      {
        name: 'Kadai Paneer',
        ingredients: ['paneer', 'capsicum', 'tomato', 'kadai masala', 'onion'],
        calories: 390,
        protein: 19,
        instructions: [
          'Sauté onions and capsicum.',
          'Add tomato and spices.',
          'Add paneer cubes.',
          'Cook for 5-7 minutes and serve.',
        ],
      },
      {
        name: 'Paneer Bhurji',
        ingredients: ['paneer', 'onion', 'tomato', 'turmeric', 'green chili'],
        calories: 300,
        protein: 21,
        instructions: [
          'Sauté onions and chili.',
          'Add tomatoes and spices.',
          'Crumble paneer and cook.',
          'Garnish and serve hot.',
        ],
      },
    ],
  };

  const [allRecipes, setAllRecipes] = useState([]);
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null); // ✅ Modal state

  useEffect(() => {
    setAllRecipes(staticData.results);
    setResults(staticData.results.slice(0, 5));
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    const q = searchQuery.trim().toLowerCase();

    if (!q) {
      setResults(allRecipes.slice(0, 5));
      return;
    }

    const filtered = allRecipes.filter((r) => {
      const name = r.name.toLowerCase();
      const ingredients = r.ingredients.join(' ').toLowerCase();
      return name.includes(q) || ingredients.includes(q);
    });

    setResults(filtered.slice(0, 5));
  };

  const hasContent = results.length > 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden font-sans bg-slate-50">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 
            ${hasContent ? 'opacity-90' : 'opacity-100'}`}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        {!hasContent && <div className="absolute inset-0 bg-black/10" />}
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight text-white pt-6">
          Smart Recipe Finder
        </h1>

        {/* Search */}
        <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto mb-8">
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search by name or ingredient..."
              className="w-full p-4 rounded-full bg-white/90 focus:ring-4 focus:ring-amber-400 outline-none shadow-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-amber-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-amber-600 transition-all"
            >
              Search
            </button>
          </div>
        </form>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r, index) => (
            <article
              key={index}
              className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border"
            >
              <div className="h-40 bg-gradient-to-r from-amber-300 to-amber-200 flex items-center justify-center text-white font-bold text-lg">
                {r.name.slice(0, 2).toUpperCase()}
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-slate-800">
                  {r.name}
                </h3>

                <p className="mt-2 text-sm text-slate-600 truncate">
                  Ingredients: {r.ingredients.slice(0, 5).join(', ')}
                </p>

                <div className="mt-2 text-sm text-slate-600">
                  Calories: <span className="font-medium">{r.calories}</span>{' '}
                  kcal
                  <span className="mx-2">•</span>
                  Protein: <span className="font-medium">{r.protein}g</span>
                </div>

                <p className="mt-3 text-sm text-slate-500 line-clamp-2">
                  {r.instructions[0]}
                </p>

                <div className="mt-4">
                  <button
                    onClick={() => setSelectedRecipe(r)}
                    className="px-3 py-1 bg-amber-500 text-white rounded-md text-sm hover:bg-amber-600"
                  >
                    View Full Recipe
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {!hasContent && (
          <p className="mt-8 text-center text-slate-500">
            No recipes found for your search.
          </p>
        )}
      </div>

      {/* ✅ Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-xl max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>

            <p className="mb-2 text-sm text-slate-600">
              Calories: {selectedRecipe.calories} kcal • Protein:{' '}
              {selectedRecipe.protein}g
            </p>

            <h3 className="font-semibold mt-4 mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4 text-sm">
              {selectedRecipe.ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside text-sm space-y-1">
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRecipe;
