import "./App.css";
import Home from "./componentes/Home";
import { BrowserRouter, Routes, Link, Route } from "react-router-dom";
import Sobre from "./componentes/Sobre";
import Categoria from "./componentes/Categoria";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <h1>Pizzaria</h1>
      <BrowserRouter>
        <Nav variant="tabs" defaultActiveKey="/home">
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/categoria">Categoria</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/sobre">Sobre</Nav.Link>
          </Nav.Item>
        </Nav>

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="categoria" element={<Categoria />}></Route>
          <Route path="sobre" element={<Sobre />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
