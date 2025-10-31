import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Te rugăm să completezi toate câmpurile obligatorii!");
      return;
    }

    try {
      setLoading(true);
      const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

      const { error } = await supabase.from("orders").insert([
        {
          order_number: orderNumber,
          customer_name: form.name,
          customer_phone: form.phone,
          address: form.address,
          notes: form.notes,
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          total,
          status: "pending",
        },
      ]);

      if (error) throw error;

      clearCart();
      navigate(`/order-confirmation/${orderNumber}`);
    } catch (err) {
      console.error("Eroare la trimiterea comenzii:", err);
      alert("A apărut o eroare la trimiterea comenzii. Încearcă din nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-6">
        {/* Formularul */}
        <Card className="flex-1 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-semibold text-[#2b2b2b] mb-2">Finalizează Comanda</h1>

            <div>
              <label className="block text-sm font-medium mb-1">Nume Complet *</label>
              <Input name="name" value={form.name} onChange={handleChange} placeholder="Nume și prenume" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Telefon *</label>
              <Input name="phone" value={form.phone} onChange={handleChange} placeholder="07XXXXXXXX" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Adresă Completă *</label>
              <Textarea name="address" value={form.address} onChange={handleChange} placeholder="Stradă, număr, oraș" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Note (opțional)</label>
              <Textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Instrucțiuni pentru livrare..." />
            </div>

            <Button
              className="w-full bg-[#d8a820] hover:bg-[#c4971c] text-white text-lg py-5 rounded-xl mt-4"
              onClick={handleOrder}
              disabled={loading}
            >
              {loading ? "Se procesează..." : "Plasează Comanda"}
            </Button>
          </CardContent>
        </Card>

        {/* Rezumat Comandă */}
        <Card className="w-full lg:w-1/3 shadow-sm">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-semibold">Produse Comandate</h2>

            {cart.map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-b pb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded-md bg-white"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} x {item.price} RON</p>
                </div>
              </div>
            ))}

            <div className="pt-4 border-t">
              <p className="flex justify-between text-lg font-medium">
                <span>Total</span> <span>{total.toFixed(2)} RON</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Livrare GRATUITĂ • Termen 5–7 zile lucrătoare</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
