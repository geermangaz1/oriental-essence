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
    existing.quantity += item.quantity || 1;
  } else {
    cart.items.push({ ...item, quantity: item.quantity || 1 });
  }
  cart.total = cart.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0);
  saveCart(cart);
};

export const removeFromCart = (id: string) => {
  const cart = getCart();
  const newItems = cart.items.filter((item: any) => item.id !== id);
  const newTotal = newItems.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0);
  saveCart({ items: newItems, total: newTotal });
  return { items: newItems, total: newTotal };
};

export const updateQuantity = (id: string, quantity: number) => {
  const cart = getCart();
  const item = cart.items.find((i: any) => i.id === id);
  if (item) {
    item.quantity = quantity;
  }
  cart.total = cart.items.reduce((acc: number, i: any) => acc + i.price * i.quantity, 0);
  saveCart(cart);
  return cart;
};
