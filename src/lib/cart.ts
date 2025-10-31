// src/lib/cart.ts

export function getCart() {
  if (typeof window === "undefined") return { items: [] };
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [] };
}

export function saveCart(cart: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function addToCart(item: any) {
  const cart = getCart();
  const existingItem = cart.items.find((i: any) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.items.push(item);
  }
  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart();
  cart.items = cart.items.filter((i: any) => i.id !== id);
  saveCart(cart);
}

// ✅ AICI adăugăm funcția care lipsea:
export function updateQuantity(id: string, quantity: number) {
  const cart = getCart();
  const item = cart.items.find((i: any) => i.id === id);
  if (item) {
    item.quantity = quantity;
  }
  saveCart(cart);
}

export function clearCart() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart");
  }
}
