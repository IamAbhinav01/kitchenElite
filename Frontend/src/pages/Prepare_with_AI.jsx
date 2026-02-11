import { useState, useEffect, useRef } from 'react';
import { Send, ChefHat, Timer, Lightbulb, UtensilsCrossed } from 'lucide-react';
import bgVideo from '../assets/prepai.mp4';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function PrepareWithAI() {
  // ---------------- STATES ----------------
  const [recipeInput, setRecipeInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Tell me what you are cooking 🍳' },
  ]);

  const chatEndRef = useRef(null);

  // ---------------- AUTO SCROLL ----------------
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ---------------- GENERATE RECIPE ----------------
  const generateRecipe = async () => {
    if (!recipeInput.trim()) return;

    setLoadingRecipe(true);

    setRecipe(null);

    try {
      const res = await fetch(`${API_BASE}/prepare/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ food: recipeInput }),
      });

      const data = await res.json();
      setSessionId(data.session_id);
      setRecipe(data.recipe);

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Great choice! Let's cook ${data.recipe_name} 🍽️`,
        },
      ]);

      setRecipeInput('');
    } catch (err) {
      console.log(err);

      alert('Backend error');
    }

    setLoadingRecipe(false);
  };

  // ---------------- CHAT WITH GUIDE AI ----------------
  const sendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    setLoadingChat(true);

    try {
      const res = await fetch(`${API_BASE}/ask/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg.text,
          session_id: sessionId,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: 'Sorry, something went wrong.' },
      ]);
    }

    setLoadingChat(false);
  };

  // ---------------- UI ----------------
  return (
    <div className="relative min-h-screen overflow-hidden text-slate-800">
      {/* BACKGROUND VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-sm" />

      {/* CONTENT */}
      <div className="relative z-10 p-4 md:p-8 pt-32">
        {/* HEADER */}
        <header className="max-w-6xl mx-auto flex items-center gap-4 mb-8">
          <div className="bg-orange-500 p-3 rounded-2xl shadow-lg">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold">ChefAI Assistant</h1>
            <p className="text-slate-500">Your digital sous-chef</p>
          </div>
        </header>

        {/* GRID */}
        <main className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
          {/* LEFT */}
          <section className="lg:col-span-7 space-y-6">
            {/* INPUT */}
            <div className="bg-white/80 rounded-3xl shadow-xl p-6">
              <h2 className="font-bold mb-4 flex items-center gap-2">
                <UtensilsCrossed className="text-orange-500" />
                Start a New Dish
              </h2>

              <div className="flex gap-3">
                <input
                  className="flex-1 bg-slate-100 rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="e.g. Cheese garlic toast..."
                  value={recipeInput}
                  onChange={(e) => setRecipeInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && generateRecipe()}
                />

                <button
                  onClick={generateRecipe}
                  className="bg-orange-500 text-white px-6 rounded-xl font-semibold hover:bg-orange-600"
                >
                  {loadingRecipe ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>

            {/* RECIPE CARD */}
            {loadingRecipe && (
              <div className="h-64 flex items-center justify-center">
                Generating recipe...
              </div>
            )}

            {recipe && (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-orange-500 p-6 text-white">
                  <h3 className="text-2xl font-bold">{recipe.recipe_name}</h3>
                </div>

                <div className="p-8">
                  {/* INGREDIENTS */}
                  <h4 className="uppercase text-sm text-slate-400 font-bold mb-3">
                    Ingredients
                  </h4>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {recipe.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="bg-orange-50 text-orange-700 px-4 py-1 rounded-full text-sm"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>

                  {/* STEPS */}
                  <h4 className="uppercase text-sm text-slate-400 font-bold mb-3">
                    Steps
                  </h4>

                  <div className="space-y-6">
                    {recipe.steps.map((step) => (
                      <div key={step.step_number} className="relative pl-10">
                        <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold">
                          {step.step_number}
                        </div>

                        <p className="font-medium">{step.instruction}</p>

                        <div className="flex gap-4 mt-1 text-xs">
                          <span className="flex items-center gap-1 text-blue-600">
                            <Timer size={14} /> {step.time}
                          </span>
                          <span className="flex items-center gap-1 text-amber-600">
                            <Lightbulb size={14} /> {step.tip}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* RIGHT CHAT */}
          <section className="lg:col-span-5">
            <div className="bg-white/80 rounded-3xl shadow-xl flex flex-col h-[600px]">
              <div className="p-4 border-b font-bold">Kitchen Chat</div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm
                      ${
                        msg.sender === 'user'
                          ? 'bg-orange-500 text-white'
                          : 'bg-slate-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {loadingChat && <div className="text-xs">AI typing...</div>}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    className="flex-1 bg-slate-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
                    placeholder="Ask while cooking..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                  />

                  <button
                    onClick={sendMessage}
                    className="bg-orange-500 p-3 rounded-xl text-white hover:bg-orange-600"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
