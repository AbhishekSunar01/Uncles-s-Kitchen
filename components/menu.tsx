import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FoodItem } from "./food-item";

export function Menu() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Fast Food</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <FoodItem />
          <FoodItem />
          <FoodItem />
          <FoodItem />
          <FoodItem />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Drinks</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <FoodItem />
          <FoodItem />
          <FoodItem />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
