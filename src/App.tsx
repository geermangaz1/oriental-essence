import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home"; // dacă ai pagină de start
import Catalog from "@/pages/Catalog"; // lista de produse
import About from "@/pages/About"; // pagina despre
import Contact from "@/pages/Contact"; // contact
import Cart from "@/pages/Cart"; // coșul de cumpărături
import CheckoutPage from "@/pages/CheckoutPage"; // checkout / finalizare comandă
import NotFound from "@/pages/NotFound"; // opțional

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔸 Pagina principală */}
        <Route path="/" element={<Home />} />

        {/* 🔸 Pagina catalogului de produse */}
        <Route path="/catalog" element={<Catalog />} />

        {/* 🔸 Pagina despre brand */}
        <Route path="/despre" element={<About />} />

        {/* 🔸 Pagina de contact */}
        <Route path="/contact" element={<Contact />} />

        {/* 🔸 Coșul de cumpărături */}
        <Route path="/cart" element={<Cart />} />

        {/* 🔸 Finalizare comandă */}
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* 🔸 Pagina pentru 404 / route-uri inexistente */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
