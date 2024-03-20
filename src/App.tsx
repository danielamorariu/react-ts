import { Routes, Route } from "react-router-dom"
import { Container } from 'react-bootstrap'
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { Game } from "./pages/Game"
import { Budgets } from "./pages/Budgets"
import { Navbar } from "./components/Navbar/Navbar.tsx"
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {

  return (
    <ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/game" element={<Game />} />
          <Route path="/budgets" element={<Budgets />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App
