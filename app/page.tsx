import Footer from "@/components/footer";
import { Hero } from "@/components/hero";
import { Menu } from "@/components/menu";
import Navbar from "@/components/navbar";

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <div className="px-6">
        <Menu />
      </div>
      <Footer />
    </div>
  );
}
