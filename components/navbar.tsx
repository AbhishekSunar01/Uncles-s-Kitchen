import CartDrawer from "./cart-drawer";
import { Soup } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex p-2 px-6 justify-between border-b shadow-md">
      <div className="flex items-center gap-2">
        <h4>Uncle&lsquo;s Kitchen</h4>
        <Soup className="text-primary" />
      </div>
      <CartDrawer />
    </nav>
  );
}
