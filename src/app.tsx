import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Nivel2 } from "./Pages/Nivel2";
import { Nivel1 } from "./Pages/Nivel1";
import { Nivel3 } from "./Pages/Nivel3";
import { Nivel4 } from "./Pages/nivel4";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nivel1 />} />
        <Route path="/nivel2" element={<Nivel2 />} />
        <Route path="/nivel3" element={<Nivel3 />} />
        <Route path="/nivel4" element={<Nivel4 />} />
        {/* <Route path="/nivel3" element={} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
