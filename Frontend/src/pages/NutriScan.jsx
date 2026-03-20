import { useState } from 'react';
import proteinIcon from '../assets/proteinIcon.png';
import carbsIcon from '../assets/carbsIcon.png';
import fatIcon from '../assets/fatIcon.png';
import fiberIcon from '../assets/fiberIcon.png';
import sugarIcon from '../assets/sugarIcon.png';
import sodiumIcon from '../assets/sodiumIcon.png';
import bgVideo from '../assets/nutribg.mp4';

function NutriScan() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };
  const handleScan = async () => {
    if (!image) {
      alert('Please upload an image first');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('image', image);

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/scan/`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Scan failed');
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      alert('Scanning failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden bg-black">
      {/* ================= LOADING SCREEN ================= */}
      {!isVideoLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black">
          <div className="w-12 h-12 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin mb-4"></div>
          <p className="text-emerald-400 font-medium">
            Initializing NutriScan...
          </p>
        </div>
      )}

      {/* ================= BACKGROUND VIDEO ================= */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={() => setIsVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* =============== LIGHTER OVERLAY (Better Video Visibility) ================= */}
      <div
        className={`absolute inset-0 bg-black/20 z-10 transition-opacity duration-1000 ${
          isVideoLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>

      {/* ================= MAIN CONTENT ================= */}
      <div
        className={`relative z-20 pt-20 pb-10 px-6 transition-all duration-1000 transform ${
          isVideoLoaded
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-center mb-16 drop-shadow-2xl">
          Nutri<span className="text-emerald-400">Scan</span>
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ========== UPLOAD MODULE (Transparent/Blur) ========== */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10 hover:bg-white/10 transition-colors duration-500">
            <h2 className="text-2xl font-semibold mb-6 text-emerald-400">
              Upload Food Image
            </h2>

            <label className="relative flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/20 rounded-2xl cursor-pointer hover:border-emerald-400 transition group">
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

              {!preview ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14 text-emerald-400 mb-4 group-hover:scale-110 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h10a4 4 0 004-4M7 10l5-5m0 0l5 5m-5-5v12"
                    />
                  </svg>
                  <p className="text-lg font-medium">Drop image here</p>
                </>
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain rounded-2xl"
                />
              )}
            </label>

            <button
              onClick={handleScan}
              className="mt-6 w-full py-4 rounded-xl bg-emerald-500/80 hover:bg-emerald-500 text-black font-bold text-lg transition shadow-lg"
            >
              Scan Nutrition
            </button>

            {loading && (
              <p className="text-center mt-4 text-emerald-400 animate-pulse">
                Analyzing...
              </p>
            )}
          </div>

          {/* ========== RESULTS MODULE (Transparent/Blur) ========== */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-6 text-emerald-400">
              Nutrition Results
            </h2>

            {!result ? (
              <div className="h-64 flex items-center justify-center border-2 border-white/5 rounded-2xl">
                <p className="text-gray-300 italic">Awaiting scan data...</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="border-b border-white/10 pb-4">
                  <h3 className="text-4xl font-black text-white">
                    {result.food_name}
                  </h3>
                  <div className="flex gap-4 mt-2 text-sm font-medium text-emerald-300/80">
                    <span>{result.estimated_portion_size}</span>
                    <span>•</span>
                    <span>{result.calories_kcal} kcal</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">
                    Macronutrients
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <Stat
                      label="Protein"
                      value={result.macronutrients.protein_g}
                      unit="g"
                      icon={proteinIcon}
                    />
                    <Stat
                      label="Carbs"
                      value={result.macronutrients.carbohydrates_g}
                      unit="g"
                      icon={carbsIcon}
                    />
                    <Stat
                      label="Fat"
                      value={result.macronutrients.fat_g}
                      unit="g"
                      icon={fatIcon}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">
                    Micronutrients
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    <Stat
                      label="Fiber"
                      value={result.micronutrients.fiber_g}
                      unit="g"
                      icon={fiberIcon}
                    />
                    <Stat
                      label="Sugar"
                      value={result.micronutrients.sugars_g}
                      unit="g"
                      icon={sugarIcon}
                    />
                    <Stat
                      label="Sodium"
                      value={result.micronutrients.sodium_mg}
                      unit="mg"
                      icon={sodiumIcon}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit, icon }) {
  return (
    <div className="bg-black/20 border border-white/5 rounded-2xl p-3 flex flex-col items-center transition hover:bg-black/40">
      <img src={icon} alt={label} className="w-8 h-8 mb-2 opacity-80" />
      <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">
        {label}
      </p>
      <p className="text-lg font-semibold leading-none">
        {value}
        <span className="text-[10px] ml-0.5 font-normal text-gray-400">
          {unit}
        </span>
      </p>
    </div>
  );
}

export default NutriScan;
