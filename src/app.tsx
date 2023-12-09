import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Easy } from "./Pages/Easy";
import { Medi } from "./Pages/Medi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/easy" element={<Easy />} />
        <Route path="/medi" element={<Medi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
