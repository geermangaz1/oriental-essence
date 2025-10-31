import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalog from "@/pages/Catalog";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pagina principală o facem direct catalogul */}
        <Route path="/" element={<Catalog />} />

        {/* Coșul și checkout-ul rămân normale */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
