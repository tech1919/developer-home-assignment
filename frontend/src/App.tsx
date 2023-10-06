import Home from "./pages/home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./pages/layout";

function App() {
  
  return (
    <>
      <div className="h-screen w-screen py-10 bg-gradient-to-l  from-cyan-500 to-blue-500">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home/>} />
            </Route>
          </Routes>
        </BrowserRouter>{" "}
      </div>
    </>
  );
}

export default App;
