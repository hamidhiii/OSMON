import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer/Footer";
import ProductsPage from "./pages/ProductsPage";


export default function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/allproducts" element={<ProductsPage/>}/>
      </Routes>
      <Footer/>
    </>
  )
}
