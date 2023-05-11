import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home.page";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
