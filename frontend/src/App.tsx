import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { Layout } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
