import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CreatePost,
  Dashboard,
  Home,
  Login,
  PostDetail,
  PostUpdate,
  Register,
} from "./pages";
import { Layout, PrivateRoute } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/blogs/:id" element={<PostDetail />} />

            <Route element={<PrivateRoute />}>
              <Route path="/blog/new" element={<CreatePost />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/blog/:id/update" element={<PostUpdate />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;
