import React, { useState } from "react";

const Checkout: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const form = e.currentTarget;
    const formData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLInputElement).value,
    };

    try {
      // 🔹 Trimite comanda spre Formspree
      const formResponse = await fetch("https://formspree.io/f/xgvplgzr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!formResponse.ok) throw new Error("Eroare la trimiterea comenzii.");

      // 🔹 Trimite email automat prin Resend
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Oriental Essence <onboarding@resend.dev>",
          to: formData.email,
          subject: `Mulțumim pentru comanda ta, ${formData.name}!`,
          html: `
            <div style="font-family: Arial, sans-serif; background:#fff8ef; padding:20px; border-radius:8px;">
              <h2 style="color:#b68b00;">Salut, ${formData.name}!</h2>
              <p>Îți mulțumim pentru comanda ta la <b>Oriental Essence</b> 💐</p>
              <p><b>Email:</b> ${formData.email}</p>
              <p><b>Telefon:</b> ${formData.phone}</p>
              <p><b>Mesaj:</b> ${formData.message}</p>
              <br/>
              <p>Comanda ta a fost înregistrată. Te vom contacta în curând pentru confirmare.</p>
              <p>Cu drag,</p>
              <p><b>Echipa Oriental Essence</b></p>
            </div>
          `,
        }),
      });

      if (!resendResponse.ok) throw new Error("Eroare la trimiterea emailului.");

      setStatus("✅ Comanda a fost trimisă! Verifică-ți emailul.");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("❌ A apărut o problemă. Încearcă din nou mai târziu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fff8ef] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-[#b68b00]">
          Finalizează comanda
        </h2>

        <input
          name="name"
          type="text"
          placeholder="Nume complet"
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="email"
          type="email"
          placeholder="Adresa de email"
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Număr de telefon"
          required
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          name="message"
          placeholder="Mesaj sau detalii suplimentare"
          className="w-full p-2 border rounded-lg"
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#b68b00] text-white font-semibold p-2 rounded-lg hover:bg-[#a07a00] transition"
        >
          {loading ? "Se trimite..." : "Trimite comanda"}
        </button>

        {status && (
          <p className="text-center text-sm mt-2">
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default Checkout;
