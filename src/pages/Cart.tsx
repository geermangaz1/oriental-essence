import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Te rugăm să completezi toate câmpurile!");
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-green-700">
            Comanda ta a fost plasată cu succes!
          </h1>
          <p className="text-gray-700 mb-6 max-w-md">
            Mulțumim pentru achiziție! Vei primi un email de confirmare în scurt timp.
          </p>
          <a
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Înapoi la magazin
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6]">
      <Navbar />
      <main className="flex-1 container mx-auto p-8 max-w-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Finalizează comanda
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow-lg p-6 rounded-2xl">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">Nume complet</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-600 outline-none"
              placeholder="Ex: Andrei Popescu"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-600 outline-none"
              placeholder="exemplu@email.com"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Telefon</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-600 outline-none"
              placeholder="+40 7xx xxx xxx"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700 font-medium">Adresă de livrare</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-yellow-600 outline-none"
              placeholder="Strada, număr, oraș, județ"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-yellow-700 transition-all"
          >
            Plasează comanda
          </button>
        </form>
      </main>
    </div>
  );
}
