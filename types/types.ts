export interface CartItem {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
}

export type Fade = {
	initial: { opacity: number; y: number };
	animate: { opacity: number; y: number };
	transition: { duration: number };
};