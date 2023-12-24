import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Nivel2 } from "./Pages/Nivel2";
import { Nivel1 } from "./Pages/Nivel1";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nivel1" element={<Nivel1 />} />
        <Route path="/nivel2" element={<Nivel2 />} />
        {/* <Route path="/nivel3" element={} */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
