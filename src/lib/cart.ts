import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, removeFromCart } from "@/lib/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const total = cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#faf8f5] flex flex-col items-center p-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-2xl p-6">
          <h1 className="text-2xl font-serif mb-6 text-center">Coșul tău</h1>

          {(!cart?.items || cart.items.length === 0) ? (
            <p className="text-center text-gray-600">Coșul tău este gol.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded"
                      />
                      <div>
                        <h2 className="font-medium">{item.name}</h2>
                        <p className="text-gray-600">{item.price} RON</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Șterge
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-6">
                <p className="text-lg font-semibold">
                  Total: {total.toFixed(2)} RON
                </p>
                <button
                  onClick={handleCheckout}
                  className="bg-yellow-600 text-white px-6 py-2 rounded hover:bg-yellow-700 transition-all"
                >
                  Finalizează Comanda
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
