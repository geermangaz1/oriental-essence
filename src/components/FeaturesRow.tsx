// src/components/FeaturesRow.tsx
import React from "react";

export default function FeaturesRow() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center mb-8">De ce să alegi Oriental Essence</h2>

        {/* rând forțat; pe mobil apare scroll orizontal, pe desktop rămân în același rând */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-2">
          <div className="min-w-[260px] md:min-w-0 md:flex-1 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-6 flex flex-col items-start gap-3">
            <div className="text-3xl text-[#b68b00]">✨</div>
            <h3 className="text-lg font-semibold">Calitate Premium</h3>
            <p className="text-sm text-gray-700">Parfumuri selectate din cele mai rafinate case de parfumuri orientale.</p>
          </div>

          <div className="min-w-[260px] md:min-w-0 md:flex-1 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-6 flex flex-col items-start gap-3">
            <div className="text-3xl text-[#b68b00]">🏅</div>
            <h3 className="text-lg font-semibold">Autenticitate</h3>
            <p className="text-sm text-gray-700">100% produse originale, cu certificate de autenticitate.</p>
          </div>

          <div className="min-w-[260px] md:min-w-0 md:flex-1 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-6 flex flex-col items-start gap-3">
            <div className="text-3xl text-[#b68b00]">🛡️</div>
            <h3 className="text-lg font-semibold">Livrare Sigură</h3>
            <p className="text-sm text-gray-700">Plată ramburs și ambalare premium pentru fiecare comandă.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
