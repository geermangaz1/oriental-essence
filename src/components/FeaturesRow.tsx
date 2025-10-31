// src/components/FeaturesRow.tsx
import React from "react";

export default function FeaturesRow() {
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-[hsl(var(--background))]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-serif text-center mb-10 text-gradient-gold">
          De ce să alegi Oriental Essence
        </h2>

        {/* container flexibil – rând orizontal pe mobil */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible">
          
          {/* Card 1 */}
          <div className="min-w-[260px] snap-center md:min-w-0 card-elegant rounded-2xl p-6 flex flex-col items-start gap-3 bg-[hsl(var(--card))]/90 backdrop-blur-md">
            <div className="text-4xl text-[hsl(var(--primary))]">✨</div>
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Calitate Premium</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Parfumuri selectate din cele mai rafinate case de parfumuri orientale.
            </p>
          </div>

          {/* Card 2 */}
          <div className="min-w-[260px] snap-center md:min-w-0 card-elegant rounded-2xl p-6 flex flex-col items-start gap-3 bg-[hsl(var(--card))]/90 backdrop-blur-md">
            <div className="text-4xl text-[hsl(var(--primary))]">🏅</div>
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Autenticitate</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              100% produse originale, cu certificate de autenticitate.
            </p>
          </div>

          {/* Card 3 */}
          <div className="min-w-[260px] snap-center md:min-w-0 card-elegant rounded-2xl p-6 flex flex-col items-start gap-3 bg-[hsl(var(--card))]/90 backdrop-blur-md">
            <div className="text-4xl text-[hsl(var(--primary))]">🛡️</div>
            <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">Livrare Sigură</h3>
            <p className="text-sm text-[hsl(var(--muted-foreground))] leading-relaxed">
              Plată ramburs și ambalare premium pentru fiecare comandă.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
