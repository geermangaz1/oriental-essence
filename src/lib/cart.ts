export function getCart() {
  if (typeof window === "undefined") return { items: [] };
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : { items: [] };
}

export function saveCart(cart: any) {
  if (typeof window === "undefined") return;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(product: any) {
  const cart = getCart();
  const existing = cart.items.find((i: any) => i.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...product, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(id: string) {
  const cart = getCart();
  cart.items = cart.items.filter((i: any) => i.id !== id);
  saveCart(cart);
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("cart");
}
