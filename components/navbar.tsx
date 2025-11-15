import CartDrawer from "./cart-drawer";
import { Soup } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex p-4 justify-between border-b shadow-md">
      <div className="flex items-center gap-2">
        <h3>Uncle's Kitchen</h3>
        <Soup className="text-primary" />
      </div>
      <CartDrawer />
    </nav>
  );
}
