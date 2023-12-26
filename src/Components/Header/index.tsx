import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <header
      className=" h-16 flex justify-between items-center px-5 text-white"
      style={{ background: "linear-gradient(to bottom, #2D2D2D, black)" }}
    >
      <section className="flex md:gap-5 gap-3">
        <Link to="/nivel1" className=" font-medium md:text-xl text-sm">
          Nivel 1
        </Link>
        <Link to="/nivel2" className=" font-medium md:text-xl text-sm">
          Nivel 2
        </Link>
        <Link to="/nivel3" className=" font-medium md:text-xl text-sm">
          Nivel 3
        </Link>
        <Link to="/nivel4" className=" font-medium md:text-xl text-sm">
          Nivel 4
        </Link>
      </section>
      <h1 className=" text-lg font-bold">Bem-Vindo {name}</h1>
    </header>
  );
}
