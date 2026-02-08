import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./pages/home";
import Services from "./pages/services";
import Team from "./pages/team";
import Contact from "./pages/contact";
import Preturi from "./pages/prices";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicii" element={<Services />} />
          <Route path="/echipa" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/preturi" element={<Preturi />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
