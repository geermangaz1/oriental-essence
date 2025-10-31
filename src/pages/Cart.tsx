import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CartPage() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Parfum oriental", price: 150 },
    { id: 2, name: "Esenta arabica", price: 200 },
  ]);

  const handleOrder = () => {
    setOrderPlaced(true);
    setCartItems([]);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-3xl font-bold mb-4">Comanda ta a fost plasată!</h1>
          <p className="text-gray-600 mb-6">Mulțumim pentru achiziție ❤️</p>
          <a
            href="/"
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
          >
            Înapoi la magazin
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Coșul tău</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Coșul este gol 😢</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.name}</span>
                <span>{item.price} RON</span>
              </div>
            ))}
            <button
              onClick={handleOrder}
              className="mt-6 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            >
              Plasează comanda
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
