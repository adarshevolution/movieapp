import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/SignIn";
import Movies from "./components/Movies";
import Layout from "./components/layout/Layout";
import CreateMovie from "./components/CreateMovie";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";

const BaseHandler = () => {
  useEffect(() => {
    window.location.href = "/movies";
  });
  return <></>;
};

function App() {
  return (
    <div className="bg-background relative min-w-screen min-h-screen text-white">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<BaseHandler />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/create" element={<CreateMovie />} />
              <Route path="/movies/:eid" element={<CreateMovie />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </Layout>
    </div>
  );
}

export default App;
