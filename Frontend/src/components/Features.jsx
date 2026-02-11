import smartImg from '../assets/smart_reciepe.png';
import customImg from '../assets/customcooking.png';
import aiImg from '../assets/cookwithai.png';
import bgVideo from '../assets/bg.mp4';
import { Link } from 'react-router-dom';

function Services() {
  return (
    <div>
      <section className="relative z-20 mt-32 bg-black/80 py-24 px-6 text-white overflow-hidden h-screen w-screen ">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover -z-10"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 -z-10"></div>

        {/* Section Title */}
        <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-16">
          Features
        </h2>

        {/* Cards */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <Link
            to="/smart-recipe"
            className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition overflow-hidden"
          >
            <img
              src={smartImg}
              alt="Smart Recipes"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-3 text-emerald-400">
                Smart Recipes
              </h3>
              <p className="text-gray-300">
                AI-powered recipe suggestions based on your ingredients and
                preferences.
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link
            to="/nutriscan"
            className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition overflow-hidden block no-underline"
          >
            <img
              src={customImg}
              alt="Custom Recipes"
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                NutriScan
              </h3>
              <p className="text-gray-300">
                Get the details about nutrients present inside your food
              </p>
            </div>
          </Link>

          {/* Card 3 */}
          <Link
            to="/prepare-ai"
            className="bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg hover:scale-105 transition overflow-hidden"
          >
            <img
              src={aiImg}
              alt="Prepare with AI"
              className="h-48 w-full object-cover"
            />
            <div className="p-6 ">
              <h3 className="text-2xl font-semibold mb-4 text-emerald-400">
                Prepare with AI
              </h3>
              <p className="text-gray-300">
                Step-by-step cooking guidance from your AI kitchen assistant.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
