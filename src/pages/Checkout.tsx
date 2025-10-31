import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, clearCart } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(getCart());
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.items.length === 0) {
      navigate("/cart");
    }
    setCart(currentCart);
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderNumber = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      // ✅ Salvăm comanda în Supabase
      const { error } = await supabase.from("orders").insert([
        {
          order_number: orderNumber,
          customer_name: formData.name,
          customer_phone: formData.phone,
          address: formData.address,
          items: cart.items as any,
          total: cart.total,
          notes: formData.notes || null,
          status: "în procesare",
        },
      ]);

      if (error) throw error;

      // ✅ Trimitem doar backup către Formspree (fără email)
      await fetch("https://formspree.io/f/xgvplgzr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `Comandă nouă #${orderNumber}`,
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes || "Fără notițe",
          total: `${cart.total.toFixed(2)} RON`,
        }),
      });

      clearCart();
      window.dispatchEvent(new Event("cartUpdated"));
      navigate(`/order-confirmation/${orderNumber}`);
      toast.success("Comanda ta a fost trimisă cu succes!");
    } catch (error) {
      console.error("Eroare la trimiterea comenzii:", error);
      toast.error("A apărut o eroare. Încearcă din nou mai târziu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5f0] text-[#3a2b16]">
      <Navbar />

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3 text-[#6b4b1e]">
              Finalizează Comanda
            </h1>
            <p className="text-lg text-[#4e3a1e]/80">
              Te rugăm să completezi detaliile tale pentru a trimite comanda.
              Produsele tale vor fi pregătite cu grijă 💛
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* FORMULAR */}
            <div className="lg:col-span-2 bg-white/90 border border-[#e7dcc7] shadow-lg rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#4e3a1e] font-medium">
                    Nume complet *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Ex: Andrei Popescu"
                    className="border-[#d1bfa3] focus:ring-[#b08a4f]"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#4e3a1e] font-medium">
                    Telefon *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Ex: 0712345678"
                    className="border-[#d1bfa3] focus:ring-[#b08a4f]"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-[#4e3a1e] font-medium">
                    Adresă completă *
                  </Label>
                  <Textarea
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="Strada, oraș, județ, cod poștal"
                    rows={3}
                    className="border-[#d1bfa3] focus:ring-[#b08a4f]"
                  />
                </div>

                <div>
                  <Label htmlFor="notes" className="text-[#4e3a1e] font-medium">
                    Observații (opțional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    placeholder="Instrucțiuni speciale pentru livrare..."
                    rows={3}
                    className="border-[#d1bfa3] focus:ring-[#b08a4f]"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#c4a265] hover:bg-[#b08a4f] text-white font-semibold rounded-xl shadow-md transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? "Se procesează..." : "Trimite Comanda"}
                </Button>
              </form>
            </div>

            {/* SUMAR COMANDĂ */}
            <div className="bg-white/90 border border-[#e7dcc7] shadow-md rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 text-[#6b4b1e]">
                Produsele tale
              </h2>
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-[#e6d9c2]"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-[#3a2b16] text-sm">
                        {item.name}
                      </p>
                      <p className="text-sm text-[#5a4630]/70">
                        {item.quantity} × {item.price} RON
                      </p>
                    </div>
                    <p className="font-semibold text-[#6b4b1e]">
                      {(item.price * item.quantity).toFixed(2)} RON
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#e7dcc7] pt-4">
                <div className="flex justify-between text-lg mb-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-[#b08a4f]">
                    {cart.total.toFixed(2)} RON
                  </span>
                </div>
                <p className="text-sm text-[#5a4630]/70">
                  Livrare gratuită — 24–48h (5–7 zile în zone rurale)
                </p>
              </div>

              <div className="mt-6 text-sm text-[#4e3a1e]/70 italic">
                ✨ Mulțumim pentru încrederea acordată! Fiecare produs este
                ambalat cu grijă și parfum oriental autentic.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
