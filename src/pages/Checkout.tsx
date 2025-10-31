import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, clearCart } from "@/lib/cart";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });
  const navigate = useNavigate();
  const cart = getCart();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📦 Comandă trimisă:", { form, cart });
    alert("Comanda ta a fost trimisă cu succes!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf8]">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold mb-8 text-center">Finalizează Comanda</h1>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-8 rounded-xl border shadow-sm">
            <div>
              <label className="block font-medium mb-1">Nume complet</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Telefon</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Adresă de livrare</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Mesaj (opțional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <Button type="submit" size="lg" className="w-full btn-gold">
              Trimite Comanda
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
