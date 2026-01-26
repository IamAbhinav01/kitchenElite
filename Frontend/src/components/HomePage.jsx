import bgVideo from '../assets/bg.mp4';
import logo from '../assets/logo.png';
function HomePage() {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="KitchenElite Logo"
            className="h-10 w-10 object-contain rounded-full
               border border-emerald-400
               shadow-[0_0_12px_rgba(52,211,153,0.5)]
               group-hover:scale-110 transition-transform duration-300"
          />
          <h1 className="text-2xl font-bold text-white">
            Kitchen<span className="text-emerald-400">ELITE</span>
          </h1>

          {/* Links */}
          <ul className="hidden md:flex space-x-8 text-white font-medium">
            <li className="hover:text-emerald-400 cursor-pointer">Home</li>
            <li className="hover:text-emerald-400 cursor-pointer">Features</li>
            <li className="hover:text-emerald-400 cursor-pointer">Recipes</li>
            <li className="hover:text-emerald-400 cursor-pointer">About</li>
            <li className="hover:text-emerald-400 cursor-pointer">Contact</li>
          </ul>

          {/* Button */}
          <button className="hidden md:block bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2 rounded-lg font-semibold transition">
            Get Started
          </button>
        </div>
      </nav>
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Background Video */}

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 h-full w-full object-cover"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center text-white px-6">
          <div className="text-center max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
              Kitchen<span className="text-emerald-400">ELITE</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
              Your AI-powered kitchen companion for smarter cooking, intelligent
              recipes, and premium culinary experiences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
