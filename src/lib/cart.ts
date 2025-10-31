import { useEffect, useState } from "react";
import { getCart, clearCart } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const [cart, setCart] = useState<{ items: CartItem[] }>({ items: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const c = getCart();
    if (!c.items) c.items = [];
    setCart(c);
  }, []);

  const handleCheckout = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      clearCart();
      setIsSubmitting(false);
      setOrderPlaced(true);
    }, 1000);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-semibold mb-4">Mulțumim pentru comandă!</h1>
          <p>Comanda ta va fi livrată în 5–7 zile lucrătoare.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6 text-center">Finalizare comandă</h1>

        {cart.items.length === 0 ? (
          <p className="text-center text-gray-500">Coșul tău este gol.</p>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h2 className="font-medium">{item.name}</h2>
                  <p className="text-sm text-gray-600">Cantitate: {item.quantity}</p>
                </div>
                <div className="text-right font-semibold">
                  {(item.price * item.quantity).toFixed(2)} RON
                </div>
              </div>
            ))}
            <div className="text-right font-semibold text-lg mt-4">
              Total: {total.toFixed(2)} RON
            </div>
            <button
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              {isSubmitting ? "Se procesează comanda..." : "Plasează comanda"}
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
