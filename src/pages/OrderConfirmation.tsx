// src/pages/OrderConfirmation.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const OrderConfirmation = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => setLoading(false), 300); // mic delay pentru UX
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2]">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-white/80 p-10 rounded-2xl shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mulțumim pentru comandă!</h1>

            {!loading && (
              <>
                <p className="text-neutral-700 mb-4">
                  Comanda ta <span className="font-semibold">{orderNumber}</span> a fost primită.
                </p>

                <p className="text-neutral-600 mb-6">
                  Vei primi un email cu detalii curând. Livrare în 5–7 zile lucrătoare.
                </p>

                <div className="flex justify-center gap-4">
                  <Link to="/catalog">
                    <Button className="bg-[#b07d62] text-white px-6 py-3 rounded-lg">Înapoi la Magazin</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="px-6 py-3 rounded-lg">Pagina Principală</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
