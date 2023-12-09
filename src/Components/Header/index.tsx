import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const { name } = location.state || {};
  return (
    <header className="flex justify-center items-center px-8 bg-blue-400">
      <p className="h-20 w-full flex justify-between items-center font-medium text-xl">
        Nivel 1
      </p>
      <h1 className=" text-lg font-bold">Bem-Vindo {name}</h1>
    </header>
  );
}
