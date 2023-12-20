import { useState, useEffect } from "react";
import { Header } from "../Header";
import { useRef } from "react";

export function Letras() {
  const [palavraAleatoria, setPalavraAleatoria] = useState<string | null>(null);
  const [resposta, setResposta] = useState<string>("");
  const [tentativas, setTentativas] = useState(1);
  const [HistoricoPalavras, setHistoricoPalavras] = useState<
    Record<string, string | null>[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const palavras = [
    "MOELA",
    // , "FILHO", "GALHO", "CARGO", "FALSO"
  ];

  useEffect(() => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const novaPalavraAleatoria = palavras[indiceAleatorio];
    setPalavraAleatoria(novaPalavraAleatoria);
    setTimeout(() => {
      inputRef.current && inputRef.current.focus();
    }, 0);
  }, []);

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, [resposta]);

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
  // adicionei o Record
  async function HandleResposta() {
    const obj: Record<string, string | null> = {
      word: resposta,
      l1: null,
      l2: null,
      l3: null,
      l4: null,
      l5: null,
    };
    const RespostaSoletrada = resposta.toUpperCase().split("");
    console.log(RespostaSoletrada);
    const PalavraAleatoriaSoletrada = palavraAleatoria?.toUpperCase().split("");
    console.log(PalavraAleatoriaSoletrada);

    if (PalavraAleatoriaSoletrada) {
      RespostaSoletrada.map((item, index) => {
        if (item === PalavraAleatoriaSoletrada[index]) {
          obj[GetIndex(index + 1)] = "posicaoCorreta";
        } else if (PalavraAleatoriaSoletrada.includes(item)) {
          obj[GetIndex(index + 1)] = "posicaoIncorreta";
        } else {
          obj[GetIndex(index + 1)] = "errado";
        }
      });
    }
    // transformei em uma função pra poder rendereizar
    setHistoricoPalavras((prevHistorico) => {
      const novoHistorico = [...prevHistorico, obj];
      console.log(novoHistorico);
      setTentativas(tentativas + 1);
      setResposta("");
      return novoHistorico;
    });
  }

  function GetIndex(index: number): string {
    if (index === 1) return "l1";
    if (index === 2) return "l2";
    if (index === 3) return "l3";
    if (index === 4) return "l4";
    return "l5";
  }

  const inputs = [1, 2, 3, 4, 5];
  function HandleLetra(item: string) {
    setResposta(resposta + item);
  }

  return (
    <>
      <Header />
      <div className="bg-black w-full h-screen flex flex-col justify-start items-center px-5">
        <input
          autoFocus
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              HandleResposta();
              inputRef.current && inputRef.current.focus();
            }
          }}
          // style={{ display: "none" }}
        />
        <div className="flex gap-4">
          {inputs.map((item, index) => (
            <div
              key={item}
              className={`bg-gray-800 flex justify-center h-11 w-12 items-center rounded-full text-white text-3xl text-center `}
            >
              <p> {resposta[index]} </p>
            </div>
          ))}
        </div>
        <section className="bg-black w-full h-screen flex flex-col justify-start items-center px-5">
          {HistoricoPalavras.map((item, index) => (
            <div key={index} className="flex gap-4 mt-4">
              {item.word &&
                item.word.split("").map((letra, letraIndex) => (
                  <div
                    className={`h-11 w-12 flex justify-center items-center ${
                      item[GetIndex(letraIndex + 1)] === "posicaoCorreta"
                        ? "bg-green-500"
                        : item[GetIndex(letraIndex + 1)] === "posicaoIncorreta"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  >
                    <p key={letraIndex} style={{ margin: 0 }}>
                      {letra}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </section>

        <button
          className="bg-green-400 py-3 px-4 mt-5"
          onClick={() => {
            HandleResposta();
            inputRef.current && inputRef.current.focus();
          }}
        >
          Verificar resposta
        </button>
        <section className="grid grid-cols-6 gap-2 mt-8 w-71">
          {Letras.map((item) => (
            <button
              key={item}
              onClick={() => HandleLetra(item)}
              className={`flex justify-center items-center rounded-full h-10 w-10 text-white p-1 ${
                HistoricoPalavras.some((historicoItem) =>
                  historicoItem.word?.toUpperCase().includes(item)
                )
                  ? "bg-gray-700"
                  : "bg-gray-400"
              }`}
            >
              {item}
            </button>
          ))}
        </section>
      </div>
    </>
  );
}
