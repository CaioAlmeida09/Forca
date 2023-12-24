import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <header
      className=" h-16 flex justify-between items-center px-5 text-white"
      style={{ background: "linear-gradient(to bottom, #2D2D2D, black)" }}
    >
      <section className="flex gap-5">
        <p className=" font-medium md:text-xl text-base">Nivel 1</p>
        <p className=" font-medium md:text-xl text-base">Nivel 2</p>
        <p className=" font-medium md:text-xl text-base">Nivel 3</p>
      </section>
      <h1 className=" text-lg font-bold">Bem-Vindo {name}</h1>
    </header>
  );
}
