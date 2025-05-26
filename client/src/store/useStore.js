// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// export const useCartStore = create(
//   persist(
//     (set, get) => ({
//       cart: [],

//       addToCart: (product) => {
//         const { cart } = get();
//         const existing = cart.find((item) => item.id === product.id);
//         if (existing) {
//           const updatedCart = cart.map((item) =>
//             item.id === product.id
//               ? {
//                   ...item,
//                   quantity: item.quantity + product.quantity,
//                   totalPrice: (item.quantity + product.quantity) * item.price,
//                 }
//               : item
//           );
//           set({ cart: updatedCart });
//         } else {
//           set({
//             cart: [
//               ...cart,
//               {
//                 ...product,
//                 totalPrice: product.price * product.quantity,
//               },
//             ],
//           });
//         }
//       }, // ✅ Comma added here

//       removeFromCart: (id) => {
//         const { cart } = get();
//         const updatedCart = cart
//           .map((item) =>
//             item.id === id && item.quantity > 1
//               ? {
//                   ...item,
//                   quantity: item.quantity - 1,
//                   totalPrice: (item.quantity - 1) * item.price,
//                 }
//               : item
//           )
//           .filter((item) => item.id !== id || item.quantity > 0);
//         set({ cart: updatedCart });
//       }, // ✅ Comma added here

//       deleteFromCart: (id) => {
//         set((state) => ({
//           cart: state.cart.filter((item) => item.id !== id),
//         }));
//       },

//       clearCart: () => set({ cart: [] }),
//     }),
//     {
//       name: "cart-storage", // Key in localStorage
//     }
//   )
// );

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + product.quantity,
                  totalPrice: (item.quantity + product.quantity) * item.price,
                }
              : item
          );
          set({ cart: updatedCart });
        } else {
          set({
            cart: [
              ...cart,
              {
                ...product,
                totalPrice: product.price * product.quantity,
              },
            ],
          });
        }
      },

      removeFromCart: (id) => {
        const cart = get().cart;
        const updatedCart = cart
          .map((item) =>
            item.id === id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.price,
                }
              : item
          )
          .filter((item) => item.quantity > 0);
        set({ cart: updatedCart });
      },

      deleteFromCart: (id) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        }));
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // Key used in localStorage
    }
  )
);
