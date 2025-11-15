// "use client";

// import { Button } from "./ui/button";
// // import { useCart } from "@/context/cart-context";

// interface FoodItemProps {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
// }

// export function FoodItem({ name, price, image }: FoodItemProps) {
//   //   const { addToCart } = useCart();

//   //   const handleAddToCart = () => {
//   //     addToCart({ id, name, price, image });
//   //   };

//   return (
//     <div className="border rounded-md p-4 flex items-center gap-4">
//       {/* Food Image */}
//       <div className="w-16 h-16 bg-gray-100 shrink-0 rounded-md overflow-hidden">
//         <img
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             // Fallback if image fails to load
//             (e.target as HTMLImageElement).src =
//               "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24'%3E🍽️%3C/text%3E%3C/svg%3E";
//           }}
//         />
//       </div>

//       <div className="flex justify-between items-center w-full">
//         <div>
//           <h4 className="font-medium">{name}</h4>
//           <code className="text-green-600 mt-2 block font-semibold">
//             Rs.{price.toFixed(2)}
//           </code>
//         </div>

//         <Button size="sm">Add</Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "./ui/button";
// import { useCart } from "@/context/cart-context";

interface FoodItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function FoodItem({ name, price, image }: FoodItemProps) {
  //   const { addToCart } = useCart();

  //   const handleAddToCart = () => {
  //     addToCart({ id, name, price, image });
  //   };

  // Ensure price is a valid number
  const displayPrice =
    typeof price === "number" ? price : parseFloat(price) || 0;

  return (
    <div className="border rounded-md p-4 flex items-center gap-4">
      {/* Food Image */}
      <div className="w-16 h-16 bg-gray-100 shrink-0 rounded-md overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          //   onError={(e) => {
          //     // Fallback if image fails to load
          //     (e.target as HTMLImageElement).src =
          //       "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='24'%3E🍽️%3C/text%3E%3C/svg%3E";
          //   }}
        />
      </div>

      <div className="flex justify-between items-center w-full">
        <div>
          <h4 className="font-medium">{name}</h4>
          <code className="text-green-600 mt-2 block font-semibold">
            Rs.{displayPrice.toFixed(2)}
          </code>
        </div>

        <Button size="sm">Add</Button>
      </div>
    </div>
  );
}
