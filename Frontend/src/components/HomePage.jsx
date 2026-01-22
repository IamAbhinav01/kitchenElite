import bgVideo from '../assets/bg.mp4';
function HomePage() {
  return (
    <div>
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
