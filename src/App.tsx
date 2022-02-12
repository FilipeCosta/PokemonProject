import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import PokeNavbar from "./components/pokeNavbar/pokeNavbar";
import PokeTable from "./components/pokeTable/pokeTable";

function App() {
  const location = useLocation();
  return (
    <div>
      <PokeNavbar></PokeNavbar>
      <Routes>
        <Route path="/pokedex" element={<PokeTable></PokeTable>} />
      </Routes>
      {location.pathname === "/" ? <Navigate to="/pokedex" /> : null}
    </div>
  );
}

export default App;
