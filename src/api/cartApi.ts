import { Product } from '@/types';

export const getCart = async (userId: number = 1) => {
  const res = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch cart');
  return await res.json();
};

export const addToCart = async (
  cartId: number,
  productId: number,
  quantity: number
) => {
  const res = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
    method: 'PUT',
    body: JSON.stringify({
      products: [{ productId, quantity }],
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error('Failed to update cart');
  return await res.json();
};

export const removeFromCart = async (cartId: number, productId: number) => {
  // The fakestoreapi does not really have remove, so simulate with update
  // You should fetch cart, filter etc, for demo we just call addToCart with empty
  return addToCart(cartId, productId, 0);
};

export const updateCart = addToCart;

// Local cart operations (for demo purposes)
export const addItemToLocalCart = async (product: Product) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true, product };
};

export const removeItemFromLocalCart = async (productId: number) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true, productId };
};

export const updateItemQuantityInLocalCart = async (
  productId: number,
  quantity: number
) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true, productId, quantity };
};
