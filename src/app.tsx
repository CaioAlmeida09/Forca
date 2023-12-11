import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Medi } from "./Pages/Medi";
import { Letras } from "./Components/Letras";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/easy" element={<Letras />} />
        <Route path="/medi" element={<Medi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
