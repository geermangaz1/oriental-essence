import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Award, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("featured", true)
        .limit(3);

      if (error) {
        console.error("Error fetching featured products:", error);
      } else {
        setFeaturedProducts(data || []);
      }
      setLoading(false);
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] text-neutral-800">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative py-14 md:py-24 overflow-hidden bg-gradient-to-br from-[#e9d8a6] via-[#d4a373] to-[#b07d62]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg leading-tight">
              Descoperă Esența Orientului
            </h1>
            <p className="text-lg md:text-xl mb-6 text-white/90 max-w-2xl mx-auto">
              Parfumuri arabești autentice, create pentru momente de neuitat
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/catalog">
                <Button
                  size="lg"
                  className="bg-[#6c584c] hover:bg-[#5a463f] text-white text-lg px-8 py-5 rounded-2xl shadow-md"
                >
                  Explorează Colecția
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#faf7f2] to-transparent"></div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-[#f0e7db]">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              {
                icon: <Sparkles className="h-8 w-8 text-[#b07d62]" />,
                title: "Calitate Premium",
                text: "Parfumuri selectate din cele mai rafinate case de parfumuri orientale",
              },
              {
                icon: <Award className="h-8 w-8 text-[#b07d62]" />,
                title: "Autenticitate",
                text: "100% produse originale, cu certificate de autenticitate",
              },
              {
                icon: <Shield className="h-8 w-8 text-[#b07d62]" />,
                title: "Livrare Sigură",
                text: "Plată ramburs și ambalare premium pentru fiecare comandă",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg w-full sm:w-[260px] hover:shadow-xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#d4a373]/20 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Parfumuri Recomandate</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Descoperiți cele mai apreciate parfumuri din colecția noastră
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-neutral-500">Se încarcă produsele...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-[#b07d62] hover:bg-[#9c6e54] text-white text-lg px-8 py-6 rounded-2xl shadow-md"
              >
                Vezi Toate Produsele
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-[#d4a373] to-[#b07d62] text-center text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Începeți Călătoria Dvs. Olfactivă
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Descoperiți aromele care vă definesc personalitatea
            </p>
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-white text-[#6c584c] text-lg px-8 py-6 rounded-2xl shadow-md hover:bg-[#f5f5f5]"
              >
                Explorează Catalog
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
