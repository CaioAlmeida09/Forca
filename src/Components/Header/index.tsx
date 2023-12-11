import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <header
      className="h-20 flex justify-between items-center px-12  text-white"
      style={{ background: "linear-gradient(to bottom, #2D2D2D, black)" }}
    >
      <p className=" font-medium text-xl">Nivel 1</p>
      <h1 className=" text-lg font-bold">Bem-Vindo {name}</h1>
    </header>
  );
}
