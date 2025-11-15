// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { FoodItem } from "./food-item";

// export function Menu() {
//   return (
//     <Accordion
//       type="single"
//       collapsible
//       className="w-full"
//       defaultValue="item-1"
//     >
//       <AccordionItem value="item-1">
//         <AccordionTrigger>Fast Food</AccordionTrigger>
//         <AccordionContent className="flex flex-col gap-4 text-balance">
//           <FoodItem />
//           <FoodItem />
//           <FoodItem />
//           <FoodItem />
//           <FoodItem />
//         </AccordionContent>
//       </AccordionItem>
//     </Accordion>
//   );
// }

"use client";

"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FoodItem } from "./food-item";
import { Loader2 } from "lucide-react";

interface FoodItemType {
  id: string;
  foodName: string;
  price: number;
  image: string;
  category?: string;
  imageType?: string;
  createdAt?: string;
}

export function Menu() {
  const [foodItems, setFoodItems] = useState<FoodItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "foodItems"));
      const items: FoodItemType[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        items.push({
          id: doc.id,
          foodName: data.foodName || "Unnamed Item",
          price:
            typeof data.price === "number"
              ? data.price
              : parseFloat(data.price) || 0,
          image: data.image || "",
          category: data.category || "Fast Foods",
          imageType: data.imageType,
          createdAt: data.createdAt,
        });
      });

      console.log("Fetched food items:", items);
      setFoodItems(items);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(items.map((item) => item.category || "Uncategorized")),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching food items:", error);
    } finally {
      setLoading(false);
    }
  };

  // Group items by category
  const getItemsByCategory = (category: string) => {
    return foodItems.filter(
      (item) => (item.category || "Fast Food") === category
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (foodItems.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <p className="text-gray-500">
          No food items available. Add some items to get started!
        </p>
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={categories[0]}
    >
      {categories.map((category) => {
        const categoryItems = getItemsByCategory(category);

        return (
          <AccordionItem key={category} value={category}>
            <AccordionTrigger>
              {category} ({categoryItems.length})
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {categoryItems.map((item) => (
                <FoodItem
                  key={item.id}
                  id={item.id}
                  name={item.foodName}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
