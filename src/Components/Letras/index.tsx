import { useState } from "react";

interface LetrasProps {
  letra?: string;
}

export function Letras() {
  const [letraClick, setLetraClick] = useState<LetrasProps | null>(null);

  const Letras = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  function HandleLetra(letra: string) {
    setLetraClick({ letra });
    console.log(letra);
  }

  return (
    <div className="bg-red-400 w-full h-screen flex-col justify-center items-center">
      <section className="flex gap-5 grid-cols-5">
        {Letras.map((item) => (
          <button
            key={item}
            onClick={() => HandleLetra(item)}
            className="flex justify-center items-center rounded-full bg-blue-400 text-white p-4"
          >
            {item}
          </button>
        ))}
      </section>

      {/* Exibindo a última letra clicada (apenas para fins de demonstração) */}
      {letraClick && <p>Última letra clicada: {letraClick.letra}</p>}
    </div>
  );
}
