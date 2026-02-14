import bgVideo from '../assets/smartReciepe.mp4';
import React, { useEffect, useState } from 'react';

const SmartRecipe = () => {
  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('paneer');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  useEffect(() => {
    if (searchQuery.length < 3) {
      setRecommendedRecipes([]);
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      fetchRecommendations(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const fetchRecommendations = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://abhinavsunil-kitchenelite-api.hf.space/search?query=${query}`
      );
      const data = await response.json();

      const normalizedResults = await Promise.all(
        data.results.map(async (r) => {
          // --- Instruction Cleaning Logic ---
          let instructions = r.instructions;
          if (
            Array.isArray(r.instructions) &&
            r.instructions[0]?.startsWith('c(')
          ) {
            instructions = r.instructions[0]
              .replace(/^c\(/, '')
              .replace(/\)$/, '')
              .split(/",\s*"/)
              .map((s) => s.replace(/^"|"$/g, ''));
          }

          // --- Pexels Image Fetch (Via Proxy) ---
          let imageUrl = 'https://via.placeholder.com/300?text=No+Image+Found';
          try {
            const imageRes = await fetch(
              `/api-pexels/search?query=${encodeURIComponent(r.name || r.title)}&per_page=1`,
              {
                headers: { Authorization: import.meta.env.VITE_PEXELS_API_KEY },
              }
            );

            if (imageRes.ok) {
              const imageData = await imageRes.json();
              if (imageData.photos?.length > 0) {
                imageUrl = imageData.photos[0].src.medium;
              }
            }
          } catch (err) {
            console.error('Proxy fetch failed:', err);
          }

          return { ...r, instructions, imageUrl }; // Returning the fetched imageUrl
        })
      );

      setRecommendedRecipes(normalizedResults);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const hasContent = recommendedRecipes.length > 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center overflow-hidden font-sans bg-slate-50">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className={`w-full h-full object-cover transition-opacity duration-1000 ${hasContent ? 'opacity-40' : 'opacity-100'}`}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/30"></div>{' '}
        {/* Overlay for better text contrast */}
      </div>

      <div className="relative z-10 w-full max-w-6xl px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center tracking-tight text-white pt-6 drop-shadow-lg">
          kitchenELITE Recommender
        </h1>

        <div className="w-full max-w-3xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Enter an ingredient (e.g. Tomato, Paneer)..."
            className="w-full p-4 rounded-full bg-white/95 focus:ring-4 focus:ring-amber-400 outline-none shadow-xl text-slate-800 text-lg"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {isLoading && (
            <p className="text-center text-white mt-4 animate-pulse">
              Searching the pantry...
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedRecipes.map((r, index) => (
            <article
              key={index}
              className="flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100 transition-all hover:translate-y-[-5px] hover:shadow-2xl"
            >
              <div className="h-48 w-full overflow-hidden bg-slate-200">
                <img
                  src={r.imageUrl} // UPDATED: Now uses the Pexels image
                  alt={r.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-800 leading-tight mb-2">
                  {r.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                  {r.ingredients?.slice(0, 4).join(', ')}...
                </p>

                <div className="mt-auto">
                  <div className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full w-fit mb-4">
                    🔥 {r.calories} kcal • 💪 {r.protein}g protein
                  </div>
                  <button
                    onClick={() => setSelectedRecipe(r)}
                    className="w-full py-3 bg-amber-500 text-white rounded-xl font-bold hover:bg-amber-600 transition-all shadow-md active:scale-95"
                  >
                    View Full Recipe
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      {selectedRecipe && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-2xl p-6 md:p-10 rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-3xl font-black mb-4 text-slate-900 border-b pb-4">
              {selectedRecipe.name}
            </h2>
            <img
              src={selectedRecipe.imageUrl}
              className="w-full h-72 object-cover rounded-2xl mb-6 shadow-lg"
              alt={selectedRecipe.name}
            />

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-slate-50 p-3 rounded-xl text-center">
                <p className="text-slate-500 text-xs uppercase font-bold">
                  Calories
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {selectedRecipe.calories}
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl text-center">
                <p className="text-slate-500 text-xs uppercase font-bold">
                  Protein
                </p>
                <p className="text-xl font-bold text-slate-800">
                  {selectedRecipe.protein}g
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h3 className="font-bold text-xl text-slate-800 mb-3 flex items-center gap-2">
                  🛒 Ingredients
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
                  {selectedRecipe.ingredients.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500">•</span> {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-xl text-slate-800 mb-3">
                  👨‍🍳 Preparation
                </h3>
                <ol className="space-y-4">
                  {selectedRecipe.instructions.map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-4 p-4 bg-slate-50 rounded-xl"
                    >
                      <span className="font-black text-amber-500 text-lg">
                        {i + 1}
                      </span>
                      <p className="text-slate-700 leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>

            <button
              onClick={() => setSelectedRecipe(null)}
              className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
            >
              Back to Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartRecipe;
