export const getCart = () => {
  const stored = localStorage.getItem("cart");
  return stored ? JSON.parse(stored) : { items: [], total: 0 };
};

export const saveCart = (cart: any) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};

export const addToCart = (item: any) => {
  const cart = getCart();
  const existing = cart.items.find((i: any) => i.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.items.push({ ...item, quantity: 1 });
  }
  cart.total = cart.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0);
  saveCart(cart);
};
