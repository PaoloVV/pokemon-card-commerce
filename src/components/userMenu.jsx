import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

export default function UserMenu() {
  console.log();
  return (
    <div className="w-[30vw] border border-black absolute right-0 top-[10vh] p-3 flex flex-col items-center">
      <h3 className="font-bold text-2xl text-center">Ciao, benvenuto</h3>
      <Link
        href="/"
        className="flex items-center gap-1 hover:scale-110 font-semibold"
      >
        <div>Il tuo Carrello</div>
        <FaShoppingCart color="purple" />
      </Link>
      <Link href="/">Logout</Link>
    </div>
  );
}
