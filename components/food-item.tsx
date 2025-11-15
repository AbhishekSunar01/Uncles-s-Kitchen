import { Button } from "./ui/button";

export function FoodItem() {
  return (
    <div className="border rounded-md p-4 flex items-center gap-4">
      {/* Prevent shrinking */}
      <div className="w-16 h-16 bg-gray-100 shrink-0"></div>

      <div className="flex justify-between items-center w-full">
        <div>
          <h4>Momo</h4>
          <code className="text-green-600 mt-2 block">Rs.160</code>
        </div>

        <Button size="sm">Add</Button>
      </div>
    </div>
  );
}
