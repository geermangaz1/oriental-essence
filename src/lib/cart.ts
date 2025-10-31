// src/lib/cart.ts
export function getCart() {
  if (typeof window === "undefined") return { items: [], total: 0 };
  const stored = localStorage.getItem("cart");
  if (!stored) return { items: [], total: 0 };
  try {
    return JSON.parse(stored);
  } catch {
    return { items: [], total: 0 };
  }
}

export function saveCart(cart: any) {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export function addToCart(product: any) {
  const cart = getCart();
  const existing = cart.items.find((i: any) => i.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }

  cart.total = cart.items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}

export function updateQuantity(id: string, newQty: number) {
  const cart = getCart();
  const item = cart.items.find((i: any) => i.id === id);
  if (!item) return;
  item.quantity = Math.max(newQty, 1);
  cart.total = cart.items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  saveCart(cart);
}

export function removeFromCart(id: string) {
  let cart = getCart();
  cart.items = cart.items.filter((i: any) => i.id !== id);
  cart.total = cart.items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  saveCart(cart);
  window.dispatchEvent(new Event("cartUpdated"));
}

export function clearCart() {
  const emptyCart = { items: [], total: 0 };
  saveCart(emptyCart);
  window.dispatchEvent(new Event("cartUpdated"));
}
