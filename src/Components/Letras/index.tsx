import { useState, useEffect } from "react";
import { Header } from "../Header";

export function Letras() {
  const [letrasClicadas, setLetrasClicadas] = useState<string[]>([]);
  const [palavraAleatoria, setPalavraAleatoria] = useState<string | null>(null);
  const [letrasDaPalavra, setLetrasDaPalavra] = useState<string[]>([]);
  const [resposta, setResposta] = useState<string[]>([]);
  const [positionCorreta, setPositionCorreta] = useState<number[]>([]);
  const [positionIncorreta, setPositionIncorreta] = useState<number[]>([]);
  const [positionTeste, setPositionTeste] = useState<number[]>([]);
  const [todasLetrasCorretas, setTodasLetrasCorretas] = useState(false);
  const [tentativas, setTentativas] = useState(1);

  const palavras = [
    "MOELA",
    // "FILHO", "GALHO", "CARGO", "FALSO"
  ];

  useEffect(() => {
    const indiceAleatorio = Math.floor(Math.random() * palavras.length);
    const novaPalavraAleatoria = palavras[indiceAleatorio];
    setPalavraAleatoria(novaPalavraAleatoria);
    const letras = novaPalavraAleatoria.split("");
    setLetrasDaPalavra(letras);
    setResposta([]);
    return;
  }, []);

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
    setLetrasClicadas((prevLetrasClicadas) => {
      if (prevLetrasClicadas.includes(letra)) {
        return [...prevLetrasClicadas];
      } else {
        return [...prevLetrasClicadas, letra];
      }
    });
    console.log(palavraAleatoria);
  }

  async function HandleResposta() {
    const novasRespostas = letrasDaPalavra.map((_, index) => {
      const input = document.getElementById(
        `input-${index}`
      ) as HTMLInputElement;
      return (input.value || "").toUpperCase();
    });

    await setResposta(novasRespostas);

    const todasLetrasCorretas =
      novasRespostas.join("") === letrasDaPalavra.join("");

    setTodasLetrasCorretas(todasLetrasCorretas);

    const posicoesCorretas: number[] = [];
    const posicoesIncorretas: number[] = [];
    const positionTeste: number[] = [];

    novasRespostas.forEach((letra, index) => {
      const letraCorreta = letrasDaPalavra && letrasDaPalavra[index];

      if (letraCorreta !== undefined && letra === letraCorreta.toUpperCase()) {
        posicoesCorretas.push(index);
      }
      if (
        letraCorreta !== undefined &&
        letraCorreta.toUpperCase() !== letra &&
        letrasDaPalavra.includes(letra.toUpperCase())
      ) {
        positionTeste.push(index);
      } else {
        posicoesIncorretas.push(index);
      }
    });

    console.log("Novas Respostas:", novasRespostas);
    console.log("Posições corretas:", posicoesCorretas);
    console.log("Posições incorretas:", posicoesIncorretas);
    console.log("Letra correta Posição Diferente: ", positionTeste);
    setPositionCorreta(posicoesCorretas);
    setPositionIncorreta(posicoesIncorretas);
    setPositionTeste(positionTeste);
    setTentativas(tentativas + 1);
  }

  return (
    <>
      <Header />
      <div className="bg-black w-full h-screen flex flex-col justify-start items-center px-5">
        {todasLetrasCorretas === true ? (
          <h1 className="bg-blue-200"> Parabéns</h1>
        ) : (
          <>
            <section className="flex gap-4 justify-center items-center p-8 md:w-80 h-11 w-72">
              {letrasDaPalavra &&
                letrasDaPalavra.map((item, index) => (
                  <input
                    key={item}
                    className={`bg-gray-800 flex justify-center h-11 w-12 items-center rounded-full text-white text-3xl text-center ${
                      positionCorreta && positionCorreta.includes(index)
                        ? "bg-green-400"
                        : positionTeste && positionTeste.includes(index)
                        ? "bg-yellow-300"
                        : ""
                    }`}
                    type="text"
                    data-index={index}
                    id={`input-${index}`}
                  />
                ))}
            </section>
            {tentativas >= 2 ? (
              <section className="flex gap-4 justify-center items-center p-8 md:w-80 h-11 w-72">
                {letrasDaPalavra &&
                  letrasDaPalavra.map((item, index) => (
                    <input
                      key={item}
                      className={`bg-gray-800 flex justify-center h-11 w-12 items-center rounded-full text-white text-3xl text-center ${
                        positionCorreta && positionCorreta.includes(index)
                          ? "bg-green-400"
                          : ""
                      }`}
                      type="text"
                      data-index={index}
                      id={`input-${index}`}
                    />
                  ))}
              </section>
            ) : (
              <div> </div>
            )}
            {tentativas >= 3 ? (
              <section className="flex gap-4 justify-center items-center p-8 md:w-80 h-11 w-72">
                {letrasDaPalavra &&
                  letrasDaPalavra.map((item, index) => (
                    <input
                      key={item}
                      className={`bg-gray-800 flex justify-center h-11 w-12 items-center rounded-full text-white text-3xl text-center ${
                        positionCorreta && positionCorreta.includes(index)
                          ? "bg-green-400"
                          : ""
                      }`}
                      type="text"
                      data-index={index}
                      id={`input-${index}`}
                    />
                  ))}
              </section>
            ) : (
              <div> </div>
            )}
            {tentativas >= 4 ? (
              <section className="flex gap-4 justify-center items-center h-11 p-8 md:w-80 w-72">
                {letrasDaPalavra &&
                  letrasDaPalavra.map((item, index) => (
                    <input
                      key={item}
                      className={`bg-gray-800 flex justify-center h-11 w-12 items-center rounded-full text-white text-3xl text-center ${
                        positionCorreta && positionCorreta.includes(index)
                          ? "bg-green-400"
                          : ""
                      }`}
                      type="text"
                      data-index={index}
                      id={`input-${index}`}
                    />
                  ))}
              </section>
            ) : (
              <div> </div>
            )}
            {tentativas >= 5 ? (
              <section className="flex gap-4 justify-center items-center h-11 p-8 md:w-80 w-72">
                {letrasDaPalavra &&
                  letrasDaPalavra.map((item, index) => (
                    <input
                      key={item}
                      className={`bg-gray-800 flex justify-center h-11 w-12 items-center rounded-full text-white text-3xl text-center ${
                        positionCorreta && positionCorreta.includes(index)
                          ? "bg-green-400"
                          : ""
                      }`}
                      type="text"
                      data-index={index}
                      id={`input-${index}`}
                    />
                  ))}
              </section>
            ) : (
              <div> </div>
            )}
            <button
              className="bg-green-400 py-3 px-4 mt-5"
              onClick={() => HandleResposta()}
            >
              {" "}
              Verificar resposta
            </button>{" "}
          </>
        )}

        <section className="grid grid-cols-6 gap-2 mt-8 w-71">
          {Letras.map((item) => (
            <button
              key={item}
              onClick={() => HandleLetra(item)}
              className={`flex justify-center items-center rounded-full h-10 w-10 text-white p-1 ${
                resposta.includes(item) ? "bg-gray-700" : "bg-gray-400"
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
