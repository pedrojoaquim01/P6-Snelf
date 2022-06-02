import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import App from "./App";
import Busca from "./pages/Busca";
import Home from "./pages/Home";
import Importacao from "./pages/Importacao";
import Sobre from "./pages/Sobre";
import "./index.css"

const root = ReactDOM.createRoot(
    document.getElementById("root")
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route index path="/" element={<Home />} />
            <Route path="importacao" element={<Importacao />} />
            <Route path="busca" element={<Busca />} />
            <Route path="sobre" element={<Sobre />} />
        </Routes>
    </BrowserRouter>
);