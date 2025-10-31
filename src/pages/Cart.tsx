import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getCart, updateQuantity, removeFromCart } from "@/lib/cart";
import { Cart as CartType } from "@/types/cart";

const SHIPPING_COST = 25;

const Cart = () => {
  const [cart, setCart] = useState<CartType>({ items: [], total: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const currentCart = getCart();
    setCart(currentCart);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    loadCart();
  };

  const handleRemove = (productId: string) => {
    removeFromCart(productId);
    loadCart();
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Coșul tău este gol</h2>
            <p className="text-muted-foreground mb-8">
              Adaugă parfumuri minunate pentru a le vedea aici.
            </p>
            <Link to="/catalog">
              <Button size="lg" className="btn-gold">
                Explorează Catalogul
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const totalWithShipping = cart.total + SHIPPING_COST;

  return (
    <div className="min-h-screen flex flex-col bg-[#fdfbf8]">
      <Navbar />
      <section className="py-12 flex-1">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8">Coșul Tău</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-border rounded-xl p-6 flex gap-6 items-center shadow-sm"
                >
                  <div className="w-28 h-28 border rounded-lg flex items-center justify-center overflow-hidden bg-[#fffaf6]">
                    <img
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                    <p className="text-primary font-bold mb-3">{item.price} RON</p>

                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="text-right font-bold text-lg">
                    {(item.price * item.quantity).toFixed(2)} RON
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-border rounded-xl p-6 sticky top-24 shadow-md">
                <h2 className="text-2xl font-bold mb-6">Sumar Comandă</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{cart.total.toFixed(2)} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transport</span>
                    <span>{SHIPPING_COST.toFixed(2)} RON</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>{totalWithShipping.toFixed(2)} RON</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/checkout")}
                  size="lg"
                  className="w-full btn-gold"
                >
                  Finalizează Comanda
                </Button>
                <Link to="/catalog">
                  <Button variant="outline" className="w-full mt-3">
                    Continuă Cumpărăturile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
