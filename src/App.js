import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import Movies from "./components/Movies";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="bg-background relative min-w-screen min-h-screen text-white">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/movies" element={<Movies />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
